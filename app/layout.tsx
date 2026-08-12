import { Analytics } from "@vercel/analytics/next"
import type { Metadata, Viewport } from "next"
import { Inter, Cormorant_Garamond } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
})

const SITE_TITLE = "Quaresma de São Miguel Arcanjo 2026"
const SITE_DESCRIPTION =
  "40 dias de oração, fé e combate espiritual. Acompanhe diariamente a Quaresma de São Miguel Arcanjo 2026 com um vídeo de meditação por dia."

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://juntosemoracao.com.br"

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s | Quaresma de São Miguel",
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_TITLE,
  keywords: [
    "Quaresma de São Miguel",
    "São Miguel Arcanjo",
    "40 dias",
    "oração",
    "combate espiritual",
    "devoção católica",
    "fé",
    "2026",
  ],
  authors: [{ name: "Quaresma de São Miguel" }],
  generator: "",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Quaresma de São Miguel",
  },
  formatDetection: { telephone: false },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    siteName: SITE_TITLE,
    images: [{ url: "/images/sao-miguel-bg.png", width: 1200, height: 630, alt: "São Miguel Arcanjo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/images/sao-miguel-bg.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: "/images/icon-512.png",
    apple: "/images/icon-512.png",
  },
}

export const viewport: Viewport = {
  themeColor: "#0f1a33",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${cormorant.variable} bg-background`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
