import { Link } from 'react-router-dom'
import { RoomDetails } from '/@/libs/apis'

import TxnList from './TxnList'

interface Props {
  room: RoomDetails
}

const Expence = ({ room }: Props) => {
  return (
    <div className='w-full'>
      <Link
        to={`/group/${room.id}/add-pay`}
        className="mb-6 block w-full h-10 bg-gray-700 hover:bg-gray-900 active:bg-gray-900 font-bold text-center text-white leading-10 rounded-lg text-base"
      >
        出費を追加する
      </Link>
      <TxnList room={room} />
    </div>
  )
}

export default Expence
