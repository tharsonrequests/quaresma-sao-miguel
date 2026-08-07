import Link from "next/link"
import { ShieldHalf } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/30">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center gap-2 font-serif text-xl font-semibold">
            <ShieldHalf className="size-6 text-gold" aria-hidden="true" />
            Quaresma de São Miguel Arcanjo 2026
          </div>
          <p className="mt-4 max-w-md text-pretty font-serif text-lg italic text-foreground/80">
            &ldquo;São Miguel Arcanjo, defendei-nos no combate.&rdquo;
          </p>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm">
          <Link
            href="/privacidade"
            className="text-muted-foreground transition-colors hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            Política de Privacidade
          </Link>
          <Link
            href="/termos"
            className="text-muted-foreground transition-colors hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            Termos de Uso
          </Link>
        </div>

        <p className="mx-auto mt-8 max-w-2xl text-balance text-center text-xs leading-relaxed text-muted-foreground">
          Os vídeos pertencem aos seus respectivos autores e são exibidos através do YouTube. Este site é uma iniciativa
          devocional sem fins lucrativos.
        </p>
        <p className="mt-4 text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Quaresma de São Miguel Arcanjo.
        </p>
      </div>
    </footer>
  )
}
