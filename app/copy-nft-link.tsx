"use client"

import { useState, type CSSProperties } from "react"

export default function CopyNFTLink({
  style,
}: {
  style?: CSSProperties
}) {
  const [copied, setCopied] = useState(false)

  const currentNFTUrl = () => `${window.location.origin}${window.location.pathname}`

  const copyLink = async () => {
    const nftUrl = currentNFTUrl()

    try {
      await navigator.clipboard.writeText(nftUrl)
    } catch {
      const temporaryInput = document.createElement("textarea")
      temporaryInput.value = nftUrl
      temporaryInput.style.position = "fixed"
      temporaryInput.style.opacity = "0"
      document.body.appendChild(temporaryInput)
      temporaryInput.select()
      document.execCommand("copy")
      temporaryInput.remove()
    }

    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }

  const share = (target: "x" | "linkedin") => {
    const nftUrl = encodeURIComponent(currentNFTUrl())
    const shareUrl = target === "x"
      ? `https://x.com/intent/post?url=${nftUrl}&text=${encodeURIComponent("View this DeSo NFT on VIA")}`
      : `https://www.linkedin.com/sharing/share-offsite/?url=${nftUrl}`

    window.open(shareUrl, "_blank", "noopener,noreferrer")
  }

  const groupStyle: CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
  }

  return (
    <div style={groupStyle} aria-label="Share NFT">
      <button type="button" style={style} onClick={copyLink}>
        {copied ? "NFT link copied" : "Copy NFT link"}
      </button>
      <button type="button" style={style} onClick={() => share("x")}>
        Share on X
      </button>
      <button type="button" style={style} onClick={() => share("linkedin")}>
        Share on LinkedIn
      </button>
    </div>
  )
}
