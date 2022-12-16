import { useRoom } from '/@/hooks/useRoom'
import { useRoomStore } from '/@/hooks/useRoomStore'
import DeletableCard from '/@/components/DeletableCard'
import Modal from '/@/components/Modal'
import apis from '/@/libs/apis'
import { useState } from 'react'

interface Props {
  roomId: string
  myId: string
  isPaid?: boolean
}

const GroupCard = ({ roomId, myId, isPaid }: Props) => {
  const { room, isError } = useRoom(roomId)
  const { removeRoom } = useRoomStore()
  const onDelete = () => {
    removeRoom(roomId)
    try {
      apis.deleteMember({ roomId, memberId: myId })
    } catch (e) {
      console.error(e)
    }
  }
  const [open, setOpen] = useState(false)
  const onConfirmDelete = () => {
    setOpen(true)
  }

  const [openDelete, setOpenDelete] = useState(false)

  const members = (room?.members ?? []).map((member) => member.name).join('・')

  // useSWRでAPIをまとめてとってきて更新する方法がわからなかったので、内部で個別に処理してる
  if (isError || room === undefined || room.results === undefined) {
    return null
  }
  if (
    (isPaid && room.results.length !== 0) ||
    (!isPaid && room.results.length === 0)
  ) {
    return null
  }

  return (
    <>
      <DeletableCard
        onDelete={onConfirmDelete}
        open={openDelete}
        onOpen={() => setOpenDelete(true)}
        onClose={() => setOpenDelete(false)}
      >
        <div className='w-full py-4 px-5'>
          <p className='font-bold text-base truncate'>{room.name}</p>
          <div className='flex text-gray-500 gap-x-2 text-xs'>
            <p>
              {room.createdAt !== undefined
                ? new Date(room.createdAt).toLocaleDateString()
                : ''}
            </p>
            <p className='truncate'>{members}</p>
          </div>
        </div>
      </DeletableCard>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false)
          setOpenDelete(false)
        }}
      >
        <p className='w-full text-center font-bold text-lg'>
          このグループを削除しますか？
        </p>
        <p className='w-full text-center text-sm mt-4'>
          削除すると元には戻せません
        </p>
        <div className="flex gap-[17px] mt-9">
          <button
            onClick={onDelete}
            className="w-full bg-red-50 h-12 text-red-500 font-bold rounded-lg hover:bg-red-100 active:bg-red-100"
          >
            削除
          </button>
          <button
            onClick={() => {
              setOpen(false)
              setOpenDelete(false)
            }}
            className="w-full h-12 font-bold rounded-lg"
          >
            キャンセル
          </button>
        </div>
      </Modal>
    </>
  )
}

export default GroupCard
