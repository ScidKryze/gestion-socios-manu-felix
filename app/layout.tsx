import './globals.css'
import { Montserrat } from 'next/font/google'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
})

export const metadata = {
  title: 'Gestión de socios',
  description: 'App de gestión de socios',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={`${montserrat.className} bg-[#2b0000]`}>
        {children}
      </body>
    </html>
  )
}