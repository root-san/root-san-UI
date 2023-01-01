import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'

import { MdArrowBackIosNew, MdMoreVert } from 'react-icons/md'

import Header from '/@/components/Header'
import PageContainer from '/@/components/PageContainer'
import AnimateBody from '/@/components/AnimateBody'
import Tab from '/@/components/Tab'
import CopyModal from './CopyModal'
import EditModal from './EditModal'
import RemoveModal from './RemoveModal'
import Expence from './Expence'
import Calculate from './Calculate'
import Menu from './Menu'

import { useRoom } from '/@/hooks/useRoom'

const Group = () => {
  const { roomId } = useParams()

  const [isShowMenu, setIsShowMenu] = useState(false)
  const [dialog, setDialog] = useState<'Edit' | 'Invite' | 'Remove' | null>(
    null
  )

  const { room } = useRoom(roomId)

  const handleMenuClose = () => {
    setIsShowMenu(false)
  }
  const handleMenuClick = (type: 'Edit' | 'Invite' | 'Remove') => {
    setDialog(type)
    setIsShowMenu(false)
  }
  const onCloseModal = () => {
    setDialog(null)
  }

  if (roomId === undefined || room === undefined) {
    // TODO: 404
    return <div>Room ID is not found</div>
  }

  return (
    <>
      <PageContainer>
        <Header
          title={room.name ?? ''}
          left={
            <Link to="/" className='text-2xl'>
              <MdArrowBackIosNew />
            </Link>
          }
          right={
            <div>
              <button
                className='text-2xl relative'
                onClick={(e) => {
                  e.stopPropagation()
                  setIsShowMenu(true)
                }}
              >
                <MdMoreVert />
              </button>
              {isShowMenu && (
                <Menu onClose={handleMenuClose} onClick={handleMenuClick} />
              )}
            </div>
          }
        />
        <AnimateBody>
          <div className="p-5">
            <Tab
              leftName="出費"
              rightName="精算"
              left={
                room && (
                  <Expence room={room} invite={() => setDialog('Invite')} />
                )
              }
              right={room && <Calculate room={room} />}
              id="calc"
            />
          </div>
        </AnimateBody>
        <EditModal
          room={room}
          open={dialog === 'Edit'}
          onClose={onCloseModal}
        />
        <CopyModal
          onClose={onCloseModal}
          open={dialog === 'Invite'}
          roomId={roomId}
        />
        <RemoveModal
          onClose={onCloseModal}
          open={dialog === 'Remove'}
          roomId={roomId}
        />
      </PageContainer>
    </>
  )
}

export default Group
