import '@/styles/globals.scss'

import { ReactNode } from 'react'
import type { Metadata } from 'next'

import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { AlertContextComponent } from '@/contexts/alertContext'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { config } from '@fortawesome/fontawesome-svg-core'

config.autoAddCss = false

export const metadata: Metadata = {
  title: 'Desafio Psicomanager',
  description:
    'Projeto de posts de uma rede social para a empresa Psicomanager para a vaga de desenvolvedor front-end.',
  icons: {
    icon: '/favicon.ico',
  },
}

type Props = {
  children: ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <html lang="pt-BR">
      <body>
        <AlertContextComponent>
          <Header />

          <main className="pagesContainer">{children}</main>

          <Footer />
        </AlertContextComponent>
      </body>
    </html>
  )
}
