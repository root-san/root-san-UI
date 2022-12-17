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

  const handleChangeName = () => {
    // TODO: update
  }
  const handleDeleteRoom = () => {
    // TODO: delete
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

  const { room } = useRoom(roomId)
  if (room === undefined) {
    return <div>Loading...</div>
  }

  return (
    <PageContainer>
      <Header
        title={room?.name}
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
      <div className="p-5">
        <div className='flex font-semibold h-[42px] mb-6'>
          <button
            onClick={() => setIsCalculate(false)}
            className={`w-full border-b-2 ${
              !isCalculate
                ? 'text-blue-600 border-blue-600'
                : 'text-gray-600 border-transparent'
            }`}
          >
            出費
          </button>
          <button
            onClick={() => setIsCalculate(true)}
            className={`w-full border-b-2 ${
              isCalculate
                ? 'text-blue-600 border-blue-600'
                : 'text-gray-600 border-transparent'
            }`}
          >
            精算
          </button>
        </div>
        {!isCalculate ? <Expence room={room} /> : <Calculate room={room} />}
      </div>
      <Modal title="編集" onClose={onCloseModal} open={dialog === 'Edit'}>
        <div className="mt-6">
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
          <QRCodeCanvas value={shareUrl} size={200} className="mx-auto my-14" />
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
  )
}

export default Group
