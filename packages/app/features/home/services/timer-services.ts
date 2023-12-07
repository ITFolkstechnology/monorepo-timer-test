import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from 'app/features/core/api'
import { TimerDataType } from '../types'

export const TIMER_QUERY_KEY = ['currentTime']

type GetCurrentTimeType = () => Promise<TimerDataType>
export const getCurrentTime: GetCurrentTimeType = async () => {
  try {
    const { data } = await api.get<TimerDataType>('currentTime')
    return data
  } catch (error) {
    console.log(error)
    throw error
  }
}
export const useGetCurrentTime = () =>
  useQuery({
    queryKey: TIMER_QUERY_KEY,
    queryFn: getCurrentTime,
  })

type UpdateCurrentTimeType = (params: TimerDataType) => Promise<void>
export const updateCurrentTime: UpdateCurrentTimeType = async (params) => {
  try {
    await api.put<ResponseType>('currentTime', params)
  } catch (error) {
    console.log(error)
    throw error
  }
}
export const useUpdateCurrentTime = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: updateCurrentTime,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: TIMER_QUERY_KEY }),
  })
}
