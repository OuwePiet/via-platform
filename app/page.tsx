import NFTGrid from "./nft-grid"

export const dynamic = "force-dynamic"

type HomeProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

const styles = {
  platform: {
    maxWidth: "1180px",
    margin: "0 auto",
    padding: "18px 18px 0",
    fontFamily: "Arial, Helvetica, sans-serif",
  },
  eyebrow: {
    color: "#5cff9d",
    fontSize: "12px",
    fontWeight: 800,
    letterSpacing: "0.16em",
    textTransform: "uppercase" as const,
  },
  title: {
    color: "#f4f7f5",
    fontSize: "clamp(28px, 5vw, 48px)",
    lineHeight: 1.05,
    margin: "8px 0 10px",
  },
  intro: {
    color: "#a9b8af",
    maxWidth: "760px",
    lineHeight: 1.6,
    margin: 0,
  },
  modules: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
    gap: "10px",
    marginTop: "18px",
  },
  module: {
    display: "block",
    color: "#dce8e0",
    background: "#0c120f",
    border: "1px solid #254233",
    borderRadius: "14px",
    padding: "14px",
    textDecoration: "none",
  },
  moduleTitle: { color: "#5cff9d", fontWeight: 800, marginBottom: "5px" },
  moduleText: { color: "#91a298", fontSize: "13px", lineHeight: 1.45 },
}

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams
  const account = typeof params.account === "string" ? params.account : undefined

  return (
    <>
      <section style={styles.platform} aria-label="VIA platform modules">
        <div style={styles.eyebrow}>DeSo social + NFT</div>
        <h1 style={styles.title}>One creator. One social graph. One on-chain collection.</h1>
        <p style={styles.intro}>
          VIA connects public DeSo creators, posts, discovery and NFT collections in one fast interface. DeSo remains the source of truth; VIA makes it easier to explore.
        </p>
        <div style={styles.modules}>
          <a href="/feed" style={styles.module}>
            <div style={styles.moduleTitle}>Social</div>
            <div style={styles.moduleText}>Hot, recent, following and media feeds with public DeSo posts and replies.</div>
          </a>
          <a href="/#account-lookup-heading" style={styles.module}>
            <div style={styles.moduleTitle}>Marketplace</div>
            <div style={styles.moduleText}>Browse public DeSo NFT collections, sale status, copies and media from one place.</div>
          </a>
          <a href="/discover" style={styles.module}>
            <div style={styles.moduleTitle}>Discover</div>
            <div style={styles.moduleText}>Move from content to creators, profiles and their on-chain collections.</div>
          </a>
          <a href="/search" style={styles.module}>
            <div style={styles.moduleTitle}>Search creators</div>
            <div style={styles.moduleText}>Find a DeSo creator and continue directly to social activity or NFTs.</div>
          </a>
          <a href="/world-time" style={styles.module}>
            <div style={styles.moduleTitle}>World Time</div>
            <div style={styles.moduleText}>Check major creator regions worldwide without leaving VIA.</div>
          </a>
        </div>
      </section>
      <NFTGrid initialAccount={account} />
    </>
  )
}
