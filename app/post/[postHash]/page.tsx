import type { Metadata } from "next"
import { fetchDeSo } from "../../deso-api"

export const dynamic = "force-dynamic"

type PageProps = {
  params: Promise<{ postHash: string }>
}

type Post = {
  PostHashHex?: string
  Body?: string
  ImageURLs?: string[]
  VideoURLs?: string[]
  LikeCount?: number
  CommentCount?: number
  RepostCount?: number
  DiamondCount?: number
  ProfileEntryResponse?: { Username?: string }
  Comments?: Post[]
}

function name(post?: Post) {
  const username = post?.ProfileEntryResponse?.Username
  return username ? `@${username}` : "DeSo user"
}

async function loadPost(postHash: string): Promise<Post | null> {
  try {
    const response = await fetchDeSo("get-single-post", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        PostHashHex: postHash,
        ReaderPublicKeyBase58Check: "",
        FetchParents: true,
        CommentOffset: 0,
        CommentLimit: 50,
        AddGlobalFeedBool: false,
      }),
      cache: "no-store",
    })

    if (!response.ok) return null
    const data = await response.json()
    return data.PostFound ?? data.PostFoundResponse ?? null
  } catch {
    return null
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { postHash } = await params
  return {
    title: "Post",
    description: `Read-only DeSo post ${postHash} on VIA.`,
  }
}

const styles = {
  page: { minHeight: "100vh", background: "#050807", color: "#f4f7f5", padding: "32px 18px 64px", fontFamily: "Arial, Helvetica, sans-serif" },
  container: { maxWidth: "760px", margin: "0 auto" },
  link: { color: "#5cff9d", textDecoration: "none" },
  card: { background: "#0c120f", border: "1px solid #254233", borderRadius: "16px", padding: "18px", marginTop: "18px" },
  creator: { color: "#5cff9d", fontWeight: 700, marginBottom: "10px" },
  body: { whiteSpace: "pre-wrap" as const, lineHeight: 1.6 },
  media: { display: "block", width: "100%", maxHeight: "620px", objectFit: "contain" as const, background: "#070b09", borderRadius: "12px", marginTop: "12px" },
  stats: { color: "#91a298", fontSize: "13px", marginTop: "14px" },
  replies: { display: "grid", gap: "12px", marginTop: "24px" },
  reply: { background: "#0a0f0c", border: "1px solid #1f372b", borderRadius: "14px", padding: "16px" },
}

export default async function PostPage({ params }: PageProps) {
  const { postHash } = await params
  const post = await loadPost(postHash)

  if (!post) {
    return <main style={styles.page}><div style={styles.container}><a href="/feed" style={styles.link}>← Back to feed</a><p>Post unavailable.</p></div></main>
  }

  const comments = post.Comments ?? []

  return (
    <main style={styles.page}>
      <div style={styles.container}>
        <a href="/feed" style={styles.link}>← Back to feed</a>
        <article style={styles.card}>
          <div style={styles.creator}>{name(post)}</div>
          <div style={styles.body}>{post.Body || "Post without text"}</div>
          {post.ImageURLs?.slice(0, 4).map((url) => <img key={url} src={url} alt={`Post media by ${name(post)}`} style={styles.media} />)}
          {post.VideoURLs?.slice(0, 2).map((url) => <video key={url} src={url} controls preload="metadata" style={styles.media} />)}
          <div style={styles.stats}>{post.LikeCount ?? 0} likes · {post.CommentCount ?? comments.length} replies · {post.RepostCount ?? 0} reposts · {post.DiamondCount ?? 0} diamonds</div>
        </article>

        <section style={styles.replies} aria-label="Replies">
          {comments.length === 0 ? <p>No replies available.</p> : comments.map((reply, index) => (
            <article key={reply.PostHashHex ?? index} style={styles.reply}>
              <div style={styles.creator}>{name(reply)}</div>
              <div style={styles.body}>{reply.Body || "Reply without text"}</div>
              <div style={styles.stats}>{reply.LikeCount ?? 0} likes · {reply.DiamondCount ?? 0} diamonds</div>
            </article>
          ))}
        </section>
      </div>
    </main>
  )
}
