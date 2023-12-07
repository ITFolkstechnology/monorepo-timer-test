import { IconButton } from 'app/design/buttons'
import {
  ArrowPathIcon,
  BackwardIcon,
  ForwardIcon,
  PauseIcon,
  PlayIcon,
  StopIcon,
} from 'app/design/icons'
import { View } from 'app/design/view'
import { isAfter, isBefore, isEqual } from 'date-fns'
import React from 'react'
import { useStopwatch } from '../core/hooks/use-stopwatch'
import SyncIndicator, { SyncStatusType } from './components/sync-indicator'
import TimerDisplay from './components/timer-display'
import {
  useGetCurrentTime,
  useUpdateCurrentTime,
} from './services/timer-services'

export function HomeScreen() {
  const { data: remoteData, isRefetching, refetch, error } = useGetCurrentTime()
  const { mutate } = useUpdateCurrentTime()
  const {
    currentTime,
    setCurrentTime,
    isRunning,
    play,
    pause,
    rewind,
    forward,
    restart,
    reset,
  } = useStopwatch()
  const [syncState, setSyncState] = React.useState<SyncStatusType>('pending')
  const [lastSyncDate, setLastSyncDate] = React.useState<Date | null>(null)
  const PlayPauseIcon = isRunning ? PauseIcon : PlayIcon

  React.useEffect(() => {
    if (error) {
      setSyncState('error')
      return
    }
    if (!remoteData) return
    setSyncState(
      getSyncState({
        localDate: lastSyncDate,
        remoteDate: remoteData.updatedAt,
      })
    )
  }, [lastSyncDate, isRefetching, remoteData, error])

  const handlePlayPause = () => {
    if (isRunning) {
      pause()
      refetch()
      setLastSyncDate(new Date())
    } else play()
  }
  const handleReset = () => {
    reset()
    setLastSyncDate(null)
  }
  const handleRestart = () => {
    restart()
    refetch()
  }
  const handleSync = () => {
    if (syncState === 'receive' && typeof remoteData?.time === 'number') {
      setCurrentTime(remoteData.time)
      if (remoteData.updatedAt) setLastSyncDate(remoteData.updatedAt)
    }
    if (syncState === 'send') {
      const updatedAt = new Date()
      mutate({ time: currentTime, updatedAt })
      setLastSyncDate(updatedAt)
    }
    if (syncState === 'error') {
      refetch()
      setSyncState('pending')
    }
  }

  return (
    <View className="flex-1 items-center justify-center p-8 pt-12">
      <SyncIndicator status={syncState} onPress={handleSync} />
      <View className="flex-grow flex items-center justify-center">
        <TimerDisplay timeInMilliseconds={currentTime} />
      </View>
      <View className="flex-row items-center mt-10 space-x-4">
        <IconButton
          icon={<ArrowPathIcon color="black" />}
          onPress={handleRestart}
          variant="ghost"
        />
        <IconButton icon={<BackwardIcon color="black" />} onPress={rewind} />
        <IconButton
          icon={<PlayPauseIcon color="black" height={32} width={32} />}
          onPress={handlePlayPause}
          size="80"
        />
        <IconButton icon={<ForwardIcon color="black" />} onPress={forward} />
        <IconButton
          icon={<StopIcon color="black" />}
          onPress={handleReset}
          variant="ghost"
        />
      </View>
    </View>
  )
}

type GetSyncStateType = (params: {
  localDate?: Date | null
  remoteDate?: Date
}) => SyncStatusType
const getSyncState: GetSyncStateType = ({ localDate, remoteDate }) => {
  console.log(localDate, remoteDate)
  if (!remoteDate || (localDate && isAfter(localDate, remoteDate)))
    return 'send'
  if (!localDate || isBefore(localDate, remoteDate)) return 'receive'
  if (isEqual(localDate, remoteDate)) return 'synced'
  return 'error'
}
