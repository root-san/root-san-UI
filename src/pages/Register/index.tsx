import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  MdHelpOutline,
  MdOutlineRamenDining,
  MdOutlineAirplaneTicket,
  MdQrCodeScanner,
} from 'react-icons/md'
import { motion, AnimatePresence } from 'framer-motion'
import people from '/@/assets/people.png'

import PageContainer from '/@/components/PageContainer'
import Header from '/@/components/Header'
import CardButton from '/@/components/CardButton'
import Divider from '/@/components/Divider'
import CreateGroupDialog from './CreateGroupDialog'
import QRCodeReader from './QRCodeScanner'

const Register = () => {
  const [showGroupDialog, setShowGroupDialog] = useState(false)
  const [showQRScanner, setShowQRScanner] = useState(false)
  const navigate = useNavigate()

  const openGroupDialog = () => {
    setShowGroupDialog(true)
  }

  const closeGroupDialog = () => {
    setShowGroupDialog(false)
  }

  const openQRScanner = () => {
    setShowQRScanner(true)
  }

  const closeQRScanner = () => {
    setShowQRScanner(false)
  }

  const onNavigateOncePay = () => {
    navigate('/register/once-pay')
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <PageContainer>
          <Header
            title="割り勘する"
            right={
              <Link to="/help" className='text-[32px]'>
                <MdHelpOutline />
              </Link>
            }
          />
          <div className='flex flex-col items-center'>
            <motion.img
              src={people}
              alt=""
              className='h-[200px]'
              width="200"
              height="200"
            />
            <div className='flex flex-col mt-4 px-5 pb-5 w-full gap-y-6'>
              <p className='text-center text-sm font-semibold'>
                タイプを選んでください
              </p>
              <div className='flex flex-col gap-y-4'>
                <CardButton
                  title="複数の出費がある"
                  description="旅行など長期間に渡るもの"
                  icon={
                    <MdOutlineAirplaneTicket className='text-5xl text-gray-700' />
                  }
                  onClick={openGroupDialog}
                  hasBackground
                />
                <CardButton
                  title="いちどきり"
                  description="打ち上げなどその場限りのもの"
                  icon={
                    <MdOutlineRamenDining className='text-5xl text-gray-700' />
                  }
                  onClick={onNavigateOncePay}
                  hasBackground
                />
                <Divider text="または" />
                <CardButton
                  title="グループに参加する"
                  description="カメラで2次元コードを読み取ります"
                  icon={<MdQrCodeScanner className='text-5xl text-gray-700' />}
                  onClick={openQRScanner}
                />
              </div>
            </div>
          </div>
        </PageContainer>
      </motion.div>

      <AnimatePresence>
        {showGroupDialog && <CreateGroupDialog onClose={closeGroupDialog} />}
        {showQRScanner && <QRCodeReader onClose={closeQRScanner} />}
      </AnimatePresence>
    </>
  )
}

export default Register
