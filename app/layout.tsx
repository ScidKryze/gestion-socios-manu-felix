import './globals.css'

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
      <body style={{ margin: 0, padding: 0, fontFamily: 'Barlow, sans-serif' }}>
        {children}
      </body>
    </html>
  )
}
