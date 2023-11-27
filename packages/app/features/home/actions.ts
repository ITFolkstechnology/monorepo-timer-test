import { api } from "app/libraries/axios";

export type TimeRegistryType = { id: number, value: number, updatedAt: number}
export const TIMER_PATH = "timer";

export const getTime = async (): Promise<TimeRegistryType> => {
  try {
    const { data } = await api.get(TIMER_PATH);

    return data[0];
  } catch (error) {
    throw error;
  }
};

export const updateTime = async (time: number): Promise<TimeRegistryType> => {
  try {
    console.log({time})
    const { data } = await api.put(`${TIMER_PATH}/1`, {
      "value": time,
      "id": 1,
      "updatedAt": new Date().getTime()
    });

    return data;
  } catch (error) {
    throw error;
  }
};

