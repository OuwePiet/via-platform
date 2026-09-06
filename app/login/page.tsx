import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Login",
  description: "Connect a public DeSo profile to VIA for read-only personalization.",
}

type PageProps = { searchParams: Promise<{ error?: string }> }

const styles = {
  page: { minHeight: "100vh", background: "#050807", color: "#f4f7f5", padding: "48px 18px", fontFamily: "Arial, Helvetica, sans-serif" },
  card: { maxWidth: "560px", margin: "0 auto", background: "#0c120f", border: "1px solid #254233", borderRadius: "18px", padding: "24px" },
  heading: { margin: "0 0 10px", fontSize: "clamp(28px, 5vw, 40px)" },
  text: { color: "#a9b8af", lineHeight: 1.6 },
  form: { display: "grid", gap: "12px", marginTop: "22px" },
  input: { background: "#050807", color: "#f4f7f5", border: "1px solid #254233", borderRadius: "10px", padding: "12px", fontSize: "16px" },
  button: { background: "#5cff9d", color: "#050807", border: 0, borderRadius: "999px", padding: "11px 16px", fontWeight: 800, cursor: "pointer" },
  note: { color: "#91a298", fontSize: "13px", lineHeight: 1.5, marginTop: "16px" },
  error: { color: "#f1d89a", background: "#211a0c", border: "1px solid #6e5721", borderRadius: "10px", padding: "10px 12px" },
}

function errorText(error?: string) {
  if (error === "username") return "Enter a DeSo username."
  if (error === "profile") return "That DeSo profile could not be verified."
  if (error === "network") return "DeSo could not be reached right now."
  return ""
}

export default async function LoginPage({ searchParams }: PageProps) {
  const { error } = await searchParams
  const message = errorText(error)

  return (
    <main style={styles.page}>
      <section style={styles.card}>
        <h1 style={styles.heading}>Connect to VIA</h1>
        <p style={styles.text}>
          Enter your public DeSo username. VIA verifies the matching public profile and uses only its public key for read-only personalization such as Following.
        </p>
        {message ? <p style={styles.error}>{message}</p> : null}
        <form action="/api/session" method="post" style={styles.form}>
          <label htmlFor="username">DeSo username</label>
          <input id="username" name="username" placeholder="OuwePiet" autoComplete="username" required style={styles.input} />
          <button type="submit" style={styles.button}>Use public DeSo profile</button>
        </form>
        <p style={styles.note}>
          No seed phrase, private key or derived key is requested or stored in this step. This is not yet transaction authorization.
        </p>
      </section>
    </main>
  )
}
