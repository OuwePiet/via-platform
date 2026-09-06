import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "VIA — DeSo NFT platform",
    short_name: "VIA",
    description:
      "Explore DeSo NFT collections through VIA, directly from the DeSo blockchain.",
    start_url: "/",
    display: "standalone",
    background_color: "#050807",
    theme_color: "#050807",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  }
}
