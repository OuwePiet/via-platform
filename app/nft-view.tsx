import BackToCollection from "./back-to-collection"
import CopyNFTLink from "./copy-nft-link"
import { fetchDeSo } from "./deso-api"
import EditionOwners from "./edition-owners"
import NFTMedia from "./nft-media"
import NFTHistory from "./nft-history"

type DeSoPost = {
  Body?: string
  ImageURLs?: string[]
  VideoURLs?: string[]
  NumNFTCopies?: number
  PosterPublicKeyBase58Check?: string
  TimestampNanos?: number
  ProfileEntryResponse?: { Username?: string }
}

type NFTEntry = {
  IsForSale?: boolean
  MinBidAmountNanos?: number
  OwnerPublicKeyBase58Check?: string
  BuyNowPriceNanos?: number
  SerialNumber?: number
}

async function requestDeSo(endpoint: string, postHash: string) {
  const response = await fetchDeSo(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ PostHashHex: postHash, ReaderPublicKeyBase58Check: "" }),
    cache: "no-store",
  })
  if (!response.ok) throw new Error(`DeSo API returned ${response.status}`)
  return response.json()
}

async function profileUsername(publicKey?: string) {
  if (!publicKey) return undefined
  const response = await fetchDeSo("get-single-profile", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ PublicKeyBase58Check: publicKey }),
    cache: "no-store",
  })
  if (!response.ok) return undefined
  const data = await response.json()
  return (data.Profile ?? data.ProfileEntryResponse ?? {}).Username as string | undefined
}

function shortKey(key?: string) {
  return key ? `${key.slice(0, 10)}...${key.slice(-8)}` : "Not available"
}
function formatDeSo(nanos: number) {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 9 }).format(nanos / 1_000_000_000)
}
function clean(body?: string) {
  return (body ?? "").replace(/https?:\/\/nftz\.me\/\S+/gi, "").replace(/\s+/g, " ").trim()
}
function title(body?: string) {
  const value = clean(body) || "DeSo NFT"
  return value.length > 72 ? `${value.slice(0, 69)}...` : value
}
function saleStatus(forSale: NFTEntry[]) {
  if (!forSale.length) return "Not for sale"
  const buy = forSale.map(x => x.BuyNowPriceNanos).filter((x): x is number => typeof x === "number" && x > 0)
  if (buy.length) return `Buy now: ${formatDeSo(Math.min(...buy))} DESO`
  const bids = forSale.map(x => x.MinBidAmountNanos).filter((x): x is number => typeof x === "number" && x > 0)
  if (bids.length) return `Min bid: ${formatDeSo(Math.min(...bids))} DESO`
  return `${forSale.length} for sale`
}

function mediaStorage(url?: string) {
  if (!url) return "No media reference"
  const value = url.toLowerCase()
  if (value.startsWith("ipfs://") || value.includes("/ipfs/")) return "IPFS / decentralized"
  if (value.startsWith("ar://") || value.includes("arweave.net/") || value.includes("arweave.dev/")) return "Arweave / decentralized"
  if (value.startsWith("data:")) return "Embedded data"
  if (value.startsWith("http://") || value.startsWith("https://")) return "External web host"
  return "Storage type unknown"
}

const styles = {
  page: { minHeight: "100vh", background: "var(--via-bg)", color: "var(--via-text)", fontFamily: "Arial, Helvetica, sans-serif", padding: "32px 20px 64px" },
  container: { width: "100%", maxWidth: "1040px", margin: "0 auto" },
  actions: { display: "flex", justifyContent: "space-between", gap: "12px", flexWrap: "wrap" as const, marginBottom: "24px" },
  link: { color: "var(--via-accent)", textDecoration: "none" },
  button: { background: "transparent", border: "1px solid var(--via-accent)", borderRadius: "999px", color: "var(--via-accent)", cursor: "pointer", padding: "8px 12px" },
  brand: { color: "var(--via-accent)", fontSize: "14px", fontWeight: 700, letterSpacing: ".18em", textTransform: "uppercase" as const },
  heading: { fontSize: "clamp(22px, 3vw, 34px)", margin: "10px 0 24px" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px", alignItems: "start" },
  media: { aspectRatio: "1 / 1", background: "var(--via-surface)", border: "1px solid rgba(74, 222, 128, 0.24)", borderRadius: "18px", overflow: "hidden" },
  image: { width: "100%", height: "100%", objectFit: "contain" as const },
  placeholder: { width: "100%", height: "100%", display: "grid", placeItems: "center", color: "var(--via-muted)" },
  card: { background: "var(--via-surface)", border: "1px solid rgba(74, 222, 128, 0.24)", borderRadius: "18px", padding: "24px" },
  badge: { display: "inline-block", color: "var(--via-accent)", background: "rgba(74, 222, 128, 0.08)", border: "1px solid rgba(74, 222, 128, 0.34)", borderRadius: "999px", padding: "7px 11px", marginBottom: "18px" },
  description: { color: "var(--via-text)", lineHeight: 1.65 },
  facts: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: "12px", marginTop: "20px" },
  fact: { background: "rgba(4, 10, 9, 0.72)", borderRadius: "12px", padding: "14px" },
  label: { color: "var(--via-muted)", fontSize: "12px", textTransform: "uppercase" as const },
  value: { margin: "6px 0 0", fontWeight: 700, overflowWrap: "anywhere" as const },
  code: { color: "var(--via-muted)", fontSize: "12px", overflowWrap: "anywhere" as const },
  warning: { color: "#F1D89A", background: "#211A0C", border: "1px solid #6E5721", borderRadius: "12px", padding: "12px", marginBottom: "16px" },
}

export default async function NFTView({ postHash, backHref = "/" }: { postHash: string; backHref?: string }) {
  try {
    const [postData, nftData] = await Promise.all([
      requestDeSo("get-single-post", postHash),
      requestDeSo("get-nft-entries-for-nft-post", postHash),
    ])
    const post: DeSoPost = postData.PostFound ?? postData.PostFoundResponse ?? {}
    const entries: NFTEntry[] = nftData.NFTEntryResponses ?? nftData.NFTEntries ?? nftData.NFTEntryResponse ?? []
    const sorted = [...entries].sort((a, b) => (a.SerialNumber ?? 0) - (b.SerialNumber ?? 0))
    const keys = Array.from(new Set(sorted.map(x => x.OwnerPublicKeyBase58Check).filter((x): x is string => Boolean(x))))
    const names = new Map(await Promise.all(keys.map(async key => [key, await profileUsername(key)] as const)))
    const owners = sorted.map((entry, index) => ({
      serialNumber: entry.SerialNumber ?? index + 1,
      owner: entry.OwnerPublicKeyBase58Check && names.get(entry.OwnerPublicKeyBase58Check)
        ? `@${names.get(entry.OwnerPublicKeyBase58Check)}`
        : shortKey(entry.OwnerPublicKeyBase58Check),
      publicKey: entry.OwnerPublicKeyBase58Check,
    }))
    const forSale = entries.filter(x => x.IsForSale)
    const creator = post.ProfileEntryResponse?.Username ? `@${post.ProfileEntryResponse.Username}` : shortKey(post.PosterPublicKeyBase58Check)
    const status = saleStatus(forSale)
    const mediaUrl = post.VideoURLs?.[0] ?? post.ImageURLs?.[0]
    const storage = mediaStorage(mediaUrl)

    return <main style={styles.page}><div style={styles.container}>
      <div style={styles.actions}><BackToCollection href={backHref} style={styles.link}/><CopyNFTLink style={styles.button}/></div>
      <p style={styles.brand}>VIA</p><h1 style={styles.heading}>{title(post.Body)}</h1>
      <div style={styles.grid}>
        <div style={styles.media}><NFTMedia imageUrl={post.ImageURLs?.[0]} videoUrl={post.VideoURLs?.[0]} alt={title(post.Body)} imageStyle={styles.image} placeholderStyle={styles.placeholder}/></div>
        <section style={styles.card}>
          <div style={styles.badge}>On DeSo</div>
          {/https?:\/\/nftz\.me\/\S+/i.test(post.Body ?? "") ? <div style={styles.warning}>Legacy nftz.me link detected. VIA reads the NFT directly from DeSo and does not depend on that link.</div> : null}
          <p style={styles.description}>{clean(post.Body) || "No on-chain description available."}</p>
          <dl style={styles.facts}>
            <div style={styles.fact}><dt style={styles.label}>Creator</dt><dd style={styles.value}>{creator}</dd></div>
            <div style={styles.fact}><dt style={styles.label}>Copies</dt><dd style={styles.value}>{post.NumNFTCopies ?? entries.length}</dd></div>
            <div style={styles.fact}><dt style={styles.label}>Owners</dt><dd style={styles.value}>{keys.length}</dd></div>
            <div style={styles.fact}><dt style={styles.label}>Sale status</dt><dd style={styles.value}>{status}</dd></div>
            <div style={styles.fact}><dt style={styles.label}>Media storage</dt><dd style={styles.value}>{storage}</dd></div>
          </dl>
          {owners.length > 1 ? <EditionOwners editions={owners}/> : null}
          <NFTHistory postTimestampNanos={post.TimestampNanos} editionCount={entries.length} uniqueOwnerCount={keys.length} forSaleCount={forSale.length} saleStatus={status}/>
          <p style={{...styles.label, marginTop: "22px"}}>Blockchain PostHash</p><code style={styles.code}>{postHash}</code>
        </section>
      </div>
    </div></main>
  } catch {
    return <main style={styles.page}><div style={styles.container}><BackToCollection href={backHref} style={styles.link}/><p style={styles.brand}>VIA</p><section style={styles.card}><p>The NFT data could not be retrieved from DeSo right now.</p></section></div></main>
  }
}
