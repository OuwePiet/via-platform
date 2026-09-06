import type { Metadata } from "next"
import { fetchDeSo } from "../deso-api"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Feed",
  description: "Read-only DeSo social feed on VIA.",
}

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
        NumToFetch: 30,
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

function accountHref(post: FeedPost) {
  const name = post.ProfileEntryResponse?.Username
  return name ? `/?account=${encodeURIComponent(name)}` : "/"
}

function bodyText(body?: string) {
  if (!body) return "Post without text"
  return body.length > 420 ? `${body.slice(0, 417)}...` : body
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#050807",
    color: "#f4f7f5",
    padding: "32px 18px 64px",
    fontFamily: "Arial, Helvetica, sans-serif",
  },
  container: {
    maxWidth: "760px",
    margin: "0 auto",
  },
  heading: {
    fontSize: "clamp(28px, 5vw, 44px)",
    margin: "0 0 8px",
  },
  intro: {
    color: "#a9b8af",
    lineHeight: 1.6,
    margin: "0 0 28px",
  },
  list: {
    display: "grid",
    gap: "14px",
  },
  card: {
    background: "#0c120f",
    border: "1px solid #254233",
    borderRadius: "16px",
    padding: "18px",
  },
  creator: {
    display: "inline-block",
    color: "#5cff9d",
    fontWeight: 700,
    margin: "0 0 10px",
    textDecoration: "none",
  },
  body: {
    whiteSpace: "pre-wrap" as const,
    lineHeight: 1.55,
    margin: "0 0 14px",
  },
  mediaList: {
    display: "grid",
    gap: "10px",
    margin: "0 0 14px",
  },
  media: {
    display: "block",
    width: "100%",
    maxHeight: "520px",
    objectFit: "contain" as const,
    background: "#070b09",
    border: "1px solid #1d3529",
    borderRadius: "12px",
  },
  stats: {
    color: "#91a298",
    fontSize: "13px",
    lineHeight: 1.5,
  },
  empty: {
    color: "#a9b8af",
    padding: "24px 0",
  },
}

export default async function FeedPage() {
  const posts = await loadFeed()

  return (
    <main style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.heading}>DeSo feed</h1>
        <p style={styles.intro}>
          Public posts loaded read-only from DeSo. Open a creator to view that
          account&apos;s NFT collection on VIA. Posting, liking, reposting and
          diamonds remain disabled in this step.
        </p>

        {posts.length === 0 ? (
          <p style={styles.empty}>Feed is temporarily unavailable.</p>
        ) : (
          <section style={styles.list} aria-label="DeSo posts">
            {posts.map((post, index) => (
              <article key={post.PostHashHex ?? index} style={styles.card}>
                <a href={accountHref(post)} style={styles.creator}>
                  {username(post)}
                </a>

                <p style={styles.body}>{bodyText(post.Body)}</p>

                {(post.ImageURLs?.length || post.VideoURLs?.length) ? (
                  <div style={styles.mediaList}>
                    {post.ImageURLs?.slice(0, 4).map((url) => (
                      <img
                        key={url}
                        src={url}
                        alt={`Post media by ${username(post)}`}
                        loading="lazy"
                        style={styles.media}
                      />
                    ))}
                    {post.VideoURLs?.slice(0, 2).map((url) => (
                      <video
                        key={url}
                        src={url}
                        controls
                        preload="metadata"
                        style={styles.media}
                      />
                    ))}
                  </div>
                ) : null}

                <div style={styles.stats}>
                  {post.LikeCount ?? 0} likes · {post.CommentCount ?? 0} replies · {post.RepostCount ?? 0} reposts · {post.DiamondCount ?? 0} diamonds
                </div>
              </article>
            ))}
          </section>
        )}
      </div>
    </main>
  )
}
