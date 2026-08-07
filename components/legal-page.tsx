import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { SacredBackground } from "@/components/sacred-background"
import { Footer } from "@/components/footer"

interface LegalSection {
  heading: string
  body: string[]
}

interface LegalPageProps {
  title: string
  updatedAt: string
  intro: string
  sections: LegalSection[]
}

export function LegalPage({ title, updatedAt, intro, sections }: LegalPageProps) {
  return (
    <>
      <SacredBackground />
      <main className="mx-auto min-h-[70vh] max-w-3xl px-4 pb-16 pt-24 sm:px-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          <ArrowLeft className="size-4" /> Voltar ao início
        </Link>

        <h1 className="mt-8 text-balance font-serif text-4xl font-semibold">{title}</h1>
        <p className="mt-2 text-sm text-muted-foreground">Última atualização: {updatedAt}</p>
        <p className="mt-6 text-pretty leading-relaxed text-foreground/90">{intro}</p>

        <div className="mt-10 flex flex-col gap-8">
          {sections.map((section) => (
            <section key={section.heading}>
              <h2 className="font-serif text-2xl font-semibold text-gold/90">{section.heading}</h2>
              <div className="mt-3 flex flex-col gap-3">
                {section.body.map((p, i) => (
                  <p key={i} className="text-pretty leading-relaxed text-muted-foreground">
                    {p}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </>
  )
}
