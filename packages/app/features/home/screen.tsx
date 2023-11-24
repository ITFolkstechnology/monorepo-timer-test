import { useQuery } from '@tanstack/react-query';
import { View } from 'app/design/view';
import { Platform } from 'react-native';
import { TIMER_PATH, getTime } from './actions';
import TimerDisplay from './components/timer-display';


export function HomeScreen() {
  const timeFetch = {
    queryFn: () => getTime(),
    queryKey: [TIMER_PATH],
  };

  const { data, status } = useQuery(timeFetch);

  setTimeout(() => console.log(status),1000)

  const baseContainerStyle = Platform.select({
    web: 'items-center justify-center',
    native: 'items-center justify-center'
  })

  return (
    <View className={`flex-1 p-3 w-full h-full max-w-lg ${baseContainerStyle}`}>
      <TimerDisplay value={data || 0} />   
    </View>
  )
}
