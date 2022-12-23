import { useState, ChangeEvent } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'

import { MdArrowBackIosNew, MdMoreVert } from 'react-icons/md'

import Header from '/@/components/Header'
import PageContainer from '/@/components/PageContainer'
import Modal from '/@/components/Modal'
import Input from '/@/components/Input'
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

const Group = () => {
  const { roomId } = useParams()
  const navigate = useNavigate()
  const { getUserIdByRoomId, removeRoom } = useRoomStore()

  const [isShowMenu, setIsShowMenu] = useState(false)

  const [name, setName] = useState<string>('')
  const [dialog, setDialog] = useState<'Edit' | 'Invite' | 'Remove' | null>(
    null
  )

  const { room, mutate } = useRoom(roomId)

  const handleMenuClose = () => {
    setIsShowMenu(false)
  }
  const handleMenuClick = (type: 'Edit' | 'Invite' | 'Remove') => {
    setDialog(type)
    setIsShowMenu(false)
    setName(room?.name || '')
  }
  const onCloseModal = () => {
    setDialog(null)
  }

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const handleChangeName = async () => {
    if (roomId === undefined) {
      onCloseModal()
      return
    }
    try {
      await apis.editRoom({ roomId: roomId, roomRuquestBody: { name: name } })
      await mutate()
      onCloseModal()
    } catch (e) {
      console.error(e)
    }
  }
  const handleDeleteRoom = async () => {
    if (roomId === undefined) {
      onCloseModal()
      return
    }
    try {
      await apis.deleteRoom({ roomId: roomId })
      await removeRoom(roomId)
      navigate('/')
    } catch (e) {
      console.error(e)
    }
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
        <Modal title="編集" onClose={onCloseModal} open={dialog === 'Edit'}>
          <div className="mt-6 h-[calc(85lvh-122px)]">
            <Input
              type="text"
              value={name}
              onChange={onChangeName}
              className="bg-gray-50"
            />
            <div className="flex gap-[17px] mt-9 mb-12">
              <Button onClick={onCloseModal} text="キャンセル" white />
              <Button onClick={handleChangeName} text="変更する" />
            </div>
            <Button onClick={handleDeleteRoom} text="グループを削除" warn />
          </div>
        </Modal>
        <CopyModal onClose={onCloseModal} open={dialog === 'Invite'} />
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
