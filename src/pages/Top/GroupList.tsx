import { RoomData } from '/@/hooks/useRoomStore'

import GroupCard from './GroupCard'

interface Props {
  rooms: RoomData[]
  isPaid?: boolean
}

// HACK: swrの扱いがわからなかったので、データ取得は子に任せた
// TODO: 現状だとempty statusが、roomが精算済み含めて0件の時にしか表示されない
// まとめて取得できるAPIが生えればそっちを使いたいかも

const GroupList = ({ rooms, isPaid }: Props) => {
  if (rooms.length === 0) {
    return null
  }

  return (
    <div className='flex flex-col gap-2'>
      {rooms.map((room) => (
        <GroupCard key={room.roomId} {...room} isPaid={isPaid} />
      ))}
    </div>
  )
}

export default GroupList
