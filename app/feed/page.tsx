import type { Metadata } from "next"
import { fetchDeSo } from "../deso-api"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Feed",
  description: "Read-only DeSo social feed on VIA.",
}

type FeedMode = "recent" | "hot" | "media"
type PageProps = { searchParams: Promise<{ view?: string }> }

type FeedPost = {
  PostHashHex?: string
  Body?: string
  ImageURLs?: string[]
  VideoURLs?: string[]
  LikeCount?: number
  CommentCount?: number
  RepostCount?: number
  DiamondCount?: number
  ProfileEntryResponse?: {
    Username?: string
  }
}

async function loadFeed(): Promise<FeedPost[]> {
  try {
    const response = await fetchDeSo("get-posts-stateless", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ReaderPublicKeyBase58Check: "",
        NumToFetch: 40,
        GetPostsForFollowFeed: false,
        GetPostsForGlobalWhitelist: false,
        GetPostsByDESO: false,
        MediaRequired: false,
      }),
      cache: "no-store",
    })

    if (!response.ok) return []

    const data = await response.json()
    return data.PostsFound ?? data.Posts ?? []
  } catch {
    return []
  }
}

function username(post: FeedPost) {
  const name = post.ProfileEntryResponse?.Username
  return name ? `@${name}` : "DeSo user"
}

function profileHref(post: FeedPost) {
  const name = post.ProfileEntryResponse?.Username
  return name ? `/profile/${encodeURIComponent(name)}` : "/feed"
}

function postHref(post: FeedPost) {
  return post.PostHashHex ? `/post/${post.PostHashHex}` : "/feed"
}

function bodyText(body?: string) {
  if (!body) return "Post without text"
  return body.length > 420 ? `${body.slice(0, 417)}...` : body
}

function normalizeMode(value?: string): FeedMode {
  if (value === "hot" || value === "media") return value
  return "recent"
}

function engagementScore(post: FeedPost) {
  return (
    (post.DiamondCount ?? 0) * 4 +
    (post.RepostCount ?? 0) * 3 +
    (post.CommentCount ?? 0) * 2 +
    (post.LikeCount ?? 0)
  )
}

function selectPosts(posts: FeedPost[], mode: FeedMode) {
  if (mode === "media") {
    return posts.filter((post) => (post.ImageURLs?.length ?? 0) + (post.VideoURLs?.length ?? 0) > 0)
  }
  if (mode === "hot") {
    return [...posts].sort((a, b) => engagementScore(b) - engagementScore(a))
  }
  return posts
}

const styles = {
  page: { minHeight: "100vh", background: "#050807", color: "#f4f7f5", padding: "32px 18px 64px", fontFamily: "Arial, Helvetica, sans-serif" },
  container: { maxWidth: "760px", margin: "0 auto" },
  heading: { fontSize: "clamp(28px, 5vw, 44px)", margin: "0 0 8px" },
  intro: { color: "#a9b8af", lineHeight: 1.6, margin: "0 0 18px" },
  modes: { display: "flex", flexWrap: "wrap" as const, gap: "10px", margin: "0 0 28px" },
  mode: { color: "#dce8e0", border: "1px solid #254233", borderRadius: "999px", padding: "8px 12px", textDecoration: "none", fontSize: "13px" },
  activeMode: { color: "#050807", background: "#5cff9d", border: "1px solid #5cff9d", borderRadius: "999px", padding: "8px 12px", textDecoration: "none", fontSize: "13px", fontWeight: 800 },
  list: { display: "grid", gap: "14px" },
  card: { background: "#0c120f", border: "1px solid #254233", borderRadius: "16px", padding: "18px" },
  creator: { display: "inline-block", color: "#5cff9d", fontWeight: 700, margin: "0 0 10px", textDecoration: "none" },
  bodyLink: { color: "inherit", textDecoration: "none" },
  body: { whiteSpace: "pre-wrap" as const, lineHeight: 1.55, margin: "0 0 14px" },
  mediaList: { display: "grid", gap: "10px", margin: "0 0 14px" },
  media: { display: "block", width: "100%", maxHeight: "520px", objectFit: "contain" as const, background: "#070b09", border: "1px solid #1d3529", borderRadius: "12px" },
  stats: { color: "#91a298", fontSize: "13px", lineHeight: 1.5 },
  detailLink: { display: "inline-block", marginTop: "12px", color: "#5cff9d", fontSize: "13px", textDecoration: "none" },
  empty: { color: "#a9b8af", padding: "24px 0" },
}

export default async function FeedPage({ searchParams }: PageProps) {
  const { view } = await searchParams
  const mode = normalizeMode(view)
  const posts = selectPosts(await loadFeed(), mode)
  const options: { key: FeedMode; label: string }[] = [
    { key: "recent", label: "Recent" },
    { key: "hot", label: "Hot" },
    { key: "media", label: "Media" },
  ]

  return (
    <main style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.heading}>DeSo feed</h1>
        <p style={styles.intro}>
          Discover public DeSo posts inside VIA. Recent keeps the node order, Hot ranks the loaded posts by visible engagement, and Media shows posts containing images or video.
        </p>

        <nav style={styles.modes} aria-label="Feed views">
          {options.map((option) => (
            <a key={option.key} href={option.key === "recent" ? "/feed" : `/feed?view=${option.key}`} style={mode === option.key ? styles.activeMode : styles.mode} aria-current={mode === option.key ? "page" : undefined}>
              {option.label}
            </a>
          ))}
        </nav>

        {posts.length === 0 ? (
          <p style={styles.empty}>No posts are available in this view right now.</p>
        ) : (
          <section style={styles.list} aria-label="DeSo posts">
            {posts.map((post, index) => (
              <article key={post.PostHashHex ?? index} style={styles.card}>
                <a href={profileHref(post)} style={styles.creator}>{username(post)}</a>
                <a href={postHref(post)} style={styles.bodyLink}><p style={styles.body}>{bodyText(post.Body)}</p></a>
                {(post.ImageURLs?.length || post.VideoURLs?.length) ? (
                  <div style={styles.mediaList}>
                    {post.ImageURLs?.slice(0, 4).map((url) => <img key={url} src={url} alt={`Post media by ${username(post)}`} loading="lazy" style={styles.media} />)}
                    {post.VideoURLs?.slice(0, 2).map((url) => <video key={url} src={url} controls preload="metadata" style={styles.media} />)}
                  </div>
                ) : null}
                <div style={styles.stats}>{post.LikeCount ?? 0} likes · {post.CommentCount ?? 0} replies · {post.RepostCount ?? 0} reposts · {post.DiamondCount ?? 0} diamonds</div>
                {post.PostHashHex ? <a href={postHref(post)} style={styles.detailLink}>Open post & replies →</a> : null}
              </article>
            ))}
          </section>
        )}
      </div>
    </main>
  )
}
