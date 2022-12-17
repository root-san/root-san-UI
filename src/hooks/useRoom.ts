import useSWR from 'swr'
import apis, { RequiredError, RoomDetails } from '/@/libs/apis'

export const useRoom = (roomId: string | undefined) => {
  const fetcher = ([_, roomId]: string[]) => apis.getRoom({ roomId })
  const { data, mutate, error } = useSWR<RoomDetails, RequiredError>(
    ['/rooms/', roomId],
    fetcher,
    {
      refreshInterval: 30000,
    }
  )

  return {
    room: data,
    mutate,
    isLoading: !(error || data),
    isError: error,
  }
}
