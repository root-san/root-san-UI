import { useState } from 'react'
import DeletableCard from '/@/components/DeletableCard'
import Modal from '/@/components/Modal'

import { Event } from '/@/libs/apis'
import { toDateTime } from '/@/libs/date'

interface Props {
  event: Event
  payer: string
  onDelete: (id: string) => void
}

const TxnCard = ({ event, payer, onDelete }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)

  const onConfirmDelete = () => {
    setIsModalOpen(true)
  }

  const onDeleteHandler = () => {
    setIsModalOpen(false)
    setIsModalOpen(false)
    onDelete(event.id)
  }

  return (
    <>
      <DeletableCard
        open={isDeleteOpen}
        onOpen={() => setIsDeleteOpen(true)}
        onClose={() => setIsDeleteOpen(false)}
        onDelete={onConfirmDelete}
      >
        <div className='w-full py-4 px-5'>
          <div className="flex font-bold text-base truncate w-full justify-between gap-2">
            <p className="truncate">{event.name}</p>
            <p>¥{event.amount.toLocaleString('ja-JP')}</p>
          </div>
          <div className='flex text-gray-500 gap-x-2 text-xs justify-between'>
            <p>{toDateTime(new Date(event.eventAt))}</p>
            <p className='truncate'>{payer}</p>
          </div>
        </div>
      </DeletableCard>
      <Modal
        open={isModalOpen}
        onClose={() => {
          setIsDeleteOpen(false)
          setIsModalOpen(false)
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
            onClick={onDeleteHandler}
            className="w-full bg-red-50 h-12 text-red-500 font-bold rounded-lg hover:bg-red-100 active:bg-red-100"
          >
            削除
          </button>
          <button
            onClick={() => {
              setIsDeleteOpen(false)
              setIsModalOpen(false)
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

export default TxnCard
