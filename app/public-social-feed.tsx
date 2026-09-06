"use client"

import { useCallback, useState } from "react"
import { fetchDeSo } from "./deso-api"
import NFTMedia from "./nft-media"

const PAGE_SIZE = 25

type DeSoPost = {
  PostHashHex?: string
  Body?: string
  TimestampNanos?: number
  ImageURLs?: string[]
  VideoURLs?: string[]
  IsNFT?: boolean
  CommentCount?: number
  LikeCount?: number
  RepostCount?: number
  QuoteRepostCount?: number
  DiamondCount?: number
  ProfileEntryResponse?: {
    Username?: string
  }
}

const styles = {
  action: {
    background: "transparent",
    border: "1px solid #285f40",
    borderRadius: "999px",
    color: "#b9ffd4",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: 800,
    marginLeft: "8px",
    marginTop: "12px",
    padding: "9px 14px",
  },
  status: {
    color: "#a9b8af",
    fontSize: "12px",
    margin: "12px 0 0",
  },
  error: {
    color: "#f1d89a",
    background: "#211a0c",
    border: "1px solid #6e5721",
    borderRadius: "12px",
    marginTop: "12px",
    padding: "12px",
  },
  feed: {
    display: "grid",
    gap: "10px",
    marginTop: "12px",
  },
  post: {
    background: "#07100b",
    border: "1px solid #285f40",
    borderRadius: "12px",
    overflow: "hidden",
  },
  postContent: {
    padding: "12px",
  },
  author: {
    color: "#b9ffd4",
    fontSize: "12px",
    fontWeight: 800,
    margin: "0 0 7px",
  },
  body: {
    color: "#e2ebe5",
    fontSize: "13px",
    lineHeight: 1.55,
    margin: 0,
    whiteSpace: "pre-wrap" as const,
    overflowWrap: "anywhere" as const,
  },
  media: {
    aspectRatio: "16 / 10",
    background: "#050807",
    borderTop: "1px solid #1f382b",
    maxHeight: "520px",
    overflow: "hidden",
    width: "100%",
  },
  mediaImage: {
    display: "block",
    height: "100%",
    objectFit: "contain" as const,
    width: "100%",
  },
  mediaPlaceholder: {
    color: "#84958b",
    display: "grid",
    height: "100%",
    placeItems: "center",
    width: "100%",
  },
  meta: {
    color: "#84958b",
    display: "flex",
    flexWrap: "wrap" as const,
    gap: "10px",
    fontSize: "11px",
    marginTop: "9px",
  },
}

function safeCount(value?: number) {
  return typeof value === "number" && Number.isFinite(value) ? value : 0
}

function formatDate(timestampNanos?: number) {
  if (!timestampNanos || !Number.isFinite(timestampNanos)) return null
  const millis = Math.floor(timestampNanos / 1_000_000)
  const date = new Date(millis)
  if (Number.isNaN(date.getTime())) return null
  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date)
}

function uniquePosts(posts: DeSoPost[]) {
  const seen = new Set<string>()
  return posts.filter((post, index) => {
    const key = post.PostHashHex ?? `index-${index}-${post.TimestampNanos ?? ""}`
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}

export default function PublicSocialFeed({
  publicKey,
  username,
}: {
  publicKey: string
  username: string
}) {
  const [posts, setPosts] = useState<DeSoPost[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [error, setError] = useState("")

  const fetchPage = useCallback(async (lastPostHashHex = "") => {
    const response = await fetchDeSo("get-posts-for-public-key", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        PublicKeyBase58Check: publicKey,
        ReaderPublicKeyBase58Check: "",
        LastPostHashHex: lastPostHashHex,
        NumToFetch: PAGE_SIZE,
        MediaRequired: false,
      }),
    })

    if (!response.ok) {
      throw new Error("DeSo social feed request failed")
    }

    const data = await response.json()
    const retrieved: DeSoPost[] = Array.isArray(data.Posts)
      ? data.Posts
      : Array.isArray(data.PostsFound)
        ? data.PostsFound
        : []

    return retrieved
  }, [publicKey])

  const loadPosts = useCallback(async () => {
    setLoading(true)
    setError("")

    try {
      const retrieved = await fetchPage()
      setPosts(uniquePosts(retrieved))
      setHasMore(retrieved.length === PAGE_SIZE)
    } catch {
      setError("The public DeSo posts could not be retrieved right now.")
    } finally {
      setLoading(false)
    }
  }, [fetchPage])

  const loadMore = useCallback(async () => {
    if (!posts?.length || loadingMore || !hasMore) return

    const lastPostHashHex = posts[posts.length - 1]?.PostHashHex
    if (!lastPostHashHex) {
      setHasMore(false)
      return
    }

    setLoadingMore(true)
    setError("")

    try {
      const retrieved = await fetchPage(lastPostHashHex)
      const combined = uniquePosts([...posts, ...retrieved])
      setPosts(combined)
      setHasMore(retrieved.length === PAGE_SIZE && combined.length > posts.length)
    } catch {
      setError("More public DeSo posts could not be retrieved right now.")
    } finally {
      setLoadingMore(false)
    }
  }, [fetchPage, hasMore, loadingMore, posts])

  if (posts === null) {
    return (
      <>
        <button
          type="button"
          style={styles.action}
          disabled={loading}
          onClick={loadPosts}
        >
          {loading ? "Loading social posts…" : "View public social posts"}
        </button>
        {error ? <div style={styles.error}>{error}</div> : null}
      </>
    )
  }

  return (
    <section aria-label={`Public DeSo posts by @${username}`}>
      <p style={styles.status}>
        Read-only social feed · {posts.length} recent posts loaded from DeSo
      </p>
      <div style={styles.feed}>
        {posts.map((post, index) => {
          const date = formatDate(post.TimestampNanos)
          const author = post.ProfileEntryResponse?.Username ?? username
          const body = post.Body?.trim() || (post.IsNFT ? "NFT post" : "Post without text")
          const imageUrl = post.ImageURLs?.[0]
          const videoUrl = post.VideoURLs?.[0]
          const hasMedia = Boolean(imageUrl || videoUrl)

          return (
            <article key={post.PostHashHex ?? `${index}-${body}`} style={styles.post}>
              <div style={styles.postContent}>
                <p style={styles.author}>@{author}{date ? ` · ${date}` : ""}</p>
                <p style={styles.body}>{body}</p>
                <div style={styles.meta} aria-label="Public post activity">
                  <span>Replies {safeCount(post.CommentCount)}</span>
                  <span>Likes {safeCount(post.LikeCount)}</span>
                  <span>Reposts {safeCount(post.RepostCount)}</span>
                  <span>Quotes {safeCount(post.QuoteRepostCount)}</span>
                  <span>Diamonds {safeCount(post.DiamondCount)}</span>
                  {post.ImageURLs?.length ? <span>Image</span> : null}
                  {post.VideoURLs?.length ? <span>Video</span> : null}
                  {post.IsNFT ? <span>NFT</span> : null}
                </div>
              </div>

              {hasMedia ? (
                <div style={styles.media}>
                  <NFTMedia
                    imageUrl={imageUrl}
                    videoUrl={videoUrl}
                    alt={`Public DeSo post by @${author}`}
                    imageStyle={styles.mediaImage}
                    placeholderStyle={styles.mediaPlaceholder}
                  />
                </div>
              ) : null}
            </article>
          )
        })}
      </div>

      {hasMore ? (
        <button
          type="button"
          style={styles.action}
          disabled={loadingMore}
          onClick={loadMore}
        >
          {loadingMore ? "Loading more…" : "Load more social posts"}
        </button>
      ) : (
        <p style={styles.status}>No more recent posts available.</p>
      )}

      {error ? <div style={styles.error}>{error}</div> : null}
    </section>
  )
}
