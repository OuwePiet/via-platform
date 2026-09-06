const styles = {
  nav: {
    position: "sticky" as const,
    top: 0,
    zIndex: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "18px",
    padding: "12px 20px",
    background: "rgba(5, 8, 7, 0.94)",
    borderBottom: "1px solid #1d3529",
    backdropFilter: "blur(10px)",
  },
  brand: {
    color: "#5cff9d",
    fontSize: "13px",
    fontWeight: 800,
    letterSpacing: "0.18em",
    textDecoration: "none",
  },
  links: {
    display: "flex",
    gap: "16px",
    alignItems: "center",
    flexWrap: "wrap" as const,
    justifyContent: "flex-end",
  },
  link: {
    color: "#d9e4dd",
    fontSize: "14px",
    textDecoration: "none",
  },
}

export default function SiteNav() {
  return (
    <nav style={styles.nav} aria-label="VIA main navigation">
      <a href="/" style={styles.brand} aria-label="VIA home">VIA</a>
      <div style={styles.links}>
        <a href="/" style={styles.link}>NFTs</a>
        <a href="/feed" style={styles.link}>Feed</a>
        <a href="/search" style={styles.link}>Creators</a>
      </div>
    </nav>
  )
}
