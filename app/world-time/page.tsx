"use client"

import { useEffect, useState } from "react"

const CITIES = [
  ["Amsterdam", "Europe/Amsterdam"],
  ["New York", "America/New_York"],
  ["Los Angeles", "America/Los_Angeles"],
  ["São Paulo", "America/Sao_Paulo"],
  ["Cape Town", "Africa/Johannesburg"],
  ["Dubai", "Asia/Dubai"],
  ["Mumbai", "Asia/Kolkata"],
  ["Singapore", "Asia/Singapore"],
  ["Tokyo", "Asia/Tokyo"],
  ["Sydney", "Australia/Sydney"],
] as const

const styles = {
  page: {
    minHeight: "100vh",
    background: "#050807",
    color: "#f4f7f5",
    padding: "36px 20px 72px",
  },
  shell: {
    width: "100%",
    maxWidth: "1050px",
    margin: "0 auto",
  },
  eyebrow: {
    color: "#5cff9d",
    fontSize: "12px",
    fontWeight: 800,
    letterSpacing: "0.18em",
    textTransform: "uppercase" as const,
  },
  heading: {
    fontSize: "clamp(30px, 6vw, 54px)",
    margin: "8px 0 10px",
  },
  intro: {
    color: "#a9b8af",
    maxWidth: "720px",
    lineHeight: 1.6,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
    gap: "14px",
    marginTop: "28px",
  },
  card: {
    background: "#0c120f",
    border: "1px solid #254233",
    borderRadius: "16px",
    padding: "18px",
  },
  city: {
    color: "#b9ffd4",
    fontSize: "15px",
    fontWeight: 800,
    margin: 0,
  },
  time: {
    fontSize: "28px",
    fontWeight: 800,
    margin: "10px 0 4px",
  },
  date: {
    color: "#a9b8af",
    fontSize: "13px",
    margin: 0,
  },
}

function formatInZone(now: Date, timeZone: string) {
  const time = new Intl.DateTimeFormat(undefined, {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(now)

  const date = new Intl.DateTimeFormat(undefined, {
    timeZone,
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(now)

  return { time, date }
}

export default function WorldTimePage() {
  const [now, setNow] = useState<Date | null>(null)

  useEffect(() => {
    setNow(new Date())
    const timer = window.setInterval(() => setNow(new Date()), 1000)
    return () => window.clearInterval(timer)
  }, [])

  return (
    <main style={styles.page}>
      <section style={styles.shell}>
        <p style={styles.eyebrow}>VIA · Global</p>
        <h1 style={styles.heading}>World Time</h1>
        <p style={styles.intro}>
          Live local times for key DeSo and creator regions. Times follow the visitor&apos;s locale and each city&apos;s own daylight-saving rules.
        </p>

        <div style={styles.grid}>
          {CITIES.map(([city, timeZone]) => {
            const value = now ? formatInZone(now, timeZone) : null
            return (
              <article key={timeZone} style={styles.card}>
                <p style={styles.city}>{city}</p>
                <p style={styles.time}>{value?.time ?? "--:--:--"}</p>
                <p style={styles.date}>{value?.date ?? "Loading local time…"}</p>
              </article>
            )
          })}
        </div>
      </section>
    </main>
  )
}
