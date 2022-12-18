import React from 'react'

import { MdArrowForwardIos } from 'react-icons/md'

interface Props {
  title: string
  description: string
  icon: React.ReactNode
  onClick: () => void
  hasBackground?: boolean
}

const CardButton = ({
  title,
  description,
  icon,
  onClick,
  hasBackground,
}: Props) => {
  return (
    <button
      className={`w-full grid grid-cols-[48px_1fr_24px] gap-x-4 items-center justify-items-start p-5 rounded-xl transition-colors ${
        hasBackground
          ? 'bg-white hover:bg-gray-50 active:bg-gray-50'
          : 'border-2 outline-offset-[-2px] border-gray-700 hover:backdrop-brightness-[0.97] active:backdrop-brightness-[0.97]'
      }`}
      onClick={onClick}
    >
      <div>{icon}</div>
      <div className="text-left">
        <div className="text-base font-bold mb-0.5">{title}</div>
        <div className="text-xs">{description}</div>
      </div>
      <MdArrowForwardIos className="text-[24px] text-gray-700" />
    </button>
  )
}

export default CardButton
