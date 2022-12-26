import { useState, ChangeEvent } from 'react'
import Button from '/@/components/Button'

import Input from '/@/components/Input'
import Modal from '/@/components/Modal'
import apis, { RoomDetails } from '/@/libs/apis'

import { useRoomStore } from '/@/hooks/useRoomStore'
import { useNavigate } from 'react-router-dom'
import { useRoom } from '/@/hooks/useRoom'

interface Props {
  onClose: () => void
  open: boolean
  room: RoomDetails | undefined
}

const EditModal = ({ onClose, open, room }: Props) => {
  const [name, setName] = useState(room?.name ?? '')
  const { removeRoom } = useRoomStore()
  const { mutate } = useRoom(room?.id)
  const navigate = useNavigate()

  const handleChangeName = async () => {
    if (room?.id === undefined) {
      onClose()
      return
    }
    try {
      await apis.editRoom({ roomId: room.id, roomRuquestBody: { name: name } })
      await mutate()
      onClose()
    } catch (e) {
      console.error(e)
    }
  }

  const handleDeleteRoom = async () => {
    if (room?.id === undefined) {
      onClose()
      return
    }
    try {
      await apis.deleteRoom({ roomId: room.id })
      await removeRoom(room.id)
      navigate('/')
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <Modal title="編集" onClose={onClose} open={open}>
      <div className="mt-6 h-[calc(85lvh-122px)]">
        <Input
          type="text"
          value={name}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
          className="bg-gray-50"
        />
        <div className="flex gap-[17px] mt-9 mb-12">
          <Button onClick={onClose} text="キャンセル" white />
          <Button onClick={handleChangeName} text="変更する" />
        </div>
        <Button onClick={handleDeleteRoom} text="グループを削除" warn />
      </div>
    </Modal>
  )
}

export default EditModal
