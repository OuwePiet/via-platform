import { cookies } from "next/headers"
import { decodePublicSession, SESSION_COOKIE } from "./session"

const styles = {
  nav: {
    position: "sticky" as const,
    top: 0,
    zIndex: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "12px",
    padding: "10px 12px",
    background: "rgba(5, 8, 7, 0.94)",
    borderBottom: "1px solid #1d3529",
    backdropFilter: "blur(10px)",
    overflow: "hidden",
  },
  brand: {
    color: "#5cff9d",
    fontSize: "13px",
    fontWeight: 800,
    letterSpacing: "0.18em",
    textDecoration: "none",
    flexShrink: 0,
  },
  links: {
    display: "flex",
    gap: "14px",
    alignItems: "center",
    flexWrap: "nowrap" as const,
    justifyContent: "flex-start",
    minWidth: 0,
    overflowX: "auto" as const,
    overscrollBehaviorX: "contain" as const,
    scrollbarWidth: "none" as const,
    whiteSpace: "nowrap" as const,
    WebkitOverflowScrolling: "touch" as const,
  },
  link: {
    color: "#d9e4dd",
    fontSize: "14px",
    textDecoration: "none",
    flexShrink: 0,
  },
  login: {
    color: "#050807",
    background: "#5cff9d",
    borderRadius: "999px",
    padding: "7px 11px",
    fontSize: "13px",
    fontWeight: 800,
    textDecoration: "none",
    flexShrink: 0,
  },
  session: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    flexShrink: 0,
  },
  user: {
    color: "#5cff9d",
    fontSize: "13px",
    textDecoration: "none",
  },
  logout: {
    color: "#a9b8af",
    background: "transparent",
    border: "1px solid #254233",
    borderRadius: "999px",
    cursor: "pointer",
    fontSize: "12px",
    padding: "6px 9px",
  },
}

export default async function SiteNav() {
  const cookieStore = await cookies()
  const session = decodePublicSession(cookieStore.get(SESSION_COOKIE)?.value)

  return (
    <nav style={styles.nav} aria-label="VIA main navigation">
      <a href="/" style={styles.brand} aria-label="VIA home">VIA</a>
      <div style={styles.links}>
        <a href="/" style={styles.link}>NFTs</a>
        <a href="/feed" style={styles.link}>Feed</a>
        <a href="/discover" style={styles.link}>Discover</a>
        <a href="/search" style={styles.link}>Creators</a>
        <a href="/world-time" style={styles.link}>World Time</a>
        {session ? <a href="/notifications" style={styles.link}>Notifications</a> : null}
        {session ? (
          <div style={styles.session}>
            <a href={`/profile/${encodeURIComponent(session.username)}`} style={styles.user}>@{session.username}</a>
            <form action="/api/session/logout" method="post">
              <button type="submit" style={styles.logout}>Disconnect</button>
            </form>
          </div>
        ) : (
          <a href="/login" style={styles.login}>Connect</a>
        )}
      </div>
    </nav>
  )
}
