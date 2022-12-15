import React from 'react'

interface Props {
  title: string
  left?: React.ReactNode
  right?: React.ReactNode
}

const Header = ({ title, left, right }: Props) => {
  return (
    <header className="grid h-12 w-full grid-cols-[32px_1fr_32px] items-center justify-items-center py-2 px-6">
      <div>{left}</div>
      <div className="text-lg font-bold">{title}</div>
      <div>{right}</div>
    </header>
  )
}

export default Header
