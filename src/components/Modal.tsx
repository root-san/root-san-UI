import { MouseEvent } from 'react'
import { MdOutlineClose } from 'react-icons/md'
import { motion } from 'framer-motion'

interface ModalProps {
  children: React.ReactNode
  open: boolean
  title?: string
  onClose?: () => void
}

const Modal = ({ children, open, title, onClose }: ModalProps) => {
  const handleOutSideClose = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation()
    if (event.target !== event.currentTarget) {
      return
    }
    if (onClose !== undefined) {
      onClose()
    }
  }
  const handleClose = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    if (onClose !== undefined) {
      onClose()
    }
  }

  return (
    <>
      {open && (
        <motion.div
          className="w-full h-full fixed top-0 left-0 "
          onClick={handleOutSideClose}
          initial={{ backdropFilter: 'brightness(100%)' }}
          animate={{ backdropFilter: 'brightness(50%)' }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="absolute inset-x-0 bottom-0 w-full max-w-3xl mx-auto bg-white p-6 rounded-t-[32px]"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
          >
            <div className="grid grid-cols-[1fr_24px]">
              <p className='text-center font-bold text-lg'>{title ?? ''}</p>
              <button onClick={handleClose}>
                <MdOutlineClose className='text-2xl' />
              </button>
            </div>
            <div>{children}</div>
          </motion.div>
        </motion.div>
      )}
    </>
  )
}

export default Modal
