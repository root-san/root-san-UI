import { useRoom } from '/@/hooks/useRoom'
import TxnCard from './TxnCard'
import apis, { RoomDetails } from '/@/libs/apis'
import { toName } from '/@/libs/member'

interface Props {
  room: RoomDetails
}

const TxnList = ({ room }: Props) => {
  const { mutate } = useRoom(room.id)
  const onDelete = (id: string) => {
    try {
      apis.deleteEvent({ roomId: room.id, eventId: id })
      const newRoom = { ...room }
      newRoom.events = newRoom.events.filter((event) => event.id !== id)
      mutate(newRoom)
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className='flex flex-col gap-3'>
      {
        room.events.sort((a, b) => {
          // eventAtの日付のみ(時間は無視)を第一条件、CreatedAtの時間を第二条件にして降順ソート
          const ad = new Date(a.eventAt)
          const bd = new Date(b.eventAt)
          const aDate = new Date(ad.getFullYear(), ad.getMonth(), ad.getDate())
          const bDate = new Date(bd.getFullYear(), bd.getMonth(), bd.getDate())
          if (aDate.getTime() > bDate.getTime()) {
            return -1
          } else if (aDate.getTime() < bDate.getTime()) {
            return 1
          } else {
            if (a.createdAt > b.createdAt) {
              return -1
            } else if (a.createdAt < b.createdAt) {
              return 1
            } else {
              return 0
            }
          }
        }).map((event) => (
        <TxnCard
          key={event.id}
          event={event}
          payer={
            event.eventType === 'outer'
              ? `${toName(room.members, event.txns[0].payer)}が支払い`
              : `${toName(room.members, event.txns[0].payer)}が${toName(
                  room.members,
                  event.txns[0].receiver
                )}に支払い`
          }
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}

export default TxnList
