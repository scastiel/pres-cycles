/* eslint-disable @next/next/no-img-element */
'use client'

import { LiveObject } from '@liveblocks/client'
import {
  useMutation,
  useOthers,
  useRoom,
  useRoomInfo,
  useStorage,
} from '@liveblocks/react'

export default function RoomPage() {
  const room = useRoom()
  const roomInfo = useRoomInfo(room.id)
  const others = useOthers()

  return (
    <section>
      <h2>Room: {roomInfo.info?.name}</h2>
      <p>
        <small>
          {others.length} other user(s) connected:{' '}
          {others.map((user) => (
            <span key={user.id} className="mr-2">
              {user.info.imageUrl && (
                <img
                  alt=""
                  src={user.info.imageUrl}
                  className="w-4  h-4 rounded-full inline"
                />
              )}{' '}
              {user.info.name}
            </span>
          ))}
        </small>
      </p>
      <TaskList />
    </section>
  )
}

function TaskList() {
  const tasks = useStorage((root) => root.tasks)

  if (tasks === null) return <p>Loading…</p>

  return (
    <ul>
      {tasks.length === 0 && <li>No task yet</li>}
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
      <li>
        <AddTaskForm />
      </li>
    </ul>
  )
}

function TaskItem({ task }: { task: Task }) {
  const updateStatus = useMutation(
    ({ storage }, status: TaskStatus) => {
      storage
        .get('tasks')
        .find((t) => t.get('id') === task.id)
        ?.set('status', status)
    },
    [task.id],
  )

  return (
    <li>
      <input
        id={`task-${task.id}`}
        type="checkbox"
        checked={task.status === 'done'}
        onChange={(event) => {
          const checkbox = event.target as HTMLInputElement
          const status = checkbox.checked ? 'done' : 'todo'
          updateStatus(status)
        }}
      />{' '}
      <label htmlFor={`task-${task.id}`}>{task.text}</label>
    </li>
  )
}

function AddTaskForm() {
  const addTask = useMutation(({ storage }, text: string) => {
    storage
      .get('tasks')
      .push(
        new LiveObject<Task>({ id: crypto.randomUUID(), text, status: 'todo' }),
      )
  }, [])

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        const form = event.target as HTMLFormElement
        const formData = new FormData(form)
        const text = formData.get('text') as string
        addTask(text)
        form.reset()
      }}
    >
      <input
        required
        name="text"
        type="text"
        placeholder="Implement authentication"
      />
      <button type="submit">Add</button>
    </form>
  )
}
