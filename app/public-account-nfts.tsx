"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { fetchDeSo } from "./deso-api"
import NFTMedia from "./nft-media"

const PAGE_SIZE = 25
const DESO_PAGE_LIMIT = 100
const MAX_SESSION_CACHE_CHARS = 2_000_000
const VIDEO_EXTENSIONS = [".mp4", ".webm", ".mov", ".m4v"]
const AUDIO_EXTENSIONS = [".mp3", ".wav", ".m4a", ".aac", ".flac", ".oga"]

type DeSoPost = { PostHashHex?: string; Body?: string; ImageURLs?: string[]; VideoURLs?: string[]; NumNFTCopies?: number; ProfileEntryResponse?: { Username?: string } }
type NFTEntry = { SerialNumber?: number; IsForSale?: boolean; BuyNowPriceNanos?: number; MinBidAmountNanos?: number }
type NFTCollection = { PostEntryResponse?: DeSoPost; NFTEntryResponses?: NFTEntry[] }
type MediaFilter = "all" | "image" | "video" | "audio" | "unavailable"
type SaleFilter = "all" | "for-sale" | "not-for-sale"
type SortMode = "collection" | "title" | "most-owned" | "fewest-owned" | "lowest-price" | "highest-price"
type CachedCollection = { nfts: NFTCollection[]; nextKeyHex: string; fullyLoaded: boolean }

function mediaType(post?: DeSoPost): Exclude<MediaFilter, "all"> {
  const videoUrl = post?.VideoURLs?.[0]
  const mediaUrl = videoUrl ?? post?.ImageURLs?.[0]
  if (!mediaUrl) return "unavailable"
  const path = mediaUrl.split(/[?#]/, 1)[0].toLowerCase()
  if (AUDIO_EXTENSIONS.some(extension => path.endsWith(extension))) return "audio"
  if (videoUrl || VIDEO_EXTENSIONS.some(extension => path.endsWith(extension))) return "video"
  return "image"
}
function formatDeSo(nanos: number) { return new Intl.NumberFormat("en-US", { maximumFractionDigits: 9 }).format(nanos / 1_000_000_000) }
function lowestSalePrice(entries: NFTEntry[]) {
  const forSale = entries.filter(entry => entry.IsForSale)
  const buyNow = forSale.map(entry => entry.BuyNowPriceNanos).filter((price): price is number => typeof price === "number" && price > 0)
  if (buyNow.length) return Math.min(...buyNow)
  const bids = forSale.map(entry => entry.MinBidAmountNanos).filter((amount): amount is number => typeof amount === "number" && amount > 0)
  return bids.length ? Math.min(...bids) : undefined
}
function ownedSaleStatus(entries: NFTEntry[]) {
  const forSale = entries.filter(entry => entry.IsForSale)
  if (!forSale.length) return "Not for sale"
  const buyNow = forSale.map(entry => entry.BuyNowPriceNanos).filter((price): price is number => typeof price === "number" && price > 0)
  if (buyNow.length) return `${forSale.length} for sale · Buy now: ${formatDeSo(Math.min(...buyNow))} DESO`
  const bids = forSale.map(entry => entry.MinBidAmountNanos).filter((amount): amount is number => typeof amount === "number" && amount > 0)
  if (bids.length) return `${forSale.length} for sale · Min bid: ${formatDeSo(Math.min(...bids))} DESO`
  return `${forSale.length} for sale`
}
function title(body?: string) {
  const cleaned = (body ?? "").replace(/https?:\/\/nftz\.me\/\S+/gi, "").replace(/\s+/g, " ").trim()
  if (!cleaned) return "DeSo NFT"
  return cleaned.length > 72 ? `${cleaned.slice(0, 69)}...` : cleaned
}
function mergeNFTEntries(current: NFTEntry[], incoming: NFTEntry[]) {
  const bySerial = new Map<number, NFTEntry>(); const withoutSerial: NFTEntry[] = []
  for (const entry of [...current, ...incoming]) {
    if (typeof entry.SerialNumber === "number") { const existing = bySerial.get(entry.SerialNumber); bySerial.set(entry.SerialNumber, existing ? { ...existing, ...entry } : entry) }
    else withoutSerial.push(entry)
  }
  return [...bySerial.values(), ...withoutSerial]
}
function mergeCollections(current: NFTCollection[], incoming: NFTCollection[]) {
  const byHash = new Map<string, NFTCollection>()
  for (const collection of current) { const hash = collection.PostEntryResponse?.PostHashHex; if (hash) byHash.set(hash, collection) }
  for (const collection of incoming) {
    const hash = collection.PostEntryResponse?.PostHashHex; if (!hash) continue
    const existing = byHash.get(hash)
    if (!existing) { byHash.set(hash, collection); continue }
    byHash.set(hash, { ...existing, PostEntryResponse: collection.PostEntryResponse ?? existing.PostEntryResponse, NFTEntryResponses: mergeNFTEntries(existing.NFTEntryResponses ?? [], collection.NFTEntryResponses ?? []) })
  }
  return Array.from(byHash.values())
}

const styles = {
  action: { background: "#5cff9d", border: "1px solid #5cff9d", borderRadius: "999px", color: "#050807", cursor: "pointer", fontSize: "13px", fontWeight: 800, marginTop: "12px", padding: "9px 14px" },
  controls: { alignItems: "center", display: "flex", flexWrap: "wrap" as const, gap: "10px", marginTop: "14px" }, search: { background: "#050807", border: "1px solid #285f40", borderRadius: "10px", color: "#f4f7f5", fontSize: "13px", maxWidth: "420px", padding: "9px 11px", width: "100%" }, controlLabel: { color: "#a9b8af", fontSize: "12px", fontWeight: 700 }, filter: { background: "transparent", border: "1px solid #285f40", borderRadius: "999px", color: "#b9c8bf", cursor: "pointer", fontSize: "12px", fontWeight: 700, padding: "8px 12px" }, filterActive: { background: "#5cff9d", borderColor: "#5cff9d", color: "#050807" }, select: { background: "#050807", border: "1px solid #285f40", borderRadius: "10px", color: "#f4f7f5", fontSize: "13px", padding: "9px 11px" }, status: { color: "#a9b8af", fontSize: "13px", margin: "12px 0 0" }, error: { color: "#f1d89a", background: "#211a0c", border: "1px solid #6e5721", borderRadius: "12px", marginTop: "12px", padding: "12px" }, grid: { display: "grid", gap: "10px", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", marginTop: "12px" }, card: { background: "#07100b", border: "1px solid #285f40", borderRadius: "12px", color: "#f4f7f5", overflow: "hidden", textDecoration: "none" }, media: { aspectRatio: "1 / 1", background: "#050807", display: "grid", overflow: "hidden", placeItems: "center" }, image: { height: "100%", objectFit: "cover" as const, width: "100%" }, placeholder: { color: "#84958b", display: "grid", fontSize: "12px", height: "100%", placeItems: "center", width: "100%" }, content: { padding: "9px" }, title: { display: "-webkit-box", fontSize: "13px", lineHeight: 1.35, margin: "0 0 6px", minHeight: "35px", overflow: "hidden", WebkitBoxOrient: "vertical" as const, WebkitLineClamp: 2 }, fact: { color: "#a9b8af", fontSize: "11px", margin: 0 }, saleFact: { color: "#b9ffd4", fontSize: "11px", margin: "5px 0 0" }, more: { background: "transparent", border: "1px solid #285f40", borderRadius: "999px", color: "#b9ffd4", cursor: "pointer", fontSize: "13px", fontWeight: 800, marginTop: "14px", padding: "8px 12px" },
}

export default function PublicAccountNFTs({ publicKey, username, autoLoad = false }: { publicKey: string; username: string; autoLoad?: boolean }) {
  const cacheKey = `via:account-nfts:v2:${publicKey}`
  const [nfts, setNFTs] = useState<NFTCollection[] | null>(null); const [loading, setLoading] = useState(false); const [nextKeyHex, setNextKeyHex] = useState(""); const [fullyLoaded, setFullyLoaded] = useState(false); const [linkCopied, setLinkCopied] = useState(false); const [visibleCount, setVisibleCount] = useState(PAGE_SIZE); const [error, setError] = useState(""); const [query, setQuery] = useState(""); const [sortMode, setSortMode] = useState<SortMode>("collection"); const [saleFilter, setSaleFilter] = useState<SaleFilter>("all"); const [mediaFilter, setMediaFilter] = useState<MediaFilter>("all"); const [isInitialStateRestored, setIsInitialStateRestored] = useState(false); const autoLoadStarted = useRef(false); const loadInFlight = useRef(false)
  useEffect(() => {
    if (!autoLoad || isInitialStateRestored) return
    const params = new URLSearchParams(window.location.search); setQuery(params.get("query") ?? "")
    const requestedSort = params.get("sort"); if (["title", "most-owned", "fewest-owned", "lowest-price", "highest-price"].includes(requestedSort ?? "")) setSortMode(requestedSort as SortMode)
    const requestedSale = params.get("sale"); if (requestedSale === "for-sale" || requestedSale === "not-for-sale") setSaleFilter(requestedSale)
    const requestedMedia = params.get("media"); if (["image", "video", "audio", "unavailable"].includes(requestedMedia ?? "")) setMediaFilter(requestedMedia as MediaFilter)
    try { const cachedValue = window.sessionStorage.getItem(cacheKey); if (cachedValue) { const cached = JSON.parse(cachedValue) as Partial<CachedCollection>; if (Array.isArray(cached.nfts)) { setNFTs(cached.nfts); setNextKeyHex(typeof cached.nextKeyHex === "string" ? cached.nextKeyHex : ""); setFullyLoaded(Boolean(cached.fullyLoaded)) } } } catch { window.sessionStorage.removeItem(cacheKey) } finally { setIsInitialStateRestored(true) }
  }, [autoLoad, cacheKey, isInitialStateRestored])
  const persist = useCallback((nextNFTs: NFTCollection[], key: string, done: boolean) => {
    try {
      const cached: CachedCollection = { nfts: nextNFTs, nextKeyHex: key, fullyLoaded: done }
      const serialized = JSON.stringify(cached)
      if (serialized.length > MAX_SESSION_CACHE_CHARS) return
      window.sessionStorage.setItem(cacheKey, serialized)
    } catch { /* Progressive loading continues even when session storage is unavailable. */ }
  }, [cacheKey])
  const loadPage = useCallback(async (reset = false) => {
    if (loadInFlight.current) return; loadInFlight.current = true; setLoading(true); setError("")
    try {
      const requestKey = reset ? "" : nextKeyHex
      const response = await fetchDeSo("get-nfts-for-user", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ UserPublicKeyBase58Check: publicKey, ReaderPublicKeyBase58Check: "", LastKeyHex: requestKey, Limit: DESO_PAGE_LIMIT }) })
      if (!response.ok) { setError("This NFT batch could not be retrieved from DeSo right now."); return }
      const data = await response.json(); const incoming: NFTCollection[] = Object.values(data.NFTsMap ?? {}); const nextKey = typeof data.LastKeyHex === "string" ? data.LastKeyHex : ""; const done = !nextKey || nextKey === requestKey; const nextNFTs = mergeCollections(reset ? [] : nfts ?? [], incoming)
      setNFTs(nextNFTs); setNextKeyHex(done ? "" : nextKey); setFullyLoaded(done); setVisibleCount(current => reset ? PAGE_SIZE : Math.max(current, nextNFTs.length)); persist(nextNFTs, done ? "" : nextKey, done)
    } catch { setError("The public NFTs could not be retrieved from DeSo right now.") } finally { loadInFlight.current = false; setLoading(false) }
  }, [nextKeyHex, nfts, persist, publicKey])
  useEffect(() => { if (autoLoad && isInitialStateRestored && nfts === null && !autoLoadStarted.current) { autoLoadStarted.current = true; void loadPage(true) } }, [autoLoad, isInitialStateRestored, loadPage, nfts])
  const collectionParams = new URLSearchParams({ account: username, accountKey: publicKey, view: "nfts" }); const collectionHref = `/?${collectionParams.toString()}#account-lookup-heading`
  if (nfts === null) { if (!autoLoad) return <a href={collectionHref} style={{ ...styles.action, display: "inline-block", textDecoration: "none" }}>View public NFTs</a>; return <><button type="button" style={styles.action} disabled={!error || loading} onClick={() => void loadPage(true)}>{error ? "Try loading public NFTs again" : "Loading first NFT batch…"}</button>{error ? <div style={styles.error}>{error}</div> : null}</> }
  const totalOwnedCopies = nfts.reduce((total, collection) => total + (collection.NFTEntryResponses?.length ?? 0), 0); const normalizedQuery = query.trim().toLocaleLowerCase()
  const filteredNFTs = nfts.filter(collection => { const post = collection.PostEntryResponse; const searchableText = [post?.Body, post?.ProfileEntryResponse?.Username].filter(Boolean).join(" ").toLocaleLowerCase(); if (normalizedQuery && !searchableText.includes(normalizedQuery)) return false; const entries = collection.NFTEntryResponses ?? []; const hasForSale = entries.some(entry => entry.IsForSale); if (saleFilter === "for-sale" && !hasForSale) return false; if (saleFilter === "not-for-sale" && hasForSale) return false; if (mediaFilter !== "all" && mediaType(post) !== mediaFilter) return false; return true })
  const sortedNFTs = [...filteredNFTs].sort((left, right) => { if (sortMode === "collection") return 0; const leftTitle = title(left.PostEntryResponse?.Body); const rightTitle = title(right.PostEntryResponse?.Body); if (sortMode === "title") return leftTitle.localeCompare(rightTitle, undefined, { sensitivity: "base" }); if (sortMode === "lowest-price" || sortMode === "highest-price") { const leftPrice = lowestSalePrice(left.NFTEntryResponses ?? []); const rightPrice = lowestSalePrice(right.NFTEntryResponses ?? []); if (leftPrice === undefined && rightPrice === undefined) return leftTitle.localeCompare(rightTitle); if (leftPrice === undefined) return 1; if (rightPrice === undefined) return -1; return sortMode === "lowest-price" ? leftPrice - rightPrice : rightPrice - leftPrice } const leftOwned = left.NFTEntryResponses?.length ?? 0; const rightOwned = right.NFTEntryResponses?.length ?? 0; return sortMode === "most-owned" ? rightOwned - leftOwned : leftOwned - rightOwned })
  const visibleNFTs = sortedNFTs.slice(0, visibleCount); const remainingLocal = Math.max(sortedNFTs.length - visibleNFTs.length, 0); const controlsChanged = query !== "" || sortMode !== "collection" || saleFilter !== "all" || mediaFilter !== "all"
  const resetControls = () => { setQuery(""); setSortMode("collection"); setSaleFilter("all"); setMediaFilter("all"); setVisibleCount(PAGE_SIZE) }
  const shareParams = new URLSearchParams({ account: username, accountKey: publicKey, view: "nfts", query, sort: sortMode, sale: saleFilter, media: mediaFilter }); const sharePath = `/?${shareParams.toString()}#account-lookup-heading`
  const copyCollectionLink = async () => { const shareUrl = `${window.location.origin}${sharePath}`; try { await navigator.clipboard.writeText(shareUrl) } catch { const textarea = document.createElement("textarea"); textarea.value = shareUrl; textarea.style.position = "fixed"; textarea.style.opacity = "0"; document.body.appendChild(textarea); textarea.select(); document.execCommand("copy"); textarea.remove() } setLinkCopied(true); window.setTimeout(() => setLinkCopied(false), 2000) }
  return <section aria-label={`Public NFTs owned by @${username}`}>
    {nfts.length > 0 ? <p style={styles.status}>Loaded {nfts.length} different NFT{nfts.length === 1 ? "" : "s"} for @{username}, representing {totalOwnedCopies} owned {totalOwnedCopies === 1 ? "copy" : "copies"}.{fullyLoaded ? " Complete collection loaded." : " More can be loaded from DeSo."}</p> : null}
    {nfts.length > 0 ? <div style={styles.controls}>
      <input type="search" aria-label="Search this account collection" placeholder="Search loaded NFTs by title or creator" value={query} style={styles.search} onChange={event => { setQuery(event.target.value); setVisibleCount(PAGE_SIZE) }} />
      <select aria-label="Sort this account collection" value={sortMode} style={styles.select} onChange={event => { setSortMode(event.target.value as SortMode); setVisibleCount(PAGE_SIZE) }}><option value="collection">Collection order</option><option value="title">Title A–Z</option><option value="most-owned">Most copies owned</option><option value="fewest-owned">Fewest copies owned</option><option value="lowest-price">Lowest price</option><option value="highest-price">Highest price</option></select>
      <span style={styles.controlLabel}>Sale</span>{([["all", "All"], ["for-sale", "For sale"], ["not-for-sale", "Not for sale"]] as const).map(([value, label]) => <button key={value} type="button" aria-pressed={saleFilter === value} style={{ ...styles.filter, ...(saleFilter === value ? styles.filterActive : {}) }} onClick={() => { setSaleFilter(value); setVisibleCount(PAGE_SIZE) }}>{label}</button>))}
      <span style={styles.controlLabel}>Media</span>{([["all", "All"], ["image", "Image"], ["video", "Video"], ["audio", "Audio"], ["unavailable", "Unavailable"]] as const).map(([value, label]) => <button key={value} type="button" aria-pressed={mediaFilter === value} style={{ ...styles.filter, ...(mediaFilter === value ? styles.filterActive : {}) }} onClick={() => { setMediaFilter(value); setVisibleCount(PAGE_SIZE) }}>{label}</button>))}
      <button type="button" disabled={!controlsChanged} style={{ ...styles.filter, opacity: controlsChanged ? 1 : 0.55, cursor: controlsChanged ? "pointer" : "default" }} onClick={resetControls}>Reset collection filters</button><button type="button" style={styles.filter} onClick={copyCollectionLink}>{linkCopied ? "Collection link copied" : "Copy collection link"}</button>
    </div> : null}
    <p style={styles.status}>{nfts.length === 0 ? `No public NFTs found for @${username}.` : `${filteredNFTs.length} matching NFT${filteredNFTs.length === 1 ? "" : "s"} in the loaded set.`}</p>
    {filteredNFTs.length > 0 ? <div style={styles.grid}>{visibleNFTs.map(collection => { const post = collection.PostEntryResponse!; const postHash = post.PostHashHex!; const ownedEntries = collection.NFTEntryResponses ?? []; const ownedCopies = ownedEntries.length; const totalCopies = post.NumNFTCopies ?? ownedCopies; const returnParams = new URLSearchParams({ account: username, accountKey: publicKey, view: "nfts", query, sort: sortMode, sale: saleFilter, media: mediaFilter }); return <a key={postHash} href={`/nft/${postHash}?${returnParams.toString()}`} style={styles.card}><div style={styles.media}><NFTMedia imageUrl={post.ImageURLs?.[0]} videoUrl={post.VideoURLs?.[0]} alt={title(post.Body)} imageStyle={styles.image} placeholderStyle={styles.placeholder} /></div><div style={styles.content}><h3 style={styles.title}>{title(post.Body)}</h3><p style={styles.fact}>@{username} owns {ownedCopies} of {totalCopies} {totalCopies === 1 ? "copy" : "copies"}</p><p style={styles.saleFact}>{ownedSaleStatus(ownedEntries)}</p></div></a> })}</div> : null}
    {remainingLocal > 0 ? <button type="button" style={styles.more} onClick={() => setVisibleCount(current => Math.min(current + PAGE_SIZE, sortedNFTs.length))}>Show next {Math.min(PAGE_SIZE, remainingLocal)} loaded NFTs</button> : null}
    {!fullyLoaded ? <button type="button" style={{ ...styles.more, marginLeft: remainingLocal > 0 ? "10px" : 0 }} disabled={loading} onClick={() => void loadPage(false)}>{loading ? "Loading more from DeSo…" : "Load more from DeSo"}</button> : null}{error ? <div style={styles.error}>{error}</div> : null}
  </section>
}
