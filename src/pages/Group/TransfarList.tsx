import TransfarCard from './TransfarCard'
import apis, { Member, Result } from '/@/libs/apis'
import { toName } from '/@/libs/member'
import { v4 as uuidv4 } from 'uuid'
import { useRoom } from '/@/hooks/useRoom'

interface Props {
  members: Member[]
  results: Result[]
  roomId: string
}

const TransfarList = ({ members, results, roomId }: Props) => {
  const { mutate } = useRoom(roomId)
  const onPaid = (result: Result) => {
    const eventId = uuidv4()
    const txnId = uuidv4()
    try {
      apis.addEvent({
        roomId: roomId,
        eventRequestBody: {
          id: eventId,
          eventType: 'inner',
          name: '送金',
          amount: result.amount,
          txns: [
            {
              id: txnId,
              payer: result.payer,
              receiver: result.receiver,
              amount: result.amount,
            },
          ],
          eventAt: new Date(),
        },
      })
      mutate()
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className='flex flex-col gap-3'>
      {results.map((result) => (
        <TransfarCard
          key={result.receiver + result.payer}
          isPaid={result.amount === 0}
          payer={toName(members, result.payer)}
          reciever={toName(members, result.receiver)}
          amount={result.amount}
          result={result}
          onPaid={onPaid}
        />
      ))}
    </div>
  )
}

export default TransfarList
