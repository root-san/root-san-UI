import { RoomData } from '/@/hooks/useRoomStore'

import GroupCard from './GroupCard'

interface Props {
  rooms: RoomData[]
  isPaid?: boolean
}

const GroupList = ({ rooms, isPaid }: Props) => {
  const roomCards = rooms.map((room) => (
    <GroupCard key={room.roomId} {...room} isPaid={isPaid} />
  ))
  return <div className='flex flex-col gap-2'>{roomCards}</div>
}

export default GroupList
