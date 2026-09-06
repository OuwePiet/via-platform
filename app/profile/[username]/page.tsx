import type { Metadata } from "next"
import { fetchDeSo } from "../../deso-api"

export const dynamic = "force-dynamic"

type PageProps = { params: Promise<{ username: string }> }

type Profile = {
  Username?: string
  Description?: string
  PublicKeyBase58Check?: string
  CoinEntry?: { CoinPriceDeSoNanos?: number }
}

type Post = {
  PostHashHex?: string
  Body?: string
  LikeCount?: number
  CommentCount?: number
  RepostCount?: number
  DiamondCount?: number
  ImageURLs?: string[]
}

async function loadProfile(username: string) {
  try {
    const [profileResponse, postsResponse] = await Promise.all([
      fetchDeSo("get-single-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Username: username }),
        cache: "no-store",
      }),
      fetchDeSo("get-posts-for-public-key", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Username: username,
          ReaderPublicKeyBase58Check: "",
          NumToFetch: 20,
          MediaRequired: false,
        }),
        cache: "no-store",
      }),
    ])

    if (!profileResponse.ok) return { profile: null, posts: [] as Post[] }

    const profileData = await profileResponse.json()
    const postsData = postsResponse.ok ? await postsResponse.json() : {}

    return {
      profile: (profileData.Profile ?? profileData.ProfileEntryResponse ?? null) as Profile | null,
      posts: (postsData.Posts ?? []) as Post[],
    }
  } catch {
    return { profile: null, posts: [] as Post[] }
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { username } = await params
  return { title: `@${username}`, description: `DeSo creator profile for @${username} on VIA.` }
}

const styles = {
  page: { minHeight: "100vh", background: "#050807", color: "#f4f7f5", padding: "32px 18px 64px", fontFamily: "Arial, Helvetica, sans-serif" },
  container: { maxWidth: "820px", margin: "0 auto" },
  link: { color: "#5cff9d", textDecoration: "none" },
  heading: { fontSize: "clamp(28px, 5vw, 44px)", marginBottom: "8px" },
  description: { color: "#a9b8af", lineHeight: 1.6 },
  actions: { display: "flex", gap: "12px", flexWrap: "wrap" as const, margin: "18px 0 28px" },
  action: { color: "#dce8e0", border: "1px solid #254233", borderRadius: "999px", padding: "8px 12px", textDecoration: "none" },
  list: { display: "grid", gap: "12px" },
  card: { background: "#0c120f", border: "1px solid #254233", borderRadius: "14px", padding: "16px", textDecoration: "none", color: "inherit" },
  stats: { color: "#91a298", fontSize: "13px", marginTop: "10px" },
}

export default async function ProfilePage({ params }: PageProps) {
  const { username } = await params
  const decoded = decodeURIComponent(username).replace(/^@/, "")
  const { profile, posts } = await loadProfile(decoded)

  if (!profile) {
    return <main style={styles.page}><div style={styles.container}><a href="/feed" style={styles.link}>← Back to feed</a><p>Profile unavailable.</p></div></main>
  }

  return (
    <main style={styles.page}>
      <div style={styles.container}>
        <a href="/feed" style={styles.link}>← Back to feed</a>
        <h1 style={styles.heading}>@{profile.Username ?? decoded}</h1>
        <p style={styles.description}>{profile.Description || "DeSo creator on VIA."}</p>
        <div style={styles.actions}>
          <a href={`/?account=${encodeURIComponent(profile.Username ?? decoded)}`} style={styles.action}>NFT collection</a>
          <a href="/feed" style={styles.action}>DeSo feed</a>
        </div>
        <section style={styles.list} aria-label="Creator posts">
          {posts.length === 0 ? <p>No public posts available.</p> : posts.map((post, index) => (
            <a key={post.PostHashHex ?? index} href={post.PostHashHex ? `/post/${post.PostHashHex}` : "/feed"} style={styles.card}>
              <div>{post.Body || "Post without text"}</div>
              <div style={styles.stats}>{post.LikeCount ?? 0} likes · {post.CommentCount ?? 0} replies · {post.RepostCount ?? 0} reposts · {post.DiamondCount ?? 0} diamonds</div>
            </a>
          ))}
        </section>
      </div>
    </main>
  )
}
