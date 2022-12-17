import { OncePayData } from '/@/types/OncePayData'

import OncePayCard from './OncePayCard'

interface Props {
  oncePays: OncePayData[]
  isPaid?: boolean
}

// HACK: swrの扱いがわからなかったので、データ取得は子に任せた
// TODO: 現状だとempty statusが、roomが精算済み含めて0件の時にしか表示されない
// まとめて取得できるAPIが生えればそっちを使いたいかも

const OncePayList = ({ oncePays, isPaid }: Props) => {
  if (oncePays.length === 0) {
    return null
  }

  return (
    <div className='flex flex-col gap-2'>
      {oncePays.map((oncePay) => (
        <OncePayCard key={oncePay.id} oncePay={oncePay} isPaid={isPaid} />
      ))}
    </div>
  )
}

export default OncePayList
