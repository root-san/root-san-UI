import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MdAdd } from 'react-icons/md'
import { AnimatePresence, motion } from 'framer-motion'
import AnimateBody from '/@/components/AnimateBody'

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
      <AnimateBody>
        <div className="p-5">
          <div className='mb-5'>
            <div className='flex font-semibold h-[42px]'>
              <button
                onClick={() => setIsPaid(false)}
                className={`w-full ${
                  !isPaid ? 'text-blue-600' : 'text-gray-600'
                }`}
              >
                利用中
              </button>
              <button
                onClick={() => setIsPaid(true)}
                className={`w-full ${
                  isPaid ? 'text-blue-600' : 'text-gray-600'
                }`}
              >
                精算済み
              </button>
            </div>
            <div
              className={`w-3/6 h-0.5 bg-blue-600 transition-transform duration-200 ${
                isPaid ? 'translate-x-full' : ''
              }`}
            />
          </div>
          <AnimatePresence initial={false} mode="popLayout">
            {!isPaid ? (
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                key="expence"
              >
                {(rooms ?? []).length === 0 && (data ?? []).length === 0 && (
                  <Empty />
                )}
                <GroupList rooms={rooms ?? []} isPaid={isPaid} />
                <OncePayList oncePays={data ?? []} isPaid={isPaid} />
              </motion.div>
            ) : (
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                key="calculat"
              >
                {(rooms ?? []).length === 0 && (data ?? []).length === 0 && (
                  <Empty />
                )}
                <GroupList rooms={rooms ?? []} isPaid={isPaid} />
                <OncePayList oncePays={data ?? []} isPaid={isPaid} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </AnimateBody>
    </PageContainer>
  )
}

export default Top
