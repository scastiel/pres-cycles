import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Présentation React Montréal',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <h1>Présentation React Montréal</h1>
        {children}
      </body>
    </html>
  )
}
