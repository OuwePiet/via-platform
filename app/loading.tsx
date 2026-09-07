import styles from "./loading.module.css"

export default function Loading() {
  return (
    <div className={styles.wrap} role="status" aria-live="polite" aria-label="VIA is working">
      <span className={styles.lamp} aria-hidden="true">VIA</span>
      <span className={styles.text}>Working…</span>
    </div>
  )
}
