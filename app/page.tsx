import { SacredBackground } from "@/components/sacred-background"
import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { CurrentDay } from "@/components/current-day"
import { VideoGrid } from "@/components/video-grid"
import { PrayerGuide } from "@/components/prayer-guide"
import { AboutSection } from "@/components/about-section"
import { Footer } from "@/components/footer"
import { ProgressProvider } from "@/components/progress-provider"
import { VideoModalProvider } from "@/components/video-modal"

export default function HomePage() {
  return (
    <ProgressProvider>
      <VideoModalProvider>
        <SacredBackground />
        <Header />
        <main>
          <Hero />
          <CurrentDay />
          <VideoGrid />
          <PrayerGuide />
          <AboutSection />
        </main>
        <Footer />
      </VideoModalProvider>
    </ProgressProvider>
  )
}
