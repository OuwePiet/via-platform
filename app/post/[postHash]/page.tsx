import { notFound } from "next/navigation"
import PostView from "../../post-view"

export const dynamic = "force-dynamic"

type PostPageProps = {
  params: Promise<{ postHash: string }>
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export default async function PostPage({ params, searchParams }: PostPageProps) {
  const { postHash } = await params
  const context = await searchParams

  if (!/^[0-9a-fA-F]{64}$/.test(postHash)) notFound()

  const returnParams = new URLSearchParams()
  for (const key of ["account", "accountKey", "view"]) {
    const value = context[key]
    if (typeof value === "string" && value) returnParams.set(key, value)
  }

  const backHref = returnParams.has("account")
    ? `/?${returnParams.toString()}#account-lookup-heading`
    : "/"

  return <PostView postHash={postHash.toLowerCase()} backHref={backHref} />
}
