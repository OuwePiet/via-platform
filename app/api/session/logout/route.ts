import { NextResponse } from "next/server"
import { SESSION_COOKIE } from "../../../session"

export async function POST(request: Request) {
  const result = NextResponse.redirect(new URL("/", request.url), 303)
  result.cookies.set({
    name: SESSION_COOKIE,
    value: "",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  })
  return result
}
