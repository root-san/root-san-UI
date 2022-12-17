import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MdAdd } from 'react-icons/md'

import { useRoomStore } from '/@/hooks/useRoomStore'
import { useOncePayStore } from '/@/hooks/useOncePayStore'

import Header from '/@/components/Header'
import PageContainer from '/@/components/PageContainer'
import Empty from './Empty'
import GroupList from './GroupList'
import OncePayList from './OncePayList'

const Top = () => {
  const { data: rooms } = useRoomStore()
  const { data } = useOncePayStore()
  const [isPaid, setIsPaid] = useState(false)

  return (
    <PageContainer>
      <Header
        title="ホーム"
        right={
          <Link to="/register">
            <MdAdd className='text-[32px]' />
          </Link>
        }
      />
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
        {(rooms ?? []).length === 0 && (data ?? []).length === 0 && (<Empty />)}
        <GroupList rooms={rooms ?? []} isPaid={isPaid} />
        <OncePayList oncePays={data ?? []} isPaid={isPaid} />
      </div>
    </PageContainer>
  )
}

export default Top
