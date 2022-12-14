'use client'
import { Noto_Sans_JP } from '@next/font/google'
import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'

const NotoSansJP_Bold = Noto_Sans_JP({
  weight: '700',
  subsets: ['japanese'],
})

interface Props {
  title: string
  left?: React.ReactNode
  right?: React.ReactNode
}

const Header = ({ title, left, right }: Props) => {
  const [isShow, setIsShow] = React.useState(true)
  return (
    <div>
      <AnimatePresence>
        {isShow && (
          <motion.div
            key="modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ ease: 'easeOut', duration: 1 }}
          >
            <header className="grid h-12 w-full grid-cols-[32px_1fr_32px] items-center justify-items-center bg-black py-2 px-6">
              <div>{left}</div>
              <div className={NotoSansJP_Bold.className + ' text-lg'}>
                {title}
              </div>
              <div>{right}</div>
            </header>
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => {
          setIsShow(!isShow)
        }}
      >
        bbb
      </button>
      <motion.button whileTap={{ scale: 1.5 }}>aaa</motion.button>
    </div>
  )
}

export default Header
