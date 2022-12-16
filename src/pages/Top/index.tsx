import { useState } from 'react'
import Header from '/@/components/Header'
import PageContainer from '/@/components/PageContainer'
import GroupList from './GroupList'
import { useRoomStore } from '/@/hooks/useRoomStore'

const Top = () => {
  const { data: rooms } = useRoomStore()
  const [isPaid, setIsPaid] = useState(false)

  return (
    <PageContainer>
      <Header title="ホーム" />
      <div className="p-5">
        <div className='flex font-semibold h-[42px] mb-5'>
          <button
            onClick={() => setIsPaid(false)}
            className={`w-full border-b-2 ${
              !isPaid
                ? 'text-blue-600 border-blue-600'
                : 'text-gray-600 border-transparent'
            }`}
          >
            利用中
          </button>
          <button
            onClick={() => setIsPaid(true)}
            className={`w-full border-b-2 ${
              isPaid
                ? 'text-blue-600 border-blue-600'
                : 'text-gray-600 border-transparent'
            }`}
          >
            精算済み
          </button>
        </div>
        <GroupList rooms={rooms ?? []} isPaid={isPaid} />
      </div>
    </PageContainer>
  )
}

export default Top
