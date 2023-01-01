
import { useState } from 'react'

import {  MdLink, MdOutlineCheckCircleOutline } from 'react-icons/md'
import { QRCodeCanvas } from 'qrcode.react'
import Modal from '/@/components/Modal'
import { useCopyToClipboard } from '/@/hooks/useCopyToClipboard'

interface Props {
  roomId: string
  open: boolean
  onClose: () => void
}

const CopyModal = ({roomId, onClose, open}: Props) => {
  const [copied, setCopied] = useState(false)
  const [_, copy] = useCopyToClipboard()
  const shareUrl = `${window.location.origin}/join/${roomId}`

  const handleCopy = () => {
    copy(shareUrl)
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 3000)
  }

  const onCloseModal = () => {
    setCopied(false)
    onClose()
  }
  return (
    <Modal
    title="グループに招待"
    onClose={onCloseModal}
    open={open}
  >
    <div>
      <QRCodeCanvas
        value={shareUrl}
        size={200}
        className="mx-auto my-14"
      />
      <button
        onClick={handleCopy}
        className="flex gap-1.5 rounded-full border border-[rgba(rgba(0, 0, 0, 0.16))] px-3 py-1 items-center mx-auto mb-6"
      >
        {copied ? (
          <>
            <MdOutlineCheckCircleOutline
              className="text-2xl animate-scale-in-center"
              color='#5EB917'
            />
            <p className="font-bold text-xs">コピーしました</p>
          </>
        ) : (
          <>
            <MdLink className="text-2xl" />
            <p className="font-bold text-xs">リンクをコピー</p>
          </>
        )}
      </button>
    </div>
  </Modal>
  )
}

export default CopyModal