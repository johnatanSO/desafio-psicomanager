import '@/styles/globals.scss'

import { ReactNode } from 'react'

import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { AlertContextComponent } from '@/contexts/alertContext'
import { config } from '@fortawesome/fontawesome-svg-core'

config.autoAddCss = false

type Props = {
  children: ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <html lang="pt-BR">
      <title>Desafio Psicomanager</title>

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
