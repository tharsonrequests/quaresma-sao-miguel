import type { Metadata } from "next"
import { LegalPage } from "@/components/legal-page"

export const metadata: Metadata = {
  title: "Termos de Uso",
  description: "Termos de uso do site da Quaresma de São Miguel Arcanjo 2026.",
}

export default function TermosPage() {
  return (
    <LegalPage
      title="Termos de Uso"
      updatedAt="Agosto de 2026"
      intro="Ao utilizar este site, você concorda com os termos descritos abaixo. Este é um projeto devocional, gratuito e sem fins lucrativos."
      sections={[
        {
          heading: "Finalidade",
          body: [
            "Este site tem finalidade exclusivamente religiosa e devocional, oferecendo uma meditação em vídeo por dia durante a Quaresma de São Miguel Arcanjo.",
          ],
        },
        {
          heading: "Direitos dos vídeos",
          body: [
            "Os vídeos exibidos pertencem aos seus respectivos autores e canais, e são apresentados por meio do player incorporado do YouTube, respeitando seus termos de serviço.",
            "Não reivindicamos autoria ou propriedade sobre o conteúdo dos vídeos.",
          ],
        },
        {
          heading: "Uso adequado",
          body: [
            "Você concorda em utilizar o site de forma respeitosa, sem tentar prejudicar seu funcionamento ou desvirtuar sua finalidade espiritual.",
          ],
        },
        {
          heading: "Isenção de responsabilidade",
          body: [
            "O site é oferecido no estado em que se encontra. A disponibilidade dos vídeos depende do YouTube e pode variar sem aviso prévio.",
          ],
        },
      ]}
    />
  )
}
