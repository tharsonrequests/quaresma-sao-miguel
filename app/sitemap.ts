import type { MetadataRoute } from "next"

export const dynamic = "force-static"

// Altere para o domínio final do site (ou defina NEXT_PUBLIC_SITE_URL).
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://quaresma-sao-miguel.example.com"

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return [
    { url: `${BASE_URL}/`, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${BASE_URL}/privacidade`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE_URL}/termos`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ]
}
