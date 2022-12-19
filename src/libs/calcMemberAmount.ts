import { RoomDetails } from '/@/libs/apis'

export const calcMemberAmount = (room: RoomDetails, amount: string) => {
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
