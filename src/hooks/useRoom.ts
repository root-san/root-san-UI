import useSWR from 'swr'
import apis, { RequiredError, RoomDetails } from '/@/libs/apis'

export const useRoom = (roomId: string) => {
  const fetcher = ([_, roomId]: string[]) => apis.getRoom({ roomId })
  const { data, error } = useSWR<RoomDetails, RequiredError>(
    ['/rooms/', roomId],
    fetcher,
    {
      refreshInterval: 30000,
    }
  )

  return {
    room: data,
    isLoading: !(error || data),
    isError: error,
  }
}