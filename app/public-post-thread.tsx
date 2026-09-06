"use client"

import { useCallback, useState } from "react"
import { fetchDeSo } from "./deso-api"

const COMMENT_LIMIT = 25

type DeSoComment = {
  PostHashHex?: string
  Body?: string
  TimestampNanos?: number
  CommentCount?: number
  LikeCount?: number
  DiamondCount?: number
  ProfileEntryResponse?: {
    Username?: string
  }
}

type DeSoPostWithComments = DeSoComment & {
  Comments?: DeSoComment[]
}

const styles = {
  button: {
    background: "transparent",
    border: "1px solid #285f40",
    borderRadius: "999px",
    color: "#b9ffd4",
    cursor: "pointer",
    fontSize: "11px",
    fontWeight: 800,
    marginTop: "10px",
    padding: "7px 10px",
  },
  thread: {
    borderTop: "1px solid #1f382b",
    marginTop: "10px",
    paddingTop: "10px",
  },
  comment: {
    background: "#050807",
    border: "1px solid #1f382b",
    borderRadius: "10px",
    marginTop: "8px",
    padding: "10px",
  },
  author: {
    color: "#b9ffd4",
    fontSize: "11px",
    fontWeight: 800,
    margin: "0 0 5px",
  },
  body: {
    color: "#dce7e0",
    fontSize: "12px",
    lineHeight: 1.5,
    margin: 0,
    overflowWrap: "anywhere" as const,
    whiteSpace: "pre-wrap" as const,
  },
  meta: {
    color: "#84958b",
    display: "flex",
    flexWrap: "wrap" as const,
    gap: "9px",
    fontSize: "10px",
    marginTop: "7px",
  },
  status: {
    color: "#84958b",
    fontSize: "11px",
    margin: "8px 0 0",
  },
  error: {
    color: "#f1d89a",
    fontSize: "11px",
    margin: "8px 0 0",
  },
}

function safeCount(value?: number) {
  return typeof value === "number" && Number.isFinite(value) ? value : 0
}

function formatDate(timestampNanos?: number) {
  if (!timestampNanos || !Number.isFinite(timestampNanos)) return null
  const date = new Date(Math.floor(timestampNanos / 1_000_000))
  if (Number.isNaN(date.getTime())) return null

  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date)
}

export default function PublicPostThread({
  postHash,
  replyCount,
}: {
  postHash: string
  replyCount: number
}) {
  const [comments, setComments] = useState<DeSoComment[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const loadReplies = useCallback(async () => {
    setLoading(true)
    setError("")

    try {
      const response = await fetchDeSo("get-single-post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          PostHashHex: postHash,
          ReaderPublicKeyBase58Check: "",
          FetchParents: false,
          CommentOffset: 0,
          CommentLimit: COMMENT_LIMIT,
        }),
      })

      if (!response.ok) {
        setError("Replies could not be retrieved from DeSo right now.")
        return
      }

      const data = await response.json()
      const post: DeSoPostWithComments =
        data.PostFound ?? data.PostFoundResponse ?? {}
      const retrieved = Array.isArray(post.Comments)
        ? post.Comments
        : Array.isArray(data.Comments)
          ? data.Comments
          : []

      setComments(retrieved.slice(0, COMMENT_LIMIT))
    } catch {
      setError("Replies could not be retrieved from DeSo right now.")
    } finally {
      setLoading(false)
    }
  }, [postHash])

  if (comments === null) {
    return (
      <>
        <button type="button" style={styles.button} disabled={loading} onClick={loadReplies}>
          {loading ? "Loading replies…" : `View replies (${replyCount})`}
        </button>
        {error ? <p style={styles.error}>{error}</p> : null}
      </>
    )
  }

  return (
    <div style={styles.thread}>
      <p style={styles.status}>
        {comments.length === 0
          ? "No public replies returned by DeSo."
          : `${comments.length} public ${comments.length === 1 ? "reply" : "replies"} shown`}
      </p>

      {comments.map((comment, index) => {
        const author = comment.ProfileEntryResponse?.Username ?? "DeSo account"
        const date = formatDate(comment.TimestampNanos)
        const body = comment.Body?.trim() || "Reply without text"

        return (
          <article key={comment.PostHashHex ?? `${index}-${body}`} style={styles.comment}>
            <p style={styles.author}>@{author}{date ? ` · ${date}` : ""}</p>
            <p style={styles.body}>{body}</p>
            <div style={styles.meta}>
              <span>Replies {safeCount(comment.CommentCount)}</span>
              <span>Likes {safeCount(comment.LikeCount)}</span>
              <span>Diamonds {safeCount(comment.DiamondCount)}</span>
            </div>
          </article>
        )
      })}

      {replyCount > comments.length ? (
        <p style={styles.status}>
          Showing up to {COMMENT_LIMIT} replies in this read-only Phase 1 view.
        </p>
      ) : null}
    </div>
  )
}
