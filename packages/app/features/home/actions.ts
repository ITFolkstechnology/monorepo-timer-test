import { api } from "app/libraries/axios";

export const TIMER_PATH = "timer";

export const getTime = async (): Promise<number> => {
  try {
    const { data } = await api.get(TIMER_PATH);

    return data[0];
  } catch (error) {
    throw error;
  }
};