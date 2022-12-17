import useSWR from 'swr'

import { OncePay } from '/@/types/OncePay'

export const useOncePayStore = () => {
  const { data, mutate } = useSWR<OncePay[]>('oncePays', null, {
    fallbackData: [],
  })

  const addOncePay = async (oncePay: OncePay) => {
    // search for existing pay
    if ((data ?? []).find((p) => p.id === oncePay.id)) {
      return
    }
    const newData = [...(data ?? []), oncePay]
    await mutate(newData, false)
  }

  const updateOncePay = async (oncePay: OncePay) => {
    const newData = (data ?? []).map((p) =>
      p.id === oncePay.id ? oncePay : p
    )
    await mutate(newData, false)
  }

  const removeOncePay = async (oncePay: OncePay) => {
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
