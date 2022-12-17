import { Member } from '/@/libs/apis'

export const toName = (members: Member[], id: string) => {
  const member = members.find((m) => m.id === id)
  return member ? member.name : ''
}
