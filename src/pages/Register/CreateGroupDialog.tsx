import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MdArrowBackIosNew } from 'react-icons/md'
import { v4 as uuidv4 } from 'uuid'

import apis from '/@/libs/apis'

import people from '/@/assets/people.png'

import PageContainer from '/@/components/PageContainer'
import Header from '/@/components/Header'
import { useRoomStore } from '/@/hooks/useRoomStore'
import Input from '/@/components/Input'
import Button from '/@/components/Button'

interface Props {
  onClose: () => void
}

const CreateGroupDialog = ({ onClose }: Props) => {
  const [groupName, setGroupName] = useState('')
  const [userName, setUserName] = useState('')
  const { addRoom } = useRoomStore()
  const navigate = useNavigate()

  const submit = async () => {
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
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Header
                title="複数の出費がある"
                left={<MdArrowBackIosNew onClick={onClose} />}
              />
            </motion.div>
            <div className='flex flex-col items-center'>
              <motion.img
                src={people}
                alt=""
                className='h-[200px]'
                width="200"
                height="200"
              />
              <motion.div
                className='flex flex-col mt-4 px-5 pb-5 w-full gap-y-6'
                initial={{ x: '120%', opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: '120%', opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <p className='text-center text-sm font-semibold'>
                  グループを作成しましょう
                </p>
                <div className='flex flex-col gap-y-6'>
                  <div className="form-control w-full flex flex-col gap-y-3">
                    <Input
                      title="グループ名"
                      type="text"
                      value={groupName}
                      onChange={(e) => setGroupName(e.target.value)}
                    />
                  </div>

                  <div className="form-control w-full flex flex-col gap-y-3">
                    <Input
                      title="あなたの名前"
                      type="text"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                    />
                  </div>
                </div>
                <div className='mt-10'>
                  <Button text="作成する" onClick={submit} />
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
