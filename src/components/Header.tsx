import { motion } from 'framer-motion'
import React from 'react'
import { useAnimateSetting } from '/@/hooks/useAnimateSetting'

interface Props {
  title: string
  left?: React.ReactNode
  right?: React.ReactNode
}

const Header = ({ title, left, right }: Props) => {
  const { pageDuration } = useAnimateSetting()
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: '100%' }}
      exit={{ opacity: 0 }}
      transition={{ duration: pageDuration }}
    >
      <header className="grid h-12 w-full grid-cols-[32px_1fr_32px] items-center justify-items-center py-2 px-4">
        <div className='h-5 w-5 text-xl'>{left}</div>
        <div className="text-base font-bold text-text truncate">{title}</div>
        <div>{right}</div>
      </header>
    </motion.div>
  )
}

export default Header
