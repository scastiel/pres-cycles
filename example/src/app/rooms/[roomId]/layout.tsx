'use client'

import { LiveList } from '@liveblocks/client'
import {
  ClientSideSuspense,
  LiveblocksProvider,
  RoomProvider,
} from '@liveblocks/react'
import { PropsWithChildren, use } from 'react'
import { resolveRoomsInfo } from './actions'

export default function RoomLayout({
  params,
  children,
}: PropsWithChildren<{
  params: Promise<{ roomId: string }>
}>) {
  const { roomId } = use(params)

  return (
    <LiveblocksProvider
      authEndpoint="/api/liveblocks-auth"
      resolveRoomsInfo={resolveRoomsInfo}
    >
      <RoomProvider id={roomId} initialStorage={{ tasks: new LiveList([]) }}>
        <ClientSideSuspense fallback={<div>Loading…</div>}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  )
}
