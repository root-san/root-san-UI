import useSWR from 'swr'

export interface RoomData {
  myId: string
  myName: string
  roomId: string
}

export const useRoomStore = () => {
  const { data, mutate } = useSWR<RoomData[]>('rooms', null, {
    fallbackData: [],
  })

  const addRoom = async (room: RoomData) => {
    // search for existing room
    if ((data ?? []).find((r) => r.roomId === room.roomId)) {
      return
    }
    const newRooms = [...(data ?? []), room]
    await mutate(newRooms, false)
  }

  const updateRoom = async (room: RoomData) => {
    const newRooms = (data ?? []).map((r) =>
      r.roomId === room.roomId ? room : r
    )
    await mutate(newRooms, false)
  }

  const removeRoom = async (roomId: string) => {
    const newRooms = (data ?? []).filter((r) => r.roomId !== roomId)
    await mutate(newRooms, false)
  }

  const getUserIdByRoomId = (roomId: string) => {
    const room = (data ?? []).find((r) => r.roomId === roomId)
    return room?.myId
  }

  const deleteAllRoom = async () => {
    await mutate([], false)
  }

  return {
    addRoom,
    updateRoom,
    removeRoom,
    deleteAllRoom,
    getUserIdByRoomId,
    data,
  }
}
