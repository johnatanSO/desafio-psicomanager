import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { AlertContextComponent } from '@/contexts/alertContext'
import { ReactNode } from 'react'
import '@/styles/globals.scss'

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
