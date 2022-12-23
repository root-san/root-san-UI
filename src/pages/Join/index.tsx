import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { v4 as uuidv4 } from 'uuid'
import { MdArrowBackIosNew } from 'react-icons/md'

import AnimateBody from '/@/components/AnimateBody'
import Header from '/@/components/Header'
import PageContainer from '/@/components/PageContainer'
import Input from '/@/components/Input'
import Button from '/@/components/Button'
import TitleImage from '/@/components/TitleImage'

import { useRoomStore } from '/@/hooks/useRoomStore'
import { useRoom } from '/@/hooks/useRoom'
import apis from '/@/libs/apis'
import people from '/@/assets/join.png'

const Join = () => {
  const { roomId } = useParams()
  const [name, setName] = useState<string>('')
  const { addRoom } = useRoomStore()
  const navigate = useNavigate()
  const { room } = useRoom(roomId)

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const onClickJoin = async () => {
    if (roomId === undefined || roomId.length !== 36) {
      return
    }

    const myId = uuidv4()
    try {
      await apis.addMember({ roomId: roomId, member: { id: myId, name: name } })
      await addRoom({ roomId: roomId, myName: name, myId: myId })
      navigate(`/group/${roomId}`)
    } catch (e) {
      console.error(e)
    }
  }

  if (roomId === undefined || roomId.length !== 36) {
    // TODO: 404ページに遷移する
    navigate('/')
    return null
  }

  if (room === undefined) {
    return null
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
          <TitleImage src={people} title={room.name} />
          <div className="mt-6 w-full mb-14">
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
