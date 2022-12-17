import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { MdArrowBackIosNew } from 'react-icons/md'

import { useRoom } from '/@/hooks/useRoom'

import PageContainer from '/@/components/PageContainer'
import Header from '/@/components/Header'
import Input from '/@/components/Input'
import Button from '/@/components/Button'
import Select from '/@/components/Select'

const GroupPay = () => {
  const { roomId } = useParams()
  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')
  const [eventAt, setEventAt] = useState('')
  const [receiver, setReceiver] = useState('')

  const submit = () => {
    console.log('hoge')
  }

  if (!roomId) {
    return <div>Room ID is not found</div>
  }

  const { room } = useRoom(roomId)
  if (room === undefined) {
    return <div>Loading...</div>
  }

  return (
    <PageContainer>
      <Header
        title="出費"
        left={
          <Link to={`/group/${roomId}`} className='text-[24px]'>
            <MdArrowBackIosNew />
          </Link>
        }
      />
      <div className="flex flex-col items-center p-5 gap-6">
        <div className="form-control w-full flex flex-col gap-y-3">
          <Input
            title="項目名"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-control w-full flex flex-col gap-y-3">
          <Input
            title="金額"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className="form-control w-full flex flex-col gap-y-3">
          <Input
            title="支払った日"
            type="date"
            value={eventAt}
            onChange={(e) => setEventAt(e.target.value)}
          />
        </div>
        <div className="form-control w-full flex flex-col gap-y-3">
          <Select
            title="支払った人"
            value={receiver}
            options={room.members}
            onChange={(e) => setReceiver(e.target.value)}
          />
        </div>
        <div className="flex flex-col items-start w-full gap-4">
          <div className="text-base font-bold">分配</div>
          <div className="flex flex-col w-full gap-2">
            {room.members.map((member) => (
              <div className="flex flex-row items-center gap-4">
                <div className="text-base flex-1">{member.name}</div>
                <div className="w-[120px]">
                  <Input type="number" value="100" onChange={(e) => {}} />
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-row items-center w-full gap-4">
            <div className="text-base font-bold flex-1">合計</div>
            <div className="w-[120px]">
              <Input
                type="number"
                value={amount}
                onChange={(e) => {}}
                disabled
              />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full fixed bottom-0 px-5 pt-5 pb-10 bg-white">
        <Button text="登録する" onClick={submit} />
      </div>
    </PageContainer>
  )
}

export default GroupPay
