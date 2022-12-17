// TODO: UIだけ作る

import { Result } from '/@/libs/apis'

interface Props {
  isPaid: boolean
  payer: string
  reciever: string
  amount: number
  result: Result
  onPaid: (result: Result) => void
}

const TransfarCard = ({
  isPaid,
  payer,
  reciever,
  amount,
  onPaid,
  result,
}: Props) => {
  return (
    <div className='w-full p-5 rounded-xl bg-white text-center'>
      <p className='text-gray-500 mb-0.5'>{`${payer}→${reciever}`}</p>
      <p className='text-gray-700 text-[32px]'>
        ¥{amount.toLocaleString('ja-JP')}
      </p>
      <button
        className={
          'w-full h-10 mt-4 bg-primary  font-bold text-center text-white text-sm leading-10 rounded-lg ' +
          'hover:bg-primary-hover active:bg-primary-hover disabled:bg-gray-400 disabled:text-gray-200'
        }
        disabled={isPaid}
        onClick={() => onPaid(result)}
      >
        支払い済みにする
      </button>
    </div>
  )
}

export default TransfarCard
