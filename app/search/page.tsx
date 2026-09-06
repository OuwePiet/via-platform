import type { Metadata } from "next"
import { fetchDeSo } from "../deso-api"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Creator search",
  description: "Search DeSo creators on VIA.",
}

type SearchParams = Promise<{ q?: string | string[] }>

type Profile = {
  Username?: string
  PublicKeyBase58Check?: string
  Description?: string
  ProfilePic?: string
}

async function searchProfiles(query: string): Promise<Profile[]> {
  if (!query) return []

  try {
    const response = await fetchDeSo("get-profiles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        UsernamePrefix: query,
        NumToFetch: 25,
        ReaderPublicKeyBase58Check: "",
      }),
      cache: "no-store",
    })

    if (!response.ok) return []
    const data = await response.json()
    return (data.ProfilesFound ?? data.Profiles ?? []).filter(
      (profile: Profile) => profile.Username && profile.PublicKeyBase58Check
    )
  } catch {
    return []
  }
}

function shortKey(key?: string) {
  if (!key) return ""
  return `${key.slice(0, 10)}...${key.slice(-8)}`
}

const styles = {
  page: { minHeight: "100vh", background: "#050807", color: "#f4f7f5", padding: "32px 18px 64px", fontFamily: "Arial, Helvetica, sans-serif" },
  container: { maxWidth: "820px", margin: "0 auto" },
  heading: { fontSize: "clamp(28px, 5vw, 44px)", margin: "0 0 8px" },
  intro: { color: "#a9b8af", lineHeight: 1.6, margin: "0 0 22px" },
  form: { display: "flex", gap: "10px", flexWrap: "wrap" as const, marginBottom: "26px" },
  input: { flex: "1 1 260px", color: "#f4f7f5", background: "#0a100d", border: "1px solid #254233", borderRadius: "12px", fontSize: "15px", padding: "11px 13px" },
  button: { color: "#050807", background: "#5cff9d", border: "1px solid #5cff9d", borderRadius: "999px", cursor: "pointer", fontSize: "14px", fontWeight: 800, padding: "10px 16px" },
  list: { display: "grid", gap: "12px" },
  card: { background: "#0c120f", border: "1px solid #254233", borderRadius: "14px", padding: "16px" },
  name: { color: "#5cff9d", fontWeight: 800, textDecoration: "none" },
  desc: { color: "#d5e2da", lineHeight: 1.5, margin: "8px 0" },
  key: { color: "#91a298", fontSize: "12px" },
  actions: { display: "flex", gap: "10px", flexWrap: "wrap" as const, marginTop: "12px" },
  action: { color: "#dce8e0", border: "1px solid #254233", borderRadius: "999px", padding: "7px 11px", textDecoration: "none", fontSize: "13px" },
  empty: { color: "#a9b8af" },
}

export default async function SearchPage({ searchParams }: { searchParams: SearchParams }) {
  const raw = (await searchParams).q
  const query = (Array.isArray(raw) ? raw[0] : raw ?? "").trim().replace(/^@/, "")
  const profiles = await searchProfiles(query)

  return (
    <main style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.heading}>Find creators</h1>
        <p style={styles.intro}>Search public DeSo creators by username and open their VIA profile or NFT collection.</p>

        <form action="/search" method="get" style={styles.form} role="search">
          <input name="q" defaultValue={query} placeholder="Creator username, e.g. OuwePiet" aria-label="DeSo creator username" style={styles.input} />
          <button type="submit" style={styles.button}>Search</button>
        </form>

        {!query ? (
          <p style={styles.empty}>Enter a creator name to start searching.</p>
        ) : profiles.length === 0 ? (
          <p style={styles.empty}>No matching DeSo creators found.</p>
        ) : (
          <section style={styles.list} aria-label="Creator search results">
            {profiles.map((profile) => {
              const name = profile.Username ?? "DeSo user"
              return (
                <article key={profile.PublicKeyBase58Check ?? name} style={styles.card}>
                  <a href={`/profile/${encodeURIComponent(name)}`} style={styles.name}>@{name}</a>
                  <p style={styles.desc}>{profile.Description || "DeSo creator on VIA."}</p>
                  <div style={styles.key}>{shortKey(profile.PublicKeyBase58Check)}</div>
                  <div style={styles.actions}>
                    <a href={`/profile/${encodeURIComponent(name)}`} style={styles.action}>Creator profile</a>
                    <a href={`/?account=${encodeURIComponent(name)}`} style={styles.action}>NFT collection</a>
                  </div>
                </article>
              )
            })}
          </section>
        )}
      </div>
    </main>
  )
}
