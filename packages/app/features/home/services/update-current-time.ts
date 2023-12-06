import { api } from "app/features/core/api"
import { TimerDataType } from "../types"

type ParamsType = TimerDataType
type ResponseType = void
type ServiceType = (params: ParamsType) => Promise<ResponseType>

export const updateCurrentTime: ServiceType = async (params) => {
  try {
    await api.put<ResponseType>("currentTime", params)
  } catch (error) {
    throw console.log(error)
  }
}