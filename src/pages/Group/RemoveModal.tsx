import { useNavigate } from 'react-router-dom'

import Modal from '/@/components/Modal'
import Button from '/@/components/Button'

import { useRoomStore } from '/@/hooks/useRoomStore'
import apis from '/@/libs/apis'

interface Props {
  onClose: () => void
  open: boolean
  roomId: string
}

const RemoveModal = ({ open, onClose, roomId }: Props) => {
  const { getUserIdByRoomId, removeRoom } = useRoomStore()
  const navigate = useNavigate()

  const handleRemoveMember = () => {
    const myId = getUserIdByRoomId(roomId)
    if (myId === undefined) {
      onClose()
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

  return (
    <Modal onClose={onClose} open={open}>
      <div>
        <p className="font-bold text-lg text-center">
          グループから抜けますか？
        </p>
        <div className="flex gap-[17px] mt-9 mb-5">
          <Button onClick={handleRemoveMember} text="抜ける" warn />
          <Button onClick={onClose} text="キャンセル" white />
        </div>
      </div>
    </Modal>
  )
}

export default RemoveModal
