import { ReactNode } from 'react'
import { createPortal } from 'react-dom'

const ModalPortal = ({ children }: { children: ReactNode }) => {
  const el = document.getElementById('modal')
  if (el === null) {
    return null
  }
  return createPortal(children, el)
}

export default ModalPortal
