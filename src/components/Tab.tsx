import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'

interface Props {
  right: React.ReactNode
  left: React.ReactNode
  rightName: string
  leftName: string
  id?: string
}

const Tab = ({ right, left, rightName, leftName, id }: Props) => {
  const [isRight, setIsRight] = useState(false)
  const [isAnimate, setIsAnimate] = useState(false)
  return (
    <>
      <div className='mb-6'>
        <div className='flex font-semibold h-[42px]'>
          <button
            onClick={() => {
              setIsAnimate(true)
              setIsRight(false)
            }}
            className={`w-full ${
              !isRight ? 'text-primary' : 'text-gray-600 font-normal'
            }`}
          >
            {leftName}
          </button>
          <button
            onClick={() => {
              setIsAnimate(true)
              setIsRight(true)
            }}
            className={`w-full ${
              isRight ? 'text-primary' : 'text-gray-600 font-normal'
            }`}
          >
            {rightName}
          </button>
        </div>
        <div
          className={`w-3/6 h-0.5 bg-primary transition-transform duration-200 ${
            isRight ? 'translate-x-full' : ''
          }`}
        />
      </div>
      <AnimatePresence initial={false} mode="popLayout">
        {!isRight ? (
          <motion.div
            initial={isAnimate && { x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            key={`left-${id ?? ''}`}
          >
            {left}
          </motion.div>
        ) : (
          <motion.div
            initial={isAnimate && { x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            key={`right-${id ?? ''}`}
          >
            {right}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Tab
