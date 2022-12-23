import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MdArrowBackIosNew } from 'react-icons/md'
import { v4 as uuidv4 } from 'uuid'

import { useRoomStore } from '/@/hooks/useRoomStore'
import apis from '/@/libs/apis'

import PageContainer from '/@/components/PageContainer'
import Header from '/@/components/Header'
import Input from '/@/components/Input'
import Button from '/@/components/Button'
import TitleImage from '/@/components/TitleImage'

import people from '/@/assets/input.png'

interface Props {
  onClose: () => void
}

const CreateGroupDialog = ({ onClose }: Props) => {
  const [groupName, setGroupName] = useState('')
  const [userName, setUserName] = useState('')
  const { addRoom } = useRoomStore()
  const navigate = useNavigate()

  const submit = async () => {
    if (groupName === '' || userName === '') {
      return
    }
    try {
      const roomId = uuidv4()
      const userId = uuidv4()
      await apis.createRoom({ room: { id: roomId, name: groupName } })
      await apis.addMember({
        roomId,
        member: { id: userId, name: userName },
      })
      await addRoom({ roomId, myId: userId, myName: userName })
      navigate(`/group/${roomId}`)
    } catch (e) {
      console.log(JSON.stringify(e))
    }
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className='bg-background'
      >
        <div className="w-full h-full fixed top-0 left-0 overflow-auto bg-inherit">
          <PageContainer>
            <Header
              title="複数の出費がある"
              left={<MdArrowBackIosNew onClick={onClose} />}
            />
            <div className='flex flex-col items-center p-5'>
              <TitleImage src={people} title="グループを作成しましょう" />
              <motion.div
                className='flex flex-col mt-6 w-full gap-y-6'
                initial={{ x: '120%', opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: '120%', opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Input
                  title="グループ名"
                  type="text"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                />
                <Input
                  title="あなたの名前"
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
                <div className='mt-10'>
                  <Button
                    text="作成する"
                    onClick={submit}
                    disabled={groupName === '' || userName === ''}
                  />
                </div>
              </motion.div>
            </div>
          </PageContainer>
        </div>
      </motion.div>
    </>
  )
}

export default CreateGroupDialog
