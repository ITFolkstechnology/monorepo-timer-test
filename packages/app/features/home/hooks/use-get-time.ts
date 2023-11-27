import { useQuery } from "@tanstack/react-query";
import { TIMER_PATH, getTime } from "../actions";



export const useGetTime = () => {
  const timeFetch = {
    queryFn: () => getTime(),
    queryKey: [TIMER_PATH],
  };
  
  const { data, status, failureReason } = useQuery(timeFetch);

return { data, status}
}