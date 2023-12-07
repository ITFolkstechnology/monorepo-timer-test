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
import { formatISO } from 'date-fns'
import React from 'react'
import { useStopwatch } from '../core/hooks/use-stopwatch'
import SyncIndicator, { SyncStatusType } from './components/sync-indicator'
import TimerDisplay from './components/timer-display'
import {
  useGetCurrentTime,
  useUpdateCurrentTime,
} from './services/timer-services'
import { TimerDataType } from './types'

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
  const [syncedDate, setSyncedDate] = React.useState<string>('')
  const PlayPauseIcon = isRunning ? PauseIcon : PlayIcon

  React.useEffect(() => {
    if (error) {
      setSyncState('error')
      return
    }
    if (!remoteData) return
    const localData = { time: currentTime, updatedAt: syncedDate }
    setSyncState(getSyncState({ localData, remoteData }))
  }, [syncedDate, isRefetching, remoteData, error])

  const handlePlayPause = () => {
    if (isRunning) {
      pause()
      refetch()
    } else play()
  }
  const handleReset = () => {
    reset()
    setSyncedDate('')
  }
  const handleRestart = () => {
    restart()
    refetch()
  }
  const handleSync = () => {
    if (syncState === 'receive' && typeof remoteData?.time === 'number') {
      setCurrentTime(remoteData.time)
      setSyncedDate(remoteData.updatedAt)
    }
    if (syncState === 'send') {
      const updatedAt = formatISO(new Date())
      mutate({ time: currentTime, updatedAt })
      setSyncedDate(updatedAt)
    }
    if (syncState === "error") {
      refetch()
      setSyncState("pending")
    }
  }

  return (
    <View className="flex-1 items-center justify-center p-8">
      <View>
        <SyncIndicator status={syncState} onPress={handleSync} />
      </View>
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
  localData?: TimerDataType
  remoteData?: TimerDataType
}) => SyncStatusType
const getSyncState: GetSyncStateType = ({ localData, remoteData }) => {
  if (localData && remoteData) {
    if (localData.updatedAt !== remoteData.updatedAt && localData.time === 0)
      return 'receive'
    if (localData.time !== remoteData.time) return 'send'
    return 'synced'
  }
  return 'error'
}
