import { useQuery } from "@tanstack/react-query";
import { TIMER_PATH, fetchTime } from "../actions";



export const useFetchTime = () => {
  const timeFetch = {
    queryFn: () => fetchTime(),
    queryKey: [TIMER_PATH],
  };
  
  const { data, status, failureReason, error  } = useQuery(timeFetch);
  console.log({ failureReason })

return { data, status}
}