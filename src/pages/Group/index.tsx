import { useState, ChangeEvent } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'

import { MdArrowBackIosNew, MdMoreVert, MdLink } from 'react-icons/md'
import { QRCodeCanvas } from 'qrcode.react'

import Header from '/@/components/Header'
import PageContainer from '/@/components/PageContainer'
import { useRoom } from '/@/hooks/useRoom'
import Expence from './Expence'
import Calculate from './Calculate'
import Menu from './Menu'
import Modal from '/@/components/Modal'
import Input from '/@/components/Input'
import Button from '/@/components/Button'
import { useCopyToClipboard } from '/@/hooks/useCopyToClipboard'
import { useRoomStore } from '/@/hooks/useRoomStore'
import apis from '/@/libs/apis'
import { AnimatePresence, motion } from 'framer-motion'
import AnimateBody from '/@/components/AnimateBody'

const Group = () => {
  const { roomId } = useParams()
  const navigate = useNavigate()
  const { getUserIdByRoomId, removeRoom } = useRoomStore()

  const [isCalculate, setIsCalculate] = useState(false)
  const [isShowMenu, setIsShowMenu] = useState(false)
  const [name, setName] = useState<string>('')
  const [dialog, setDialog] = useState<'Edit' | 'Invite' | 'Remove' | null>(
    null
  )
  const [_, copy] = useCopyToClipboard()
  const shareUrl = `${window.location.origin}/join/${roomId}`
  const [isAnimate, setIsAnimate] = useState(false)

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
            <div className='mb-6'>
              <div className='flex font-semibold h-[42px]'>
                <button
                  onClick={() => {
                    setIsAnimate(true)
                    setIsCalculate(false)
                  }}
                  className={`w-full ${
                    !isCalculate ? 'text-primary' : 'text-gray-600'
                  }`}
                >
                  出費
                </button>
                <button
                  onClick={() => {
                    setIsAnimate(true)
                    setIsCalculate(true)
                  }}
                  className={`w-full ${
                    isCalculate ? 'text-primary' : 'text-gray-600 '
                  }`}
                >
                  精算
                </button>
              </div>
              <div
                className={`w-3/6 h-0.5 bg-primary transition-transform duration-200 ${
                  isCalculate ? 'translate-x-full' : ''
                }`}
              />
            </div>
            <AnimatePresence initial={false} mode="popLayout">
              {room &&
                (!isCalculate ? (
                  <motion.div
                    initial={isAnimate && { x: '-100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '-100%' }}
                    key="expence"
                  >
                    <Expence room={room} />
                  </motion.div>
                ) : (
                  <motion.div
                    initial={isAnimate && { x: '100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '100%' }}
                    key="calculat"
                  >
                    <Calculate room={room} />
                  </motion.div>
                ))}
            </AnimatePresence>
          </div>
        </AnimateBody>
        <Modal title="編集" onClose={onCloseModal} open={dialog === 'Edit'}>
          <div className="mt-6 h-[calc(85lvh-66px)]">
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
        <Modal
          title="グループに招待"
          onClose={onCloseModal}
          open={dialog === 'Invite'}
        >
          <div>
            <QRCodeCanvas
              value={shareUrl}
              size={200}
              className="mx-auto my-14"
            />
            <button
              onClick={() => copy(shareUrl)}
              className="flex gap-1.5 rounded-full border border-[rgba(rgba(0, 0, 0, 0.16))] px-3 py-1 items-center mx-auto mb-6"
            >
              <MdLink className="text-2xl" />
              <p className="font-bold text-xs">リンクをコピー</p>
            </button>
          </div>
        </Modal>
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
