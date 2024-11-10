'use client'

import { LiveList } from '@liveblocks/client'
import {
  ClientSideSuspense,
  LiveblocksProvider,
  RoomProvider,
} from '@liveblocks/react'
import { PropsWithChildren, use } from 'react'

export default function RoomLayout({
  params,
  children,
}: PropsWithChildren<{
  params: Promise<{ roomId: string }>
}>) {
  const { roomId } = use(params)

  return (
    // @ts-expect-error no auth point
    <LiveblocksProvider
      publicApiKey={process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY}
    >
      <RoomProvider id={roomId} initialStorage={{ tasks: new LiveList([]) }}>
        <ClientSideSuspense fallback={<div>Loading…</div>}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  )
}
