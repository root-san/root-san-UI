import TransfarCard from './TransfarCard'
import { Member, Result } from '/@/libs/apis'
import { toName } from '/@/libs/member'

interface Props {
  members: Member[]
  results: Result[]
}

const TransfarList = ({ members, results }: Props) => {
  return (
    <div className='flex flex-col gap-3'>
      {results.map((result) => (
        <TransfarCard
          key={result.receiver + result.payer}
          isPaid={result.amount === 0}
          payer={toName(members, result.payer)}
          reciever={toName(members, result.receiver)}
          amount={result.amount}
        />
      ))}
    </div>
  )
}

export default TransfarList
