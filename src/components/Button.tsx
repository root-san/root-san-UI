import React from 'react'

interface Props {
  title: string
  description: string
  icon: React.ReactNode
  onClick: () => void
  hasBackground: boolean
}

const Button = ({
  title,
  description,
  icon,
  onClick,
  hasBackground,
}: Props) => {
  return (
    <button
      className={`w-full grid grid-cols-[48px_1fr_24px] gap-x-4 items-center justify-items-start p-5 rounded-xl ${
        hasBackground ? 'bg-white' : 'outline outline-2 outline-offset-[-2px] outline-black'
      }`}
      onClick={onClick}
    >
      <div>{icon}</div>
      <div className="text-left">
        <div className="text-lg font-bold mb-0.5">{title}</div>
        <div className="text-xs">{description}</div>
      </div>
      <img src="src/assets/arrow-forward.svg" />
    </button>
  )
}

export default Button
