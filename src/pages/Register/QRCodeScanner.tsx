import { useEffect, useRef, useState } from 'react'
import jsQR from 'jsqr'
import { motion } from 'framer-motion'
import PageContainer from '/@/components/PageContainer'
import { MdArrowBackIosNew } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import excludeImg from '/@/assets/exclude.svg'

const videoWidth: number = 720
const videoHeight: number = 720
const videoFrameRate: number = 30

const constraints: MediaStreamConstraints = {
  audio: false,
  video: {
    width: videoWidth,
    height: videoHeight,
    frameRate: {
      max: videoFrameRate,
    },
    facingMode: 'environment',
  },
}

interface Props {
  onClose: () => void
}

const QRCodeReader = ({ onClose }: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [qrCodeData, setQrCodeData] = useState<string[]>([])
  const navigate = useNavigate()
  const origin = window.location.origin

  useEffect(() => {
    const openCamera = async () => {
      const video = videoRef.current
      if (video) {
        const stream = await navigator.mediaDevices.getUserMedia(constraints)
        video.srcObject = stream
      }
    }
    openCamera()
  }, [])

  useEffect(() => {
    const decodeQRCode = () => {
      const canvas = canvasRef?.current
      const context = canvas?.getContext('2d', {
        willReadFrequently: true,
      })
      const video = videoRef?.current

      if (!(canvas && context && video)) {
        return
      }

      canvas.width = video.videoWidth
      canvas.height = video.videoHeight

      if (!(video.videoWidth && video.videoHeight)) {
        return
      }

      context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight)
      const imageData = context.getImageData(
        0,
        0,
        video.videoWidth,
        video.videoHeight
      )

      const code = jsQR(imageData.data, video.videoWidth, video.videoHeight)

      return code?.data
    }

    let animationFrameId: number
    const loop = () => {
      animationFrameId = requestAnimationFrame(loop)
      const decodedValue = decodeQRCode()

      if (!decodedValue || qrCodeData.includes(decodedValue)) {
        return
      }

      // URLの形式が正しければJOINページに遷移する
      const url = new URL(decodedValue)
      if (
        url.origin === origin &&
        url.pathname.match(
          /^\/join\/([0-9a-f]{8})-([0-9a-f]{4})-([0-9a-f]{4})-([0-9a-f]{4})-([0-9a-f]{12})$/
        )
      ) {
        if (videoRef.current?.srcObject) {
          const stream = videoRef.current.srcObject as MediaStream
          stream.getVideoTracks().forEach((track) => track.stop())
        }
        navigate(url.pathname)
        return
      }
      setQrCodeData([...qrCodeData, decodedValue])
    }
    loop()

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [qrCodeData])

  const handleStop = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      stream.getVideoTracks().forEach((track) => track.stop())
    }
    onClose()
  }

  return (
    <motion.div className="w-full h-full fixed top-0 left-0 overflow-auto bg-background">
      <PageContainer>
        <div className="w-full h-[100lvh] flex flex-col items-center justify-center relative">
          <div>
            <video
              autoPlay
              playsInline={true}
              ref={videoRef}
              className="absolute top-0 left-0 min-w-full min-h-full object-cover -z-20"
            >
              <canvas ref={canvasRef} />
            </video>
          </div>
          <img
            src={excludeImg}
            alt=""
            className='absolute h-full min-w-full object-cover -z-20'
          />
          <div className='absolute top-0 grid h-12 w-full grid-cols-[32px_1fr_32px] items-center justify-items-center py-2 px-4'>
            <div className='h-5 w-5 text-xl'>
              <MdArrowBackIosNew color="white" onClick={handleStop} />
            </div>
            <div className="text-base font-bold text-white">読み取り</div>
          </div>
        </div>
      </PageContainer>
    </motion.div>
  )
}

export default QRCodeReader
