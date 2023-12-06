import { api } from "app/features/core/api"
import { TimerDataType } from "../types"

type ParamsType = {}
type ResponseType = TimerDataType
type ServiceType = (params: ParamsType) => Promise<ResponseType>

export const getCurrentTime: ServiceType = async () => {
  try {
    const { data } = await api.get<ResponseType>("currentTime")
    return data
  } catch (error) {
    throw console.log(error)
  }
}