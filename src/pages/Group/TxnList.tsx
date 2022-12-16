import TxnCard from './TxnCard'
import { RoomDetails } from '/@/libs/apis'

interface Props {
  room: RoomDetails
}

const TxnList = ({ room }: Props) => {
  return (
    <div className='flex flex-col gap-3'>
      {room.events.map((event) => (
        <TxnCard key={event.id} event={event} payer="aaaa" />
      ))}
    </div>
  )
}

export default TxnList
