import React from 'react'

import { MdKeyboardArrowRight } from 'react-icons/md'

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
      className={`w-full grid grid-cols-[48px_1fr_40px] gap-x-4 items-center justify-items-start p-5 rounded-xl transition-colors ${
        hasBackground
          ? 'bg-white hover:bg-gray-50 active:bg-gray-50'
          : 'outline outline-2 outline-offset-[-2px] outline-gray-700 hover:backdrop-brightness-[0.97] active:backdrop-brightness-[0.97]'
      }`}
      onClick={onClick}
    >
      <div>{icon}</div>
      <div className="text-left">
        <div className="text-base font-bold mb-0.5">{title}</div>
        <div className="text-xs">{description}</div>
      </div>
      <MdKeyboardArrowRight className="text-[40px] text-gray-700" />
    </button>
  )
}

export default CardButton
