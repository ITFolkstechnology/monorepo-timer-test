import { api } from "app/features/core/api"

type ParamsType = {}
type ResponseType = { time: number }
type ServiceType = (params: ParamsType) => Promise<ResponseType>

export const getCurrentTime: ServiceType = async () => {
  try {
    const { data } = await api.get<ResponseType>("currentTime")
    return data
  } catch (error) {
    throw console.log(error)
  }
}