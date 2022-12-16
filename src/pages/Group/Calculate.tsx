import TransfarList from './TransfarList'
import CalculateSummary from './CalculateSummary'
import { RoomDetails } from '/@/libs/apis'
import { useRoomStore } from '/@/hooks/useRoomStore'

interface Props {
  room: RoomDetails
}

const Calculate = ({ room }: Props) => {
  const { data } = useRoomStore()
  const myId = data?.find((d) => room.id === d.roomId)?.myId

  const total = room.events.reduce(
    (acc, event) => (event.eventType === 'outer' ? acc + event.amount : acc),
    0
  )
  const paid = room.events
    .filter(
      (event) =>
        event.eventType === 'outer' &&
        event.txns.length > 0 &&
        event.txns[0].payer === myId
    )
    .reduce((acc, event) => acc + event.amount, 0)

  const results = room.members.map((member) => {
    const payer = room.results.filter((result) => result.payer === member.id)
    const receiver = room.results.filter(
      (result) => result.receiver === member.id
    )
    const amount =
      payer.reduce((acc, result) => acc + result.amount, 0) -
      receiver.reduce((acc, result) => acc + result.amount, 0)
    return { payer: member.name, amount }
  })

  return (
    <div className='space-y-6'>
      <CalculateSummary total={total} paid={paid} results={results} />
      <TransfarList members={room.members} results={room.results} />
    </div>
  )
}

export default Calculate
