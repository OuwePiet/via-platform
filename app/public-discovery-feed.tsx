"use client"

import { useCallback, useState } from "react"
import { fetchDeSo } from "./deso-api"

const PAGE_SIZE = 20

type DeSoPost = {
  PostHashHex?: string
  Body?: string
  TimestampNanos?: number
  CommentCount?: number
  LikeCount?: number
  RepostCount?: number
  DiamondCount?: number
  ProfileEntryResponse?: { Username?: string }
}

const styles = {
  section: { background: "#0a100d", border: "1px solid #254233", borderRadius: "18px", marginBottom: "28px", padding: "20px" },
  heading: { color: "#b9ffd4", fontSize: "16px", margin: "0 0 8px" },
  text: { color: "#a9b8af", fontSize: "13px", lineHeight: 1.6, margin: "0 0 12px" },
  button: { background: "transparent", border: "1px solid #285f40", borderRadius: "999px", color: "#b9ffd4", cursor: "pointer", fontSize: "12px", fontWeight: 800, padding: "8px 12px" },
  feed: { display: "grid", gap: "10px", marginTop: "12px" },
  post: { background: "#07100b", border: "1px solid #1f382b", borderRadius: "12px", padding: "12px" },
  author: { color: "#b9ffd4", fontSize: "12px", fontWeight: 800, margin: "0 0 6px" },
  body: { color: "#e2ebe5", fontSize: "13px", lineHeight: 1.5, margin: 0, overflowWrap: "anywhere" as const, whiteSpace: "pre-wrap" as const },
  meta: { color: "#84958b", display: "flex", flexWrap: "wrap" as const, gap: "9px", fontSize: "10px", marginTop: "8px" },
  error: { color: "#f1d89a", fontSize: "12px", marginTop: "10px" },
}

function count(value?: number) {
  return typeof value === "number" && Number.isFinite(value) ? value : 0
}

function dateLabel(timestampNanos?: number) {
  if (!timestampNanos || !Number.isFinite(timestampNanos)) return null
  const date = new Date(Math.floor(timestampNanos / 1_000_000))
  if (Number.isNaN(date.getTime())) return null
  return new Intl.DateTimeFormat("en", { dateStyle: "medium", timeStyle: "short" }).format(date)
}

export default function PublicDiscoveryFeed() {
  const [posts, setPosts] = useState<DeSoPost[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const load = useCallback(async () => {
    if (loading) return
    setLoading(true)
    setError("")
    try {
      const response = await fetchDeSo("get-posts-stateless", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ReaderPublicKeyBase58Check: "",
          NumToFetch: PAGE_SIZE,
          GetPostsForGlobalWhitelist: true,
          MediaRequired: false,
        }),
      })
      if (!response.ok) throw new Error("Discovery feed failed")
      const data = await response.json()
      setPosts(Array.isArray(data.PostsFound) ? data.PostsFound : [])
    } catch {
      setError("The public DeSo discovery feed could not be retrieved right now.")
    } finally {
      setLoading(false)
    }
  }, [loading])

  return (
    <section style={styles.section} aria-label="Public DeSo discovery feed">
      <h2 style={styles.heading}>Discover DeSo</h2>
      <p style={styles.text}>Read-only public DeSo posts. No login or signing is used in Phase 1.</p>
      <button type="button" style={styles.button} disabled={loading} onClick={load}>
        {loading ? "Loading…" : posts === null ? "Open public feed" : "Refresh public feed"}
      </button>
      {posts?.length === 0 ? <p style={styles.text}>No public posts returned.</p> : null}
      {posts ? (
        <div style={styles.feed}>
          {posts.map((post, index) => {
            const author = post.ProfileEntryResponse?.Username ?? "DeSo account"
            const body = post.Body?.trim() || "Post without text"
            const date = dateLabel(post.TimestampNanos)
            return (
              <article key={post.PostHashHex ?? `${index}-${body}`} style={styles.post}>
                <p style={styles.author}>@{author}{date ? ` · ${date}` : ""}</p>
                <p style={styles.body}>{body}</p>
                <div style={styles.meta}>
                  <span>Replies {count(post.CommentCount)}</span>
                  <span>Likes {count(post.LikeCount)}</span>
                  <span>Reposts {count(post.RepostCount)}</span>
                  <span>Diamonds {count(post.DiamondCount)}</span>
                </div>
              </article>
            )
          })}
        </div>
      ) : null}
      {error ? <p style={styles.error}>{error}</p> : null}
    </section>
  )
}
