"use client"

import { useMemo, useState } from "react"

type Tile = {
  id: number
  symbol: string
  label: string
}

const BASE_TILES = [
  { symbol: "V", label: "VIA" },
  { symbol: "◆", label: "NFT" },
  { symbol: "✦", label: "Diamond" },
  { symbol: "@", label: "Creator" },
  { symbol: "◎", label: "Discover" },
  { symbol: "↗", label: "Share" },
]

function shuffle<T>(items: T[]): T[] {
  const result = [...items]
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

function makeDeck(): Tile[] {
  return shuffle(
    BASE_TILES.flatMap((tile, pairIndex) => [0, 1].map((copy) => ({
      id: pairIndex * 2 + copy,
      symbol: tile.symbol,
      label: tile.label,
    }))),
  )
}

const styles = {
  page: { minHeight: "100vh", background: "#050807", color: "#f4f7f5", padding: "32px 18px 64px", fontFamily: "Arial, Helvetica, sans-serif" },
  container: { maxWidth: "760px", margin: "0 auto" },
  eyebrow: { color: "#5cff9d", fontSize: "12px", fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase" as const },
  heading: { fontSize: "clamp(30px, 6vw, 52px)", margin: "8px 0" },
  intro: { color: "#a9b8af", lineHeight: 1.6, margin: "0 0 8px" },
  note: { color: "#91a298", fontSize: "13px", lineHeight: 1.5, margin: "0 0 24px" },
  bar: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", flexWrap: "wrap" as const, marginBottom: "16px" },
  stats: { color: "#d5e2da", fontSize: "14px" },
  button: { background: "#0c120f", color: "#f4f7f5", border: "1px solid #315740", borderRadius: "999px", padding: "9px 14px", cursor: "pointer" },
  grid: { display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: "10px" },
  tile: { minHeight: "104px", borderRadius: "16px", border: "1px solid #254233", background: "#0c120f", color: "#f4f7f5", cursor: "pointer", padding: "10px", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" as const },
  symbol: { fontSize: "32px", fontWeight: 800, lineHeight: 1 },
  label: { color: "#91a298", fontSize: "11px", marginTop: "8px" },
  hidden: { fontSize: "22px", color: "#5cff9d" },
  done: { marginTop: "20px", border: "1px solid #315740", background: "#0c120f", borderRadius: "14px", padding: "16px", color: "#d5e2da", lineHeight: 1.5 },
}

export default function PlayPage() {
  const [seed, setSeed] = useState(0)
  const deck = useMemo(() => makeDeck(), [seed])
  const [openIds, setOpenIds] = useState<number[]>([])
  const [matchedIds, setMatchedIds] = useState<number[]>([])
  const [moves, setMoves] = useState(0)

  const finished = matchedIds.length === deck.length

  function reset() {
    setOpenIds([])
    setMatchedIds([])
    setMoves(0)
    setSeed((value) => value + 1)
  }

  function choose(tile: Tile) {
    if (openIds.length >= 2 || openIds.includes(tile.id) || matchedIds.includes(tile.id)) return

    const nextOpen = [...openIds, tile.id]
    setOpenIds(nextOpen)

    if (nextOpen.length !== 2) return

    setMoves((value) => value + 1)
    const first = deck.find((item) => item.id === nextOpen[0])
    const second = deck.find((item) => item.id === nextOpen[1])

    if (first && second && first.label === second.label) {
      window.setTimeout(() => {
        setMatchedIds((current) => [...current, first.id, second.id])
        setOpenIds([])
      }, 450)
    } else {
      window.setTimeout(() => setOpenIds([]), 700)
    }
  }

  return (
    <main style={styles.page}>
      <div style={styles.container}>
        <div style={styles.eyebrow}>Optional extra</div>
        <h1 style={styles.heading}>VIA Match</h1>
        <p style={styles.intro}>A small memory game you can play on your own whenever you feel like it.</p>
        <p style={styles.note}>No wagers, no wallet, no prizes, no blockchain transaction. Playing is completely optional.</p>

        <div style={styles.bar}>
          <div style={styles.stats}>Moves: {moves} · Pairs: {matchedIds.length / 2}/{BASE_TILES.length}</div>
          <button type="button" style={styles.button} onClick={reset}>New game</button>
        </div>

        <section style={styles.grid} aria-label="VIA Match memory game">
          {deck.map((tile) => {
            const visible = openIds.includes(tile.id) || matchedIds.includes(tile.id)
            return (
              <button
                key={tile.id}
                type="button"
                style={styles.tile}
                onClick={() => choose(tile)}
                aria-label={visible ? tile.label : "Hidden tile"}
              >
                {visible ? (
                  <>
                    <span style={styles.symbol}>{tile.symbol}</span>
                    <span style={styles.label}>{tile.label}</span>
                  </>
                ) : (
                  <span style={styles.hidden}>VIA</span>
                )}
              </button>
            )
          })}
        </section>

        {finished ? (
          <div style={styles.done} role="status">Completed in {moves} moves. Nice one. Start a new game whenever you like.</div>
        ) : null}
      </div>
    </main>
  )
}
