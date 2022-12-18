import { useState, useEffect, ChangeEvent } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { MdArrowBackIosNew, MdRestartAlt, MdError } from 'react-icons/md'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { v4 as uuidv4 } from 'uuid'

import { useRoom } from '/@/hooks/useRoom'
import { useRoomStore } from '/@/hooks/useRoomStore'

import apis, { RoomDetails } from '/@/libs/apis'

import PageContainer from '/@/components/PageContainer'
import Header from '/@/components/Header'
import Input from '/@/components/Input'
import Button from '/@/components/Button'
import Select from '/@/components/Select'
import Tag from '/@/components/Tag'
import Modal from '/@/components/Modal'
import AnimateBody from '/@/components/AnimateBody'
import { toDateFormat } from '/@/libs/date'

const calcMemberAmount = (room: RoomDetails, amount: string) => {
  const remainder = Number(amount) % room.members.length
  const basePay = Math.floor(Number(amount) / room.members.length)

  return Object.fromEntries(
    room.members.map((member, idx) => {
      if (idx < remainder) {
        return [member.id, `${basePay + 1}`]
      } else {
        return [member.id, `${basePay}`]
      }
    })
  )
}

const GroupEventEdit = () => {
  const navigate = useNavigate()
  const { roomId, eventId } = useParams()
  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')
  const [eventAt, setEventAt] = useState(toDateFormat(new Date()))
  const [receiver, setReceiver] = useState('')
  const [isEdit, setIsEdit] = useState(false)
  /** id をキー, 支払額を値に持つ */
  const [memberAmount, setMemberAmount] = useState<Record<string, string>>({})
  const [disabled, setDisabled] = useState(true)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const { room, mutate } = useRoom(roomId)
  const { data } = useRoomStore()

  useEffect(() => {
    if (room === undefined || eventId === undefined || data === undefined) {
      return
    }
    const event = room.events.find((e) => e.id === eventId)
    if (event === undefined) {
      return
    }

    setName(event.name)
    setAmount(`${event.amount}`)
    setEventAt(toDateFormat(new Date(event.eventAt)))
    setMemberAmount(calcMemberAmount(room, `${event.amount}`))

    if (event.txns.length > 0) {
      setReceiver(
        room.members.find((m) => m.id === event.txns[0].payer)?.id ?? ''
      )
    }
  }, [data, room, eventId])

  useEffect(() => {
    if (amount === '' || Number(amount) < 0) {
      setDisabled(true)
    }

    let total = 0
    Object.values(memberAmount).map((val) => (total += Number(val)))
    setDisabled(`${total}` !== amount)
  }, [amount, memberAmount])

  const evenUp = () => {
    if (room === undefined) {
      return
    }
    setMemberAmount(calcMemberAmount(room, amount))
    setIsEdit(true)
  }

  const submit = async () => {
    if (
      disabled ||
      room === undefined ||
      roomId === undefined ||
      eventId === undefined
    ) {
      return
    }
    try {
      const txns = room.members
        .map((member) => {
          const id = uuidv4()
          return {
            id,
            amount: Number(memberAmount[member.id]),
            payer: receiver,
            receiver: member.id,
          }
        })
        .filter((txn) => txn.amount > 0)
      const res = await apis.editEvent({
        roomId,
        eventId,
        eventRequestBody: {
          id: eventId,
          name,
          eventType: 'outer',
          eventAt: new Date(eventAt),
          amount: Number(amount),
          txns,
        },
      })
      const newRoom = { ...room }
      newRoom.events.push(res)
      await mutate(newRoom)

      navigate(`/group/${roomId}`)
    } catch (e) {
      console.error(JSON.stringify(e))
    }
  }

  const onChangeAmount = (e: ChangeEvent<HTMLInputElement>) => {
    if (room === undefined) return
    setAmount(e.target.value)
    setIsEdit(true)
    setMemberAmount(calcMemberAmount(room, e.target.value))
  }

  if (!roomId) {
    return <div>Room ID is not found</div>
  }
  if (!eventId) {
    return <div>Event ID is not found</div>
  }

  return (
    <>
      <PageContainer>
        <Header
          title="出費"
          left={
            <Link to={`/group/${roomId}`} className="text-[24px]">
              <MdArrowBackIosNew />
            </Link>
          }
          right={
            <RiDeleteBin6Line
              className="text-[32px] text-warning"
              onClick={() => {
                setShowDeleteModal(true)
              }}
            />
          }
        />
        <AnimateBody>
          <div className="flex flex-col items-center p-5 gap-6">
            <div className="form-control w-full flex flex-col gap-y-3">
              <Input
                title="項目名"
                type="text"
                value={name}
                onChange={(e) => {
                  setIsEdit(true)
                  setName(e.target.value)
                }}
              />
            </div>
            <div className="form-control w-full flex flex-col gap-y-3">
              <Input
                title="金額"
                type="number"
                value={amount}
                onChange={onChangeAmount}
              />
            </div>
            <div className="form-control w-full flex flex-col gap-y-3">
              <Input
                title="支払った日"
                type="date"
                value={eventAt}
                onChange={(e) => {
                  setIsEdit(true)
                  setEventAt(e.target.value)
                }}
              />
            </div>
            <div className="form-control w-full flex flex-col gap-y-3">
              <Select
                title="支払った人"
                value={receiver}
                options={room?.members ?? []}
                onChange={(e) => {
                  setIsEdit(true)
                  setReceiver(e.target.value)
                }}
              />
            </div>
            <div className="flex flex-col items-start w-full gap-4">
              <div className="flex flex-row w-full gap-4">
                <div className="flex flex-row flex-1 gap-2 items-center">
                  <div className="text-base font-bold">分配</div>
                  <Tag isOptional />
                </div>
                <div
                  className="flex flex-row gap-1 text-primary"
                  onClick={evenUp}
                >
                  <MdRestartAlt className="text-[24px]" />
                  <div className="text-base font-medium">均等にする</div>
                </div>
              </div>
              <div className="flex flex-col w-full gap-2">
                {room?.members.map((member) => (
                  <div
                    className="flex flex-row items-center gap-4"
                    key={member.id}
                  >
                    <div className="text-base flex-1 font-medium">
                      {member.name}
                    </div>
                    <div className="w-[120px]">
                      <Input
                        type="number"
                        value={memberAmount[member.id] ?? ''}
                        onChange={(e) => {
                          const newVal = { ...memberAmount }
                          newVal[member.id] = e.target.value
                          setMemberAmount(newVal)
                          setIsEdit(true)
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-row items-center w-full gap-4">
                <div className="flex flex-row items-center flex-1 gap-1">
                  <div className="text-base font-bold">合計</div>
                  {disabled && <MdError className="text-[20px] text-warning" />}
                </div>
                <div className="w-[120px]">
                  <Input
                    type="number"
                    value={amount}
                    onChange={(_e) => {}}
                    className={disabled ? 'outline-warning' : ''}
                    disabled
                  />
                </div>
              </div>
            </div>
            <div className="h-[138px]" />
          </div>
          <div className="flex flex-col items-center gap-3 w-full fixed bottom-0 px-5 pt-5 pb-10 bg-white shadow-[0_0_16px_rgba(0,0,0,0.1)]">
            {disabled && (
              <div className="text-xs font-bold text-warning">
                金額と合計が一致しません
              </div>
            )}
            <Button
              text={'保存する'}
              onClick={submit}
              disabled={disabled || !isEdit}
            />
          </div>
        </AnimateBody>
      </PageContainer>
      <Modal
        open={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false)
        }}
      >
        <div className="flex flex-col items-center w-full">
          <div className="text-lg font-bold mb-3">この出費を削除しますか？</div>
          <div className="text-sm mb-5">削除すると元には戻せません</div>
          <div className="flex flex-row gap-[17px] w-full">
            <Button
              text="削除"
              onClick={() => {
                navigate(`/group/${roomId}`)
              }}
              warn
            />
            <Button
              text="キャンセル"
              onClick={() => {
                setShowDeleteModal(false)
              }}
              white
            />
          </div>
        </div>
      </Modal>
    </>
  )
}

export default GroupEventEdit
