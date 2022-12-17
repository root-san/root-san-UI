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
      {room.events.map((event) => (
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
