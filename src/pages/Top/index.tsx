import { Link } from 'react-router-dom'
import { MdAdd } from 'react-icons/md'

import { useRoomStore } from '/@/hooks/useRoomStore'
import { useOncePayStore } from '/@/hooks/useOncePayStore'

import Header from '/@/components/Header'
import AnimateBody from '/@/components/AnimateBody'
import PageContainer from '/@/components/PageContainer'
import Tab from '/@/components/Tab'
import Empty from './Empty'
import GroupList from './GroupList'
import OncePayList from './OncePayList'

const Top = () => {
  const { data: rooms } = useRoomStore()
  const { data: onceRooms } = useOncePayStore()

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
          <Tab
            right={
              <>
                {(rooms ?? []).length === 0 &&
                (onceRooms ?? []).length === 0 ? (
                  <Empty />
                ) : (
                  <>
                    <GroupList rooms={rooms ?? []} isPaid={false} />
                    <OncePayList oncePays={onceRooms ?? []} isPaid={false} />
                  </>
                )}
              </>
            }
            rightName="精算済み"
            left={
              <>
                {(rooms ?? []).length === 0 &&
                (onceRooms ?? []).length === 0 ? (
                  <Empty />
                ) : (
                  <>
                    <GroupList rooms={rooms ?? []} isPaid={true} />
                    <OncePayList oncePays={onceRooms ?? []} isPaid={true} />
                  </>
                )}
              </>
            }
            leftName="利用中"
          />
        </div>
      </AnimateBody>
    </PageContainer>
  )
}

export default Top
