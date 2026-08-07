import Image from "next/image"

/**
 * Fundo sagrado fixo: São Miguel, céu e raios de luz,
 * com blur e overlay para manter a legibilidade.
 */
export function SacredBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <Image
        src="/images/sao-miguel-bg.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="scale-110 object-cover opacity-40 blur-[2px]"
      />
      {/* Overlays de profundidade e legibilidade */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/85 to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_0%,var(--background)_78%)]" />
      {/* Brilho dourado sutil no topo */}
      <div className="absolute -top-1/4 left-1/2 h-[60vh] w-[60vh] -translate-x-1/2 rounded-full bg-gold/10 blur-[120px]" />
    </div>
  )
}
