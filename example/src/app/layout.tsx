import type { Metadata } from 'next'
import './globals.css'
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from '@clerk/nextjs'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Présentation React Montréal',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <header>
            <h1>Présentation React Montréal</h1>
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <nav>
                <Link href="/rooms">Rooms</Link>
                <UserButton />
              </nav>
            </SignedIn>
          </header>
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
