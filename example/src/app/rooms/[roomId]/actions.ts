'use server'

import { liveblocks } from '@/liveblocks'

export async function resolveRoomsInfo({ roomIds }: { roomIds: string[] }) {
  'use server'
  return await Promise.all(
    roomIds.map(async (roomId) => {
      const room = await liveblocks.getRoom(roomId)
      return room ? { name: String(room.metadata.name) } : undefined
    }),
  )
}
