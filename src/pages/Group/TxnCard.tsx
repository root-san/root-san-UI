import { useState } from 'react'
import DeletableCard from '/@/components/DeletableCard'
import Modal from '/@/components/Modal'

import { Txn } from '/@/libs/apis'

interface Props {
  txn: Txn
  payer: string
  isTransfer: boolean
}

const TxnCard = ({ txn, payer, isTransfer }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)

  const onConfirmDelete = () => {
    setIsModalOpen(true)
  }

  const onDelete = () => {
    // TODO: delete txn
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
          <div className="flex font-bold text-base truncate">
            <p>{txn.description}</p>
            <p>¥{txn.amount}</p>
          </div>
          <div className='flex text-gray-500 gap-x-2 text-xs'>
            <p>{new Date(txn.paidAt).toLocaleDateString()}</p>
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
            onClick={onDelete}
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
