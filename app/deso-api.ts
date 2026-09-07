const DESO_NODE = "https://node.deso.org"
const REQUEST_TIMEOUT_MS = 12_000
const MAX_ATTEMPTS = 2
const RETRY_DELAY_MS = 400

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function fetchDeSo(
  endpoint: string,
  init: RequestInit
): Promise<Response> {
  let lastError: unknown

  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt += 1) {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)

    try {
      const response = await fetch(
        `${DESO_NODE}/api/v0/${endpoint.replace(/^\//, "")}`,
        { ...init, signal: controller.signal }
      )

      const shouldRetry =
        attempt + 1 < MAX_ATTEMPTS &&
        (response.status === 429 || response.status >= 500)

      if (shouldRetry) {
        await response.body?.cancel()
        await sleep(RETRY_DELAY_MS * (attempt + 1))
        continue
      }

      return response
    } catch (error) {
      lastError = error
      if (attempt + 1 >= MAX_ATTEMPTS) throw error
      await sleep(RETRY_DELAY_MS * (attempt + 1))
    } finally {
      clearTimeout(timeout)
    }
  }

  throw lastError ?? new Error("DeSo request failed")
}
