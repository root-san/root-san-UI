import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'

import { MdArrowBackIosNew, MdMoreVert } from 'react-icons/md'
import Header from '/@/components/Header'
import PageContainer from '/@/components/PageContainer'
import { useRoom } from '/@/hooks/useRoom'
import Expence from './Expence'
import Calculate from './Calculate'
import Menu from './Menu'
import Modal from '/@/components/Modal'

const Group = () => {
  const { roomId } = useParams()
  const [isCalculate, setIsCalculate] = useState(false)
  const [isShowMenu, setIsShowMenu] = useState(false)
  const [dialog, setDialog] = useState<'Edit' | 'Invite' | 'Remove' | null>(
    null
  )

  const handleMenuClose = () => {
    setIsShowMenu(false)
  }
  const handleMenuClick = (type: 'Edit' | 'Invite' | 'Remove') => {
    setDialog(type)
    setIsShowMenu(false)
  }
  const onCloseModal = () => {
    setDialog(null)
  }

  if (!roomId) {
    // TODO: 404
    return <div>Room ID is not found</div>
  }

  const { room } = useRoom(roomId)
  if (room === undefined) {
    return <div>Loading...</div>
  }

  return (
    <PageContainer>
      <Header
        title={room?.name}
        left={
          <Link to="/" className='text-2xl'>
            <MdArrowBackIosNew />
          </Link>
        }
        right={
          <div>
            <button
              className='text-2xl relative'
              onClick={(e) => {
                e.stopPropagation()
                setIsShowMenu(true)
              }}
            >
              <MdMoreVert />
            </button>
            {isShowMenu && (
              <Menu onClose={handleMenuClose} onClick={handleMenuClick} />
            )}
          </div>
        }
      />
      <div className="p-5">
        <div className='flex font-semibold h-[42px] mb-6'>
          <button
            onClick={() => setIsCalculate(false)}
            className={`w-full border-b-2 ${
              !isCalculate
                ? 'text-blue-600 border-blue-600'
                : 'text-gray-600 border-transparent'
            }`}
          >
            出費
          </button>
          <button
            onClick={() => setIsCalculate(true)}
            className={`w-full border-b-2 ${
              isCalculate
                ? 'text-blue-600 border-blue-600'
                : 'text-gray-600 border-transparent'
            }`}
          >
            精算
          </button>
        </div>
        {!isCalculate ? <Expence room={room} /> : <Calculate room={room} />}
      </div>
      <Modal title="編集" onClose={onCloseModal} open={dialog === 'Edit'}>
        <div>編集</div>
      </Modal>
      <Modal
        title="グループに招待"
        onClose={onCloseModal}
        open={dialog === 'Invite'}
      >
        <div>招待</div>
      </Modal>
      <Modal
        title="グループから抜けますか？"
        onClose={onCloseModal}
        open={dialog === 'Remove'}
      >
        <div>抜ける</div>
      </Modal>
    </PageContainer>
  )
}

export default Group
