import { currentUser } from '@clerk/nextjs/server'
import { PropsWithChildren } from 'react'

export default async function RoomsLayout({ children }: PropsWithChildren) {
  const user = await currentUser()
  if (!user) return <p>You need to sign in to access this page.</p>

  return children
}
