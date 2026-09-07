import type { Metadata } from "next"
import { fetchDeSo } from "../deso-api"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Discover creators",
  description: "Discover active public DeSo creators on VIA.",
}

type FeedPost = {
  PostHashHex?: string
  LikeCount?: number
  CommentCount?: number
  RepostCount?: number
  DiamondCount?: number
  ProfileEntryResponse?: {
    Username?: string
    PublicKeyBase58Check?: string
    Description?: string
  }
}

type Creator = {
  username: string
  publicKey?: string
  description?: string
  posts: number
  engagement: number
}

async function discoverCreators(): Promise<Creator[]> {
  try {
    const response = await fetchDeSo("get-posts-stateless", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ReaderPublicKeyBase58Check: "",
        NumToFetch: 80,
        GetPostsForFollowFeed: false,
        GetPostsForGlobalWhitelist: false,
        GetPostsByDESO: false,
        MediaRequired: false,
      }),
      cache: "no-store",
    })

    if (!response.ok) return []
    const data = await response.json()
    const posts: FeedPost[] = data.PostsFound ?? data.Posts ?? []
    const creators = new Map<string, Creator>()

    for (const post of posts) {
      const profile = post.ProfileEntryResponse
      const username = profile?.Username?.trim()
      if (!username) continue

      const key = username.toLocaleLowerCase()
      const score =
        (post.DiamondCount ?? 0) * 4 +
        (post.RepostCount ?? 0) * 3 +
        (post.CommentCount ?? 0) * 2 +
        (post.LikeCount ?? 0)
      const existing = creators.get(key)

      if (existing) {
        existing.posts += 1
        existing.engagement += score
      } else {
        creators.set(key, {
          username,
          publicKey: profile?.PublicKeyBase58Check,
          description: profile?.Description,
          posts: 1,
          engagement: score,
        })
      }
    }

    return [...creators.values()]
      .sort((a, b) => b.engagement - a.engagement || b.posts - a.posts || a.username.localeCompare(b.username))
      .slice(0, 24)
  } catch {
    return []
  }
}

const styles = {
  page: { minHeight: "100vh", background: "#050807", color: "#f4f7f5", padding: "32px 18px 64px", fontFamily: "Arial, Helvetica, sans-serif" },
  container: { maxWidth: "920px", margin: "0 auto" },
  heading: { fontSize: "clamp(28px, 5vw, 44px)", margin: "0 0 8px" },
  intro: { color: "#a9b8af", lineHeight: 1.6, margin: "0 0 10px" },
  note: { color: "#91a298", fontSize: "13px", lineHeight: 1.5, margin: "0 0 24px" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "12px" },
  card: { background: "#0c120f", border: "1px solid #254233", borderRadius: "14px", padding: "16px" },
  name: { color: "#5cff9d", fontWeight: 800, textDecoration: "none" },
  desc: { color: "#d5e2da", lineHeight: 1.5, margin: "8px 0 12px" },
  stats: { color: "#91a298", fontSize: "12px", lineHeight: 1.5 },
  actions: { display: "flex", gap: "8px", flexWrap: "wrap" as const, marginTop: "12px" },
  action: { color: "#dce8e0", border: "1px solid #254233", borderRadius: "999px", padding: "7px 11px", textDecoration: "none", fontSize: "13px" },
  empty: { color: "#a9b8af", padding: "24px 0" },
}

export default async function DiscoverPage() {
  const creators = await discoverCreators()

  return (
    <main style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.heading}>Discover creators</h1>
        <p style={styles.intro}>Find active DeSo creators from VIA's current read-only public feed sample.</p>
        <p style={styles.note}>Ranking is transparent and local to the loaded sample: visible diamonds, reposts, replies and likes contribute to the activity score. It is not a canonical DeSo ranking.</p>

        {creators.length === 0 ? (
          <p style={styles.empty}>Creator discovery is temporarily unavailable.</p>
        ) : (
          <section style={styles.grid} aria-label="Active DeSo creators">
            {creators.map((creator) => (
              <article key={creator.publicKey ?? creator.username} style={styles.card}>
                <a href={`/profile/${encodeURIComponent(creator.username)}`} style={styles.name}>@{creator.username}</a>
                <p style={styles.desc}>{creator.description || "Active DeSo creator on VIA."}</p>
                <div style={styles.stats}>{creator.posts} recent {creator.posts === 1 ? "post" : "posts"} in sample · activity score {creator.engagement}</div>
                <div style={styles.actions}>
                  <a href={`/profile/${encodeURIComponent(creator.username)}`} style={styles.action}>Profile</a>
                  <a href={`/?account=${encodeURIComponent(creator.username)}`} style={styles.action}>NFTs</a>
                </div>
              </article>
            ))}
          </section>
        )}
      </div>
    </main>
  )
}
