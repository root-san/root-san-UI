import { Link } from 'react-router-dom'
import { RoomDetails } from '/@/libs/apis'

import TxnList from './TxnList'
import Button from '/@/components/Button'

interface Props {
  room: RoomDetails
  invite: () => void
}

const Expence = ({ room, invite }: Props) => {
  return (
    <div className='w-full'>
      <Link
        to={`/group/${room.id}/add-pay`}
        className="mb-6 block line-h-12 w-full h-12 bg-primary hover:bg-primary-hover active:bg-primary-hover font-bold text-center text-white leading-[48px] rounded-lg text-base"
      >
        出費を追加する
      </Link>
      {room.events.length === 0 && (
        <Button text="グループに招待する" onClick={invite} className="bg-transparent text-gray-700 border-[1px] border-gray-700 hover:bg-[#e7e8ec] active:bg-[#e7e8ec]"/>
      )}
      <TxnList room={room} />
    </div>
  )
}

export default Expence
