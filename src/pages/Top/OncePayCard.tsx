import { useState } from 'react'
import { Link } from 'react-router-dom'

import { toDateTime } from '/@/libs/date'
import { useOncePayStore } from '/@/hooks/useOncePayStore'
import { OncePayData } from '/@/types/OncePayData'

import DeletableCard from '/@/components/DeletableCard'
import Modal from '/@/components/Modal'

interface Props {
  oncePay: OncePayData
  isPaid?: boolean
}

const OncePayCard = ({ oncePay, isPaid }: Props) => {
  const { removeOncePay } = useOncePayStore()
  const [open, setOpen] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const members = (oncePay.txns ?? []).map((txn) => txn.name).join('・')

  const onDelete = async () => {
    await removeOncePay(oncePay.id)
  }

  const onConfirmDelete = () => {
    setOpen(true)
  }

  if (
    (!isPaid && oncePay.txns.every((txn) => txn.isPaid)) ||
    (isPaid && oncePay.txns.some((txn) => !txn.isPaid))
  ) {
    return null
  }

  return (
    <>
      <Link to={`/once-pay/${oncePay.id}`}>
        <DeletableCard
          onDelete={onConfirmDelete}
          open={openDelete}
          onOpen={() => setOpenDelete(true)}
          onClose={() => setOpenDelete(false)}
        >
          <div className='w-full py-4 px-5'>
            <p className='font-bold text-base truncate'>{oncePay.name}</p>
            <div className='flex text-gray-500 gap-x-2 text-xs'>
              <p>{toDateTime(new Date(oncePay.createdAt))}</p>
              <p className='truncate'>{members}</p>
            </div>
          </div>
        </DeletableCard>
      </Link>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false)
          setOpenDelete(false)
        }}
      >
        <p className='w-full text-center font-bold text-lg'>
          この支払いを削除しますか？
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

export default OncePayCard
