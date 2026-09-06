import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://viadeso.online"

  return [
    {
      url: baseUrl,
      changeFrequency: "daily",
      priority: 1,
    },
  ]
}
