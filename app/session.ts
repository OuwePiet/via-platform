export type ViaPublicSession = {
  username: string
  publicKeyBase58Check: string
}

const SESSION_COOKIE = "via_public_session"

export function encodePublicSession(session: ViaPublicSession) {
  const payload = JSON.stringify({
    username: session.username.trim().replace(/^@/, ""),
    publicKeyBase58Check: session.publicKeyBase58Check.trim(),
  })

  return Buffer.from(payload, "utf8").toString("base64url")
}

export function decodePublicSession(value?: string | null): ViaPublicSession | null {
  if (!value) return null

  try {
    const parsed = JSON.parse(Buffer.from(value, "base64url").toString("utf8")) as Partial<ViaPublicSession>
    const username = parsed.username?.trim().replace(/^@/, "")
    const publicKeyBase58Check = parsed.publicKeyBase58Check?.trim()

    if (!username || !publicKeyBase58Check) return null
    if (!publicKeyBase58Check.startsWith("BC1")) return null

    return { username, publicKeyBase58Check }
  } catch {
    return null
  }
}

export { SESSION_COOKIE }
