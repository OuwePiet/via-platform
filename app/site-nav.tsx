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
  login: {
    color: "#050807",
    background: "#5cff9d",
    borderRadius: "999px",
    padding: "7px 11px",
    fontSize: "13px",
    fontWeight: 800,
    textDecoration: "none",
  },
  session: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
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
        <a href="/search" style={styles.link}>Creators</a>
        {session ? (
          <div style={styles.session}>
            <a href={`/profile/${encodeURIComponent(session.username)}`} style={styles.user}>@{session.username}</a>
            <form action="/api/session/logout" method="post">
              <button type="submit" style={styles.logout}>Logout</button>
            </form>
          </div>
        ) : (
          <a href="/login" style={styles.login}>Connect</a>
        )}
      </div>
    </nav>
  )
}
