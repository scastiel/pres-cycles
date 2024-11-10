/* eslint-disable @typescript-eslint/no-empty-object-type */

// Define Liveblocks types for your application

import { LiveList, LiveObject } from '@liveblocks/client'

// https://liveblocks.io/docs/api-reference/liveblocks-react#Typing-your-data
declare global {
  type TaskStatus = 'todo' | 'done'
  type Task = {
    id: string
    text: string
    status: TaskStatus
  }
  type LiveTask = LiveObject<Task>

  interface Liveblocks {
    // Each user's Presence, for useMyPresence, useOthers, etc.
    Presence: {
      // Example, real-time cursor coordinates
      // cursor: { x: number; y: number };
    }

    // The Storage tree for the room, for useMutation, useStorage, etc.
    Storage: {
      // Example, a conflict-free list
      // animals: LiveList<string>;
      tasks: LiveList<LiveTask>
    }

    // Custom user info set when authenticating with a secret key
    UserMeta: {
      id: string
      info: {
        name: string
        imageUrl: string | null
      }
    }

    // Custom events, for useBroadcastEvent, useEventListener
    RoomEvent: {}
    // Example has two events, using a union
    // | { type: "PLAY" }
    // | { type: "REACTION"; emoji: "🔥" };

    // Custom metadata set on threads, for useThreads, useCreateThread, etc.
    ThreadMetadata: {
      // Example, attaching coordinates to a thread
      // x: number;
      // y: number;
    }

    // Custom room info set with resolveRoomsInfo, for useRoomInfo
    RoomInfo: {
      // Example, rooms with a title and url
      // title: string;
      // url: string;
      name: string
    }
  }
}

export {}
