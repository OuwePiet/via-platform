import { NextResponse } from "next/server"
import { fetchDeSo } from "../../deso-api"
import { encodePublicSession, SESSION_COOKIE } from "../../session"

export async function POST(request: Request) {
  const formData = await request.formData()
  const requestedUsername = String(formData.get("username") ?? "").trim().replace(/^@/, "")

  if (!requestedUsername) {
    return NextResponse.redirect(new URL("/login?error=username", request.url), 303)
  }

  try {
    const response = await fetchDeSo("get-single-profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ Username: requestedUsername }),
      cache: "no-store",
    })

    if (!response.ok) {
      return NextResponse.redirect(new URL("/login?error=profile", request.url), 303)
    }

    const data = await response.json()
    const profile = data.Profile ?? data.ProfileEntryResponse
    const username = profile?.Username
    const publicKeyBase58Check = profile?.PublicKeyBase58Check

    if (!username || !publicKeyBase58Check) {
      return NextResponse.redirect(new URL("/login?error=profile", request.url), 303)
    }

    const result = NextResponse.redirect(new URL("/feed?view=following", request.url), 303)
    result.cookies.set({
      name: SESSION_COOKIE,
      value: encodePublicSession({ username, publicKeyBase58Check }),
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    })
    return result
  } catch {
    return NextResponse.redirect(new URL("/login?error=network", request.url), 303)
  }
}

export async function DELETE(request: Request) {
  const result = NextResponse.redirect(new URL("/", request.url), 303)
  result.cookies.set({ name: SESSION_COOKIE, value: "", path: "/", maxAge: 0 })
  return result
}
