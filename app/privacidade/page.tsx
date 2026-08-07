import type { Metadata } from "next"
import { LegalPage } from "@/components/legal-page"

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: "Como a Quaresma de São Miguel Arcanjo 2026 trata seus dados: nada é enviado para servidores.",
}

export default function PrivacidadePage() {
  return (
    <LegalPage
      title="Política de Privacidade"
      updatedAt="Agosto de 2026"
      intro="A sua privacidade é importante para nós. Este site foi criado para ser uma experiência de oração simples, silenciosa e respeitosa."
      sections={[
        {
          heading: "Nenhum dado enviado a servidores",
          body: [
            "Este é um site totalmente estático. Não possuímos banco de dados, backend ou APIs próprias. Nenhuma informação pessoal é coletada, transmitida ou armazenada em servidores.",
          ],
        },
        {
          heading: "Dados guardados no seu dispositivo",
          body: [
            "Para lembrar o seu progresso (dias assistidos, último vídeo e porcentagem concluída), utilizamos o armazenamento local (localStorage) do seu próprio navegador.",
            "Essas informações permanecem apenas no seu dispositivo e podem ser apagadas a qualquer momento limpando os dados do navegador.",
          ],
        },
        {
          heading: "Vídeos do YouTube",
          body: [
            "Os vídeos são exibidos através do player incorporado do YouTube e só são carregados quando você clica em Assistir. Ao reproduzir um vídeo, o YouTube pode aplicar suas próprias políticas de privacidade e cookies.",
          ],
        },
        {
          heading: "Contato",
          body: [
            "Em caso de dúvidas sobre esta política, procure o responsável pela iniciativa devocional que disponibilizou este site.",
          ],
        },
      ]}
    />
  )
}
