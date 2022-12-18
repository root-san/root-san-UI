import { useEffect, useRef } from 'react'
import {
  MdQrCode,
  MdDriveFileRenameOutline,
  MdOutlineWavingHand,
} from 'react-icons/md'
import ModalPortal from '/@/components/ModalPortal'

interface Props {
  onClose: () => void
  onClick: (type: 'Edit' | 'Invite' | 'Remove') => void
}

const Menu = ({ onClose, onClick }: Props) => {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (ref.current === null) return
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose()
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [ref.current, onClose])

  return (
    <ModalPortal>
      <div
        className='w-44 absolute top-3 right-3 text-sm bg-white drop-shadow-md space-y-3 px-4 py-3 rounded-lg font-bold text-start'
        ref={ref}
      >
        <button
          className="flex justify-start items-center gap-2 h-6 w-full"
          onClick={(e) => {
            e.stopPropagation()
            onClick('Invite')
          }}
        >
          <MdQrCode className='text-2xl' />
          <p>グループに招待</p>
        </button>
        <button
          className="flex justify-start items-center gap-2 h-6 w-full"
          onClick={(e) => {
            e.stopPropagation()
            onClick('Edit')
          }}
        >
          <MdDriveFileRenameOutline className='text-2xl' />
          <p>編集</p>
        </button>
        <button
          className="flex justify-start items-center gap-2 text-red-500 w-full"
          onClick={(e) => {
            e.stopPropagation()
            onClick('Remove')
          }}
        >
          <MdOutlineWavingHand className='text-2xl' />
          <p>グループを抜ける</p>
        </button>
      </div>
    </ModalPortal>
  )
}

export default Menu
