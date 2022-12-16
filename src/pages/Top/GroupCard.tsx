import { useRoom } from '/@/hooks/useRoom'
import { useRoomStore } from '/@/hooks/useRoomStore'
import DeletableCard from '/@/components/DeletableCard'

import apis from '/@/libs/apis'

interface Props {
  roomId: string
  myId: string
  isPaid?: boolean
}

const GroupCard = ({ roomId, myId, isPaid }: Props) => {
  const { room, isError } = useRoom(roomId)
  const { removeRoom } = useRoomStore()
  const onDelete = () => {
    removeRoom(roomId)
    try {
      apis.deleteMember({ roomId, memberId: myId })
    } catch (e) {
      console.error(e)
    }
  }

  const members = (room?.members ?? []).map((member) => member.name).join('・')

  // useSWRでAPIをまとめてとってきて更新する方法がわからなかったので、内部で個別に処理してる
  if (isError || room === undefined || room.results === undefined) {
    return null
  }
  if (
    (isPaid && room.results.length !== 0) ||
    (!isPaid && room.results.length === 0)
  ) {
    return null
  }

  return (
    <DeletableCard onDelete={onDelete}>
      <div className='w-full py-4 px-5'>
        <p className='font-bold text-base truncate'>{room.name}</p>
        <div className='flex text-gray-500 gap-x-2 text-xs'>
          <p>
            {room.createdAt !== undefined
              ? new Date(room.createdAt).toLocaleDateString()
              : ''}
          </p>
          <p className='truncate'>{members}</p>
        </div>
      </div>
    </DeletableCard>
  )
}

export default GroupCard
