import { useSwipeable } from 'react-swipeable'

interface Props {
  children: React.ReactNode
  open: boolean
  onOpen: () => void
  onClose: () => void
  onDelete: () => void
}

const DeletableCard = ({
  children,
  open,
  onOpen,
  onClose,
  onDelete,
}: Props) => {
  const handlers = useSwipeable({
    onSwipedLeft: () => {
      onOpen()
    },
    onSwipedRight: () => {
      onClose()
    },
    onTap: () => {
      onClose()
    },
    trackMouse: true,
  })
  return (
    <div className="relative w-full">
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
