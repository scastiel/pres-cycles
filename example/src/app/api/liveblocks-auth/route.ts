import { liveblocks } from '@/liveblocks'
import { currentUser } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export async function POST() {
  const user = await currentUser()

  if (!user)
    return NextResponse.json({ error: 'Not signed in' }, { status: 401 })

  // Identify the user and return the result
  const { status, body } = await liveblocks.identifyUser(
    {
      userId: user.id,
      groupIds: ['demo'],
    },
    {
      userInfo: { name: user.username ?? 'Anonymous', imageUrl: user.imageUrl },
    },
  )

  return new Response(body, { status })
}
