import { IconButton } from 'app/design/buttons'
import { ArrowPathIcon, BackwardIcon, ForwardIcon, PauseIcon, PlayIcon, StopIcon } from 'app/design/icons'
import { View } from 'app/design/view'
import { useStopwatch } from '../core/hooks/use-stopwatch'
import TimerDisplay from './components/timer-display'


export function HomeScreen() {
  const { currentTime, isRunning, play, pause, rewind, forward, restart, reset } = useStopwatch()
  const PlayPauseIcon = isRunning ? PauseIcon : PlayIcon
  return (
    <View className="flex-1 items-center justify-center p-8">
      <View className='flex-grow flex items-center justify-center'>
        <TimerDisplay timeInMilliseconds={currentTime} />
      </View>
      <View className='flex-row items-center mt-10 space-x-4'>
        <IconButton icon={<ArrowPathIcon color="black" />} onPress={restart} variant='ghost' />
        <IconButton icon={<BackwardIcon color="black" />} onPress={rewind} />
        <IconButton icon={<PlayPauseIcon color="black" height={32} width={32} />} onPress={isRunning ? pause : play} size='80' />
        <IconButton icon={<ForwardIcon color="black" />} onPress={forward} />
        <IconButton icon={<StopIcon color="black" />} onPress={reset} variant='ghost' />
      </View>
    </View>
  )
}
