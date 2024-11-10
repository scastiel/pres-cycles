import { liveblocks } from '@/liveblocks'
import { currentUser } from '@clerk/nextjs/server'
import assert from 'assert'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function RoomsPage() {
  const user = await currentUser()
  assert(user, 'Missing user')

  const { data: rooms } = await liveblocks.getRooms({ groupIds: ['demo'] })

  return (
    <>
      <h2>Rooms</h2>
      <ul>
        {rooms.length === 0 && <li>No room yet</li>}
        {rooms.map((room) => (
          <li key={room.id}>
            <Link href={`/rooms/${room.id}`}>{room.metadata.name}</Link>
          </li>
        ))}
        <li>
          <CreateRoomForm />
        </li>
      </ul>
    </>
  )
}

function CreateRoomForm() {
  async function createRoom(formData: FormData) {
    'use server'
    const user = await currentUser()
    assert(user, 'Missing user')
    const name = formData.get('name') as string
    const id = crypto.randomUUID()
    await liveblocks.createRoom(id, {
      metadata: { name },
      defaultAccesses: [],
      groupsAccesses: { demo: ['room:write'] },
    })
    redirect(`/rooms/${id}`)
  }

  return (
    <form action={createRoom}>
      <input name="name" type="text" required placeholder="My new room" />
      <button type="submit">Create</button>
    </form>
  )
}
