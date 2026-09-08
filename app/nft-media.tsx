"use client"

import Image from "next/image"
import { useState, type CSSProperties, type MouseEvent } from "react"

type NFTMediaProps = {
  imageUrl?: string
  videoUrl?: string
  alt: string
  imageStyle: CSSProperties
  placeholderStyle: CSSProperties
}

type MediaKind = "image" | "video" | "audio"

const VIDEO_EXTENSIONS = [".mp4", ".webm", ".mov", ".m4v"]
const AUDIO_EXTENSIONS = [".mp3", ".wav", ".m4a", ".aac", ".flac", ".oga"]

const mediaWrapperStyle: CSSProperties = {
  position: "relative",
  width: "100%",
  height: "100%",
  overflow: "hidden",
  WebkitUserSelect: "none",
  userSelect: "none",
  WebkitTouchCallout: "none",
}

const mediaBadgeStyle: CSSProperties = {
  position: "absolute",
  top: "12px",
  left: "12px",
  zIndex: 3,
  color: "var(--via-accent)",
  background: "rgba(4, 10, 9, 0.88)",
  border: "1px solid rgba(74, 222, 128, 0.34)",
  borderRadius: "999px",
  fontSize: "11px",
  fontWeight: 700,
  letterSpacing: "0.06em",
  padding: "5px 9px",
  pointerEvents: "none",
}

const protectionLayerStyle: CSSProperties = {
  position: "absolute",
  inset: 0,
  zIndex: 2,
  pointerEvents: "none",
  background:
    "linear-gradient(135deg, rgba(248,250,252,0.018), transparent 35%, rgba(74,222,128,0.012) 70%, transparent)",
}

const viaMarkStyle: CSSProperties = {
  position: "absolute",
  right: "clamp(8px, 2.5%, 16px)",
  bottom: "clamp(8px, 2.5%, 16px)",
  zIndex: 4,
  display: "flex",
  alignItems: "center",
  gap: "5px",
  padding: "5px 7px",
  borderRadius: "999px",
  color: "rgba(248,250,252,0.9)",
  background: "rgba(4,10,9,0.46)",
  border: "1px solid rgba(248,250,252,0.38)",
  boxShadow: "0 1px 8px rgba(0,0,0,0.24)",
  fontSize: "9px",
  fontWeight: 800,
  letterSpacing: "0.12em",
  lineHeight: 1,
  pointerEvents: "none",
  backdropFilter: "blur(2px)",
}

const leafStyle: CSSProperties = {
  width: "10px",
  height: "14px",
  display: "block",
  borderRadius: "100% 0 100% 0",
  transform: "rotate(-36deg)",
  background:
    "linear-gradient(135deg, #ffffff 0%, #d7dde0 38%, #9aa6aa 68%, #f8fafc 100%)",
  boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.35)",
}

function MediaBadge({ label }: { label: string }) {
  return <span style={mediaBadgeStyle}>{label}</span>
}

function ViaProtectionMark() {
  return (
    <span style={viaMarkStyle} aria-hidden="true">
      <span style={leafStyle} />
      VIA
    </span>
  )
}

function ProtectedPresentation() {
  return (
    <>
      <span style={protectionLayerStyle} aria-hidden="true" />
      <ViaProtectionMark />
    </>
  )
}

function preventContextMenu(event: MouseEvent<HTMLElement>) {
  event.preventDefault()
}

function filePath(url: string) {
  return url.split(/[?#]/, 1)[0].toLowerCase()
}

function mediaKind(url: string, suppliedAsVideo: boolean): MediaKind {
  const path = filePath(url)

  if (AUDIO_EXTENSIONS.some((extension) => path.endsWith(extension))) {
    return "audio"
  }

  if (
    suppliedAsVideo ||
    VIDEO_EXTENSIONS.some((extension) => path.endsWith(extension))
  ) {
    return "video"
  }

  return "image"
}

function mediaCandidates(url?: string) {
  if (!url) return []

  const ipfsPrefix = "ipfs://"
  const ipfsMarker = "/ipfs/"
  const ipfsPath = url.startsWith(ipfsPrefix)
    ? url.slice(ipfsPrefix.length)
    : url.includes(ipfsMarker)
      ? url.slice(url.indexOf(ipfsMarker) + ipfsMarker.length)
      : null

  if (!ipfsPath) return [url]

  return Array.from(
    new Set([
      url,
      `https://ipfs.io/ipfs/${ipfsPath}`,
      `https://dweb.link/ipfs/${ipfsPath}`,
    ])
  )
}

function passthroughLoader({ src }: { src: string }) {
  return src
}

export default function NFTMedia({
  imageUrl,
  videoUrl,
  alt,
  imageStyle,
  placeholderStyle,
}: NFTMediaProps) {
  const sourceUrl = videoUrl ?? imageUrl
  const kind = sourceUrl ? mediaKind(sourceUrl, Boolean(videoUrl)) : null
  const candidates = mediaCandidates(sourceUrl)
  const [candidateIndex, setCandidateIndex] = useState(0)

  if (!kind || candidates.length === 0) {
    return (
      <div style={{ ...placeholderStyle, position: "relative" }}>
        <MediaBadge label="Media unavailable" />
        <span>No media available</span>
      </div>
    )
  }

  if (candidateIndex >= candidates.length) {
    return (
      <div style={{ ...placeholderStyle, position: "relative" }}>
        <MediaBadge label="Media unavailable" />
        <span>Media unavailable</span>
      </div>
    )
  }

  const currentUrl = candidates[candidateIndex]
  const tryNextCandidate = () =>
    setCandidateIndex((current) => current + 1)

  if (kind === "video") {
    return (
      <div style={mediaWrapperStyle} onContextMenu={preventContextMenu}>
        <MediaBadge label="Video" />
        <video
          key={currentUrl}
          src={currentUrl}
          aria-label={alt}
          controls
          controlsList="nodownload"
          disablePictureInPicture
          playsInline
          preload="metadata"
          draggable={false}
          style={imageStyle}
          onError={tryNextCandidate}
        />
        <ProtectedPresentation />
      </div>
    )
  }

  if (kind === "audio") {
    return (
      <div style={{ ...placeholderStyle, position: "relative" }}>
        <MediaBadge label="Audio" />
        <audio
          key={currentUrl}
          src={currentUrl}
          aria-label={alt}
          controls
          controlsList="nodownload"
          preload="metadata"
          style={{ width: "calc(100% - 40px)" }}
          onError={tryNextCandidate}
        />
      </div>
    )
  }

  return (
    <div style={mediaWrapperStyle} onContextMenu={preventContextMenu}>
      <MediaBadge label="Image" />
      <Image
        key={currentUrl}
        src={currentUrl}
        alt={alt}
        width={600}
        height={600}
        sizes="(max-width: 600px) 100vw, 600px"
        loader={passthroughLoader}
        unoptimized
        draggable={false}
        style={{ ...imageStyle, WebkitUserDrag: "none", userSelect: "none" } as CSSProperties}
        onError={tryNextCandidate}
      />
      <ProtectedPresentation />
    </div>
  )
}
