import { cookies } from "next/headers"
import { fetchDeSo } from "../deso-api"
import { decodePublicSession, SESSION_COOKIE } from "../session"

export const dynamic = "force-dynamic"

type ProfileEntry = { Username?: string }
type NotificationMetadata = {
  TxnType?: string
  TransactorPublicKeyBase58Check?: string
  AffectedPublicKeys?: Array<{ PublicKeyBase58Check?: string; Metadata?: string }>
}
type Notification = {
  Metadata?: NotificationMetadata
  Index?: number
}
type NotificationsResponse = {
  Notifications?: Notification[]
  ProfilesByPublicKey?: Record<string, ProfileEntry>
}

const styles = {
  page: { maxWidth: "880px", margin: "0 auto", padding: "28px 20px 64px" },
  title: { color: "#f4f7f5", fontSize: "30px", margin: "0 0 8px" },
  intro: { color: "#a9b8af", lineHeight: 1.6, margin: "0 0 20px" },
  notice: { border: "1px solid #285f40", borderRadius: "14px", padding: "14px", color: "#b9c8bf", background: "#07100b" },
  list: { display: "grid", gap: "10px", marginTop: "18px" },
  card: { border: "1px solid #203b2d", borderRadius: "12px", padding: "13px 14px", background: "#07100b" },
  actor: { color: "#5cff9d", fontWeight: 800, textDecoration: "none" },
  type: { color: "#f4f7f5", marginLeft: "6px" },
  meta: { color: "#84958b", fontSize: "12px", marginTop: "6px" },
  action: { display: "inline-block", marginTop: "12px", color: "#050807", background: "#5cff9d", borderRadius: "999px", padding: "8px 12px", fontWeight: 800, textDecoration: "none" },
}

function labelForTxnType(type?: string) {
  const normalized = (type ?? "").toLowerCase()
  if (normalized.includes("like")) return "liked activity involving your profile"
  if (normalized.includes("follow")) return "followed or updated a follow involving your profile"
  if (normalized.includes("submit_post")) return "posted or replied in activity involving your profile"
  if (normalized.includes("basic_transfer")) return "sent a transfer, diamond, or related transfer involving your profile"
  if (normalized.includes("nft")) return "created NFT activity involving your profile"
  if (normalized.includes("creator_coin")) return "created creator-coin activity involving your profile"
  return type ? `created ${type} activity involving your profile` : "created activity involving your profile"
}

export default async function NotificationsPage() {
  const cookieStore = await cookies()
  const session = decodePublicSession(cookieStore.get(SESSION_COOKIE)?.value)

  if (!session) {
    return (
      <main style={styles.page}>
        <h1 style={styles.title}>Notifications</h1>
        <p style={styles.intro}>Connect a public DeSo profile to view its public on-chain notification activity in VIA.</p>
        <div style={styles.notice}>This is read-only. VIA does not sign transactions or mark notifications as read.</div>
        <a href="/login" style={styles.action}>Connect public profile</a>
      </main>
    )
  }

  let data: NotificationsResponse | null = null
  let error = ""

  try {
    const response = await fetchDeSo("get-notifications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        PublicKeyBase58Check: session.publicKeyBase58Check,
        NumToFetch: 40,
        FilteredOutNotificationCategories: {},
      }),
      cache: "no-store",
    })

    if (!response.ok) {
      error = "DeSo notifications could not be loaded right now."
    } else {
      data = await response.json()
    }
  } catch {
    error = "DeSo notifications could not be loaded right now."
  }

  const notifications = data?.Notifications ?? []
  const profiles = data?.ProfilesByPublicKey ?? {}

  return (
    <main style={styles.page}>
      <h1 style={styles.title}>Notifications</h1>
      <p style={styles.intro}>Public on-chain activity for @{session.username}. VIA only reads this data; it does not mark notifications as read or perform blockchain actions.</p>

      {error ? <div style={styles.notice}>{error}</div> : null}
      {!error && notifications.length === 0 ? <div style={styles.notice}>No notification activity was returned for this public profile.</div> : null}

      <div style={styles.list}>
        {notifications.map((notification, index) => {
          const metadata = notification.Metadata
          const actorKey = metadata?.TransactorPublicKeyBase58Check ?? ""
          const actorName = profiles[actorKey]?.Username
          const actorLabel = actorName ? `@${actorName}` : actorKey ? `${actorKey.slice(0, 8)}…` : "A DeSo account"

          return (
            <article key={`${notification.Index ?? "notification"}-${index}`} style={styles.card}>
              {actorName ? (
                <a href={`/profile/${encodeURIComponent(actorName)}`} style={styles.actor}>{actorLabel}</a>
              ) : (
                <span style={styles.actor}>{actorLabel}</span>
              )}
              <span style={styles.type}> {labelForTxnType(metadata?.TxnType)}</span>
              <div style={styles.meta}>{metadata?.TxnType ?? "On-chain activity"}</div>
            </article>
          )
        })}
      </div>
    </main>
  )
}
