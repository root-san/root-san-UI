import { useState } from 'react'

import { useSwipeable } from 'react-swipeable'

interface Props {
  children: React.ReactNode
  onDelete: () => void
}

const DeletableCard = ({ children, onDelete }: Props) => {
  const [showDeleteButton, setShowDeleteButton] = useState(false)

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      setShowDeleteButton(true)
    },
    onSwipedRight: () => {
      setShowDeleteButton(false)
    },
    onTap: () => {
      setShowDeleteButton(false)
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
        className={`relative w-full bg-white rounded-xl overflow-hidden p-6 transition-transform 
          ${showDeleteButton ? '-translate-x-[72px]' : ''}`}
        {...handlers}
      >
        {children}
      </div>
    </div>
  )
}

export default DeletableCard
