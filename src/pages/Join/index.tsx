import { useNavigate, useParams } from 'react-router'
import { v4 as uuidv4 } from 'uuid'

import Header from '/@/components/Header'
import PageContainer from '/@/components/PageContainer'
import people from '/@/assets/people.png'
import { useRoom } from '/@/hooks/useRoom'
import Input from '/@/components/Input'
import { useState } from 'react'
import Button from '/@/components/Button'
import { useRoomStore } from '/@/hooks/useRoomStore'
import apis from '/@/libs/apis'
import { Link } from 'react-router-dom'
import { MdArrowBackIosNew } from 'react-icons/md'
import AnimateBody from '/@/components/AnimateBody'

const Join = () => {
  const { roomId } = useParams()
  const [name, setName] = useState<string>('')
  const { addRoom } = useRoomStore()
  const navigate = useNavigate()
  if (roomId === undefined || roomId.length !== 36) {
    // TODO: 404ページに遷移する
    navigate('/')
    return null
  }

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const { room } = useRoom(roomId)
  if (room === undefined) {
    return null
  }

  const onClickJoin = async () => {
    const myId = uuidv4()
    try {
      await apis.addMember({ roomId: roomId, member: { id: myId, name: name } })
      await addRoom({ roomId: roomId, myName: name, myId: myId })
      navigate(`/group/${roomId}`)
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <PageContainer>
      <Header
        title="参加する"
        left={
          <Link to="/register" className='text-2xl'>
            <MdArrowBackIosNew />
          </Link>
        }
      />
      <AnimateBody>
        <div className='flex flex-col items-center p-5'>
          <img
            src={people}
            alt=""
            className='h-[200px]'
            width="200"
            height="200"
          />
          <div className="mt-4 w-full mb-14">
            <p className="text-center mb-6">{room.name}</p>
            <Input
              title="あなたの名前"
              type="text"
              value={name}
              onChange={onChangeName}
            />
          </div>
          <Button onClick={onClickJoin} text="参加する" />
        </div>
      </AnimateBody>
    </PageContainer>
  )
}

export default Join
