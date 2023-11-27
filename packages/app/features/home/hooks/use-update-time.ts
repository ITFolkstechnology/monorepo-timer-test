import { useMutation } from "@tanstack/react-query";
import { updateTime } from "../actions";



export const useUpdateTime = () => {
  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: updateTime,
    onError: (error) => console.log(error),
  });
  

  return { mutate, isPending, isSuccess }
}