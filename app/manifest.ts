import type { MetadataRoute } from "next"

export const dynamic = "force-static"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Quaresma de São Miguel Arcanjo 2026",
    short_name: "São Miguel 2026",
    description: "40 dias de oração, fé e combate espiritual.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#0f1a33",
    theme_color: "#0f1a33",
    lang: "pt-BR",
    categories: ["lifestyle", "education"],
    icons: [
      {
        src: "/images/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/images/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  }
}
