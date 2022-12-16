import { useEffect, useRef } from 'react'
import {
  MdQrCode,
  MdDriveFileRenameOutline,
  MdOutlineWavingHand,
} from 'react-icons/md'

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
    <div
      className='w-[152px] absolute top-3 right-3 text-xs bg-white drop-shadow-md space-y-3 px-4 py-3 rounded-lg font-bold text-start'
      ref={ref}
    >
      <button
        className="flex justify-start items-center gap-1"
        onClick={(e) => {
          e.stopPropagation()
          onClick('Invite')
        }}
      >
        <MdQrCode />
        <p>グループに招待</p>
      </button>
      <button
        className="flex justify-start items-center gap-1"
        onClick={(e) => {
          e.stopPropagation()
          onClick('Edit')
        }}
      >
        <MdDriveFileRenameOutline />
        <p>編集</p>
      </button>
      <button
        className="flex justify-start items-center gap-1"
        onClick={(e) => {
          e.stopPropagation()
          onClick('Remove')
        }}
      >
        <MdOutlineWavingHand />
        <p>グループを抜ける</p>
      </button>
    </div>
  )
}

export default Menu
