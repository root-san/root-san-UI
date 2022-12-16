import TxnCard from './TxnCard'
import { RoomDetails } from '/@/libs/apis'

interface Props {
  room: RoomDetails
}

const TxnList = ({ room }: Props) => {
  return (
    <div className='flex flex-col gap-3'>
      {room.txns.map((txn) => (
        <TxnCard key={txn.id} txn={txn} payer="aaaa" isTransfer={true} />
      ))}
    </div>
  )
}

export default TxnList
