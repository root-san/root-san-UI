import { useState } from 'react'
import { motion } from 'framer-motion'
import { MdArrowBackIos } from 'react-icons/md'
import { v4 as uuidv4 } from 'uuid'

import apis from '/@/libs/apis'

import people from '/@/assets/people.png'

import PageContainer from '/@/components/PageContainer'
import Header from '/@/components/Header'
import { useRoomStore } from '/@/hooks/useRoomStore'

interface Props {
  show: boolean
  onClose: () => void
}

const CreateGroupDialog = ({ show, onClose }: Props) => {
  const [groupName, setGroupName] = useState('')
  const [userName, setUserName] = useState('')
  const { addRoom } = useRoomStore()

  const submit = async () => {
    try {
      const roomId = uuidv4()
      const userId = uuidv4()
      await apis.createRoom({ room: { id: roomId, name: groupName } })
      await apis.addMember({
        roomId,
        member: { id: userId, name: userName },
      })
      addRoom({ roomId, myId: userId, myName: userName })
      onClose()
    } catch (e) {
      console.log(JSON.stringify(e))
    }
  }

  return (
    <>
      {show && (
        <motion.div
          className="w-full h-full fixed top-0 left-0 overflow-auto bg-inherit"
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ duration: 0.5 }}
        >
          <PageContainer>
            <Header
              title="複数の出費がある"
              left={<MdArrowBackIos onClick={onClose} />}
            />
            <div className='flex flex-col items-center'>
              <img
                src={people}
                alt=""
                className='h-[200px]'
                width="200"
                height="200"
              />
              <div className='flex flex-col mt-4 px-5 pb-5 w-full gap-y-6'>
                <p className='text-center text-sm font-semibold'>
                  グループを作成しましょう
                </p>
                <div className='flex flex-col gap-y-6'>
                  <div className="form-control w-full flex flex-col gap-y-3">
                    <label className="label">
                      <span className="label-text text-base font-bold">
                        グループ名
                      </span>
                    </label>
                    <input
                      type="text"
                      className="input input-lg w-full"
                      value={groupName}
                      onChange={(e) => setGroupName(e.target.value)}
                    />
                  </div>

                  <div className="form-control w-full flex flex-col gap-y-3">
                    <label className="label">
                      <span className="label-text text-base font-bold">
                        あなたの名前
                      </span>
                    </label>
                    <input
                      type="text"
                      className="input input-lg w-full"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                    />
                  </div>
                </div>
                <button className="btn mt-14" onClick={submit}>
                  作成する
                </button>
              </div>
            </div>
          </PageContainer>
        </motion.div>
      )}
    </>
  )
}

export default CreateGroupDialog
