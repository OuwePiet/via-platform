import { fetchDeSo } from "./deso-api"
import NFTMedia from "./nft-media"
import PublicPostThread from "./public-post-thread"

type DeSoPost = {
  PostHashHex?: string
  Body?: string
  TimestampNanos?: number
  ImageURLs?: string[]
  VideoURLs?: string[]
  CommentCount?: number
  LikeCount?: number
  RepostCount?: number
  QuoteRepostCount?: number
  DiamondCount?: number
  IsNFT?: boolean
  ProfileEntryResponse?: {
    Username?: string
    PublicKeyBase58Check?: string
  }
}

const styles = {
  page: { minHeight: "100vh", background: "#050807", color: "#f4f7f5", padding: "32px 20px 64px", fontFamily: "Arial, Helvetica, sans-serif" },
  shell: { maxWidth: "900px", margin: "0 auto" },
  back: { color: "#b9ffd4", textDecoration: "none", fontSize: "13px", fontWeight: 800 },
  brand: { color: "#5cff9d", fontSize: "12px", fontWeight: 800, letterSpacing: "0.18em", margin: "24px 0 8px" },
  card: { background: "#07100b", border: "1px solid #285f40", borderRadius: "16px", overflow: "hidden" },
  content: { padding: "18px" },
  author: { color: "#b9ffd4", fontSize: "13px", fontWeight: 800, margin: "0 0 10px" },
  body: { color: "#e2ebe5", fontSize: "15px", lineHeight: 1.65, margin: 0, whiteSpace: "pre-wrap" as const, overflowWrap: "anywhere" as const },
  meta: { color: "#84958b", display: "flex", flexWrap: "wrap" as const, gap: "10px", fontSize: "11px", marginTop: "12px" },
  storage: { background: "#050807", border: "1px solid #1f382b", borderRadius: "10px", color: "#a9b8af", fontSize: "12px", lineHeight: 1.5, marginTop: "14px", padding: "10px 12px" },
  storageStrong: { color: "#b9ffd4", fontWeight: 800 },
  media: { aspectRatio: "16 / 10", background: "#050807", borderTop: "1px solid #1f382b", maxHeight: "680px", overflow: "hidden", width: "100%" },
  mediaImage: { display: "block", height: "100%", objectFit: "contain" as const, width: "100%" },
  mediaPlaceholder: { color: "#84958b", display: "grid", height: "100%", placeItems: "center", width: "100%" },
  error: { color: "#f1d89a", background: "#211a0c", border: "1px solid #6e5721", borderRadius: "12px", padding: "14px", marginTop: "18px" },
}

function safeCount(value?: number) {
  return typeof value === "number" && Number.isFinite(value) ? value : 0
}

function formatDate(timestampNanos?: number) {
  if (!timestampNanos || !Number.isFinite(timestampNanos)) return null
  const date = new Date(Math.floor(timestampNanos / 1_000_000))
  if (Number.isNaN(date.getTime())) return null
  return new Intl.DateTimeFormat("en", { dateStyle: "medium", timeStyle: "short" }).format(date)
}

function storageStatus(post: DeSoPost) {
  const hasExternalMedia = Boolean(post.ImageURLs?.length || post.VideoURLs?.length)
  return hasExternalMedia
    ? {
        label: "DeSo on-chain · media externally linked",
        detail: "The post record is read from DeSo. Linked image/video availability depends on its media host.",
      }
    : {
        label: "DeSo on-chain",
        detail: "This post has no linked image/video media in the data VIA received.",
      }
}

async function loadPost(postHash: string): Promise<DeSoPost | null> {
  const response = await fetchDeSo("get-single-post", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ PostHashHex: postHash, ReaderPublicKeyBase58Check: "", FetchParents: false, CommentOffset: 0, CommentLimit: 0, AddGlobalFeedBool: false }),
    cache: "no-store",
  })

  if (!response.ok) return null
  const data = await response.json()
  return data.PostFound ?? data.PostFoundResponse ?? null
}

export default async function PostView({ postHash, backHref = "/" }: { postHash: string; backHref?: string }) {
  const post = await loadPost(postHash)

  if (!post) {
    return (
      <main style={styles.page}>
        <div style={styles.shell}>
          <a href={backHref} style={styles.back}>← Back</a>
          <div style={styles.error}>This public DeSo post could not be loaded right now.</div>
        </div>
      </main>
    )
  }

  const author = post.ProfileEntryResponse?.Username ?? "DeSo account"
  const publicKey = post.ProfileEntryResponse?.PublicKeyBase58Check
  const profileHref = publicKey ? `/?account=${encodeURIComponent(author)}&accountKey=${encodeURIComponent(publicKey)}&view=social#account-lookup-heading` : null
  const date = formatDate(post.TimestampNanos)
  const replyCount = safeCount(post.CommentCount)
  const imageUrl = post.ImageURLs?.[0]
  const videoUrl = post.VideoURLs?.[0]
  const hasMedia = Boolean(imageUrl || videoUrl)
  const storage = storageStatus(post)

  return (
    <main style={styles.page}>
      <div style={styles.shell}>
        <a href={backHref} style={styles.back}>← Back</a>
        <p style={styles.brand}>VIA · READ-ONLY POST</p>
        <article style={styles.card}>
          <div style={styles.content}>
            <p style={styles.author}>
              {profileHref ? <a href={profileHref} style={styles.back}>@{author}</a> : <>@{author}</>}
              {date ? ` · ${date}` : ""}
            </p>
            <p style={styles.body}>{post.Body?.trim() || (post.IsNFT ? "NFT post" : "Post without text")}</p>
            <div style={styles.meta} aria-label="Public post activity">
              <span>Replies {replyCount}</span>
              <span>Likes {safeCount(post.LikeCount)}</span>
              <span>Reposts {safeCount(post.RepostCount)}</span>
              <span>Quotes {safeCount(post.QuoteRepostCount)}</span>
              <span>Diamonds {safeCount(post.DiamondCount)}</span>
              {post.IsNFT ? <span>NFT</span> : null}
            </div>
            <div style={styles.storage} aria-label="Post storage status">
              <span style={styles.storageStrong}>Storage status: {storage.label}</span><br />
              {storage.detail}
            </div>
            {replyCount > 0 ? <PublicPostThread postHash={postHash} replyCount={replyCount} /> : null}
          </div>
          {hasMedia ? (
            <div style={styles.media}>
              <NFTMedia imageUrl={imageUrl} videoUrl={videoUrl} watermark={Boolean(post.IsNFT)} alt={`Public DeSo post by @${author}`} imageStyle={styles.mediaImage} placeholderStyle={styles.mediaPlaceholder} />
            </div>
          ) : null}
        </article>
      </div>
    </main>
  )
}
