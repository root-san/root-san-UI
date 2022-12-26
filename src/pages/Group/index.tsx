import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'

import { MdArrowBackIosNew, MdMoreVert } from 'react-icons/md'

import Header from '/@/components/Header'
import PageContainer from '/@/components/PageContainer'
import Modal from '/@/components/Modal'
import Button from '/@/components/Button'
import AnimateBody from '/@/components/AnimateBody'
import CopyModal from './CopyModal'
import Tab from '/@/components/Tab'
import Expence from './Expence'
import Calculate from './Calculate'
import Menu from './Menu'

import { useRoomStore } from '/@/hooks/useRoomStore'
import { useRoom } from '/@/hooks/useRoom'
import apis from '/@/libs/apis'
import EditModal from './EditModal'

const Group = () => {
  const { roomId } = useParams()
  const navigate = useNavigate()
  const { getUserIdByRoomId, removeRoom } = useRoomStore()

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

  const handleRemoveMember = () => {
    if (roomId === undefined) {
      onCloseModal()
      return
    }
    const myId = getUserIdByRoomId(roomId)
    if (myId === undefined) {
      onCloseModal()
      return
    }
    try {
      apis.deleteMember({ roomId: roomId, memberId: myId })
      removeRoom(roomId)
      navigate('/')
    } catch (e) {
      console.error(e)
    }
  }

  if (!roomId) {
    // TODO: 404
    return <div>Room ID is not found</div>
  }

  return (
    <>
      <PageContainer>
        <Header
          title={room?.name ?? ''}
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
        <Modal onClose={onCloseModal} open={dialog === 'Remove'}>
          <div>
            <p className="font-bold text-lg text-center">
              グループから抜けますか？
            </p>
            <div className="flex gap-[17px] mt-9 mb-5">
              <Button onClick={handleRemoveMember} text="抜ける" warn />
              <Button onClick={onCloseModal} text="キャンセル" white />
            </div>
          </div>
        </Modal>
      </PageContainer>
    </>
  )
}

export default Group
