import useSWR from 'swr'

import { OncePayData } from '/@/types/OncePayData'

export const useOncePayStore = () => {
  const { data, mutate } = useSWR<OncePayData[]>('oncePays', null, {
    fallbackData: [],
  })

  const addOncePay = async (oncePay: OncePayData) => {
    // search for existing pay
    if ((data ?? []).find((p) => p.id === oncePay.id)) {
      return
    }
    const newData = [...(data ?? []), oncePay]
    await mutate(newData, false)
  }

  const updateOncePay = async (oncePay: OncePayData) => {
    const newData = (data ?? []).map((p) =>
      p.id === oncePay.id ? oncePay : p
    )
    await mutate(newData, false)
  }

  const removeOncePay = async (oncePay: OncePayData) => {
    const newData = (data ?? []).filter((p) => p.id !== oncePay.id)
    await mutate(newData, false)
  }

  const deleteAllOncePay = async () => {
    await mutate([], false)
  }

  return {
    addOncePay,
    updateOncePay,
    removeOncePay,
    deleteAllOncePay,
    data,
  }
}
