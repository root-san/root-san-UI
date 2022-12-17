import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSwipeable } from 'react-swipeable'

interface Props {
  children: React.ReactNode
  open: boolean
  to?: string
  onOpen: () => void
  onClose: () => void
  onDelete: () => void
}

const DeletableCard = ({
  children,
  open,
  to,
  onOpen,
  onClose,
  onDelete,
}: Props) => {
  const navigate = useNavigate()
  const handlers = useSwipeable({
    onSwipedLeft: () => {
      onOpen()
    },
    onSwipedRight: () => {
      onClose()
    },
    onTap: () => {
      if (!open && to !== undefined) {
        navigate(to)
      }
      onClose()
    },
    trackMouse: true,
  })

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
    <div className="relative w-full" ref={ref}>
      <button
        className="absolute top-0 h-full w-[80px] right-0 p-2 bg-red-500 z-0 rounded-r-xl active:bg-red-600"
        onClick={onDelete}
      >
        <p className='text-white font-bold ml-1'>削除</p>
      </button>
      <div
        className={`relative w-full bg-white rounded-xl overflow-hidden transition-transform 
          ${open ? '-translate-x-[72px]' : ''}`}
        {...handlers}
      >
        {children}
      </div>
    </div>
  )
}

export default DeletableCard
