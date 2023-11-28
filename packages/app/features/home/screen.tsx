import { Row } from 'app/design/layout';
import { View } from 'app/design/view';
import React from 'react';
import { Platform } from 'react-native';
import CommandButton from './components/command-button';
import SyncButton, { SyncValue } from './components/sync-button';
import TimerDisplay from './components/timer-display';
import { useFetchTime } from './hooks/use-get-time';
import { useUpdateTime } from './hooks/use-update-time';


export function HomeScreen() {
  const { data, status } = useFetchTime()
  const { mutate, isPending } = useUpdateTime()
  
  const [syncState, setSyncState] = React.useState<SyncValue>('ready')
  const [time, setTime] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(true)

  React.useEffect(() => {
    // Watch timer starts and pauses
    let intervalId;
    const now = new Date().getTime()
    const lastUpdate = data?.updatedAt || now
    const hasNewData = lastUpdate < now ? true : false
    if (!isPaused) {
      intervalId = setInterval(() => setTime(time + 1), 10);
    } 
    if (hasNewData && isPaused && time > 0) {
      setSyncState('send')
    }
    return () => clearInterval(intervalId);
  }, [time, isPaused]);

  React.useEffect(() => {
    // Watch data updates
    if (status === 'success') {
      const now = new Date().getTime()
      const lastUpdate = data?.updatedAt || now
      const hasNewData = lastUpdate > now ? true : false
      if (hasNewData) {
        setSyncState('get')
      }
    }
  }, [data])

  const sendNewData = () => {
    mutate(time)
    setSyncState('ready')
  }

    const getNewData = () => {
    setTime(data?.value || 0)
    setSyncState('ready')
  }

  const handleSyncTime = () => {
    switch (syncState) {
      case 'get':
        return getNewData()
      case 'send':
        return sendNewData()
      case 'ready':
      default:
        return
    }
  }

  const handleTimer = (command: string) => {
    switch (command) {
      case 'start':
        setIsPaused(false)
        break
      case 'pause':
        setIsPaused(true)
        break
      case 'forward':
        setTime(time + 30)
        break
      case 'backward':
        const decreaseTime = (time - 30) > 0 ? time - 30 : 0
        setTime(decreaseTime)
        break
      case 'reset':
        setIsPaused(true)
        setTime(0)
        break
      case 'refresh':
        setTime(0)
        setIsPaused(false)
        break
      default:
        break
    }
  }

  const baseContainerStyle = Platform.select({
    web: 'items-center justify-between',
    native: 'items-center justify-between'
  })

  const syncButtonStyle = Platform.select({
    web: 'w-6 self-end',
    native: 'self-end w-full'
  })

  const commandPanelStyle = Platform.select({
    web: 'gap-10',
    native: 'w-full justify-between px-4'
  })


  return (
    <View className={`flex-1 p-3 w-full h-full ${baseContainerStyle}`}>
      <SyncButton value={syncState} onClick={() => handleSyncTime()} className={syncButtonStyle} />
      <TimerDisplay value={time} />
      <Row className={commandPanelStyle}>
        <CommandButton type='refresh' className='w-8' onClick={handleTimer} />
        <Row>
            <CommandButton type='backward' className='w-12' onClick={handleTimer} />
            <CommandButton type='play/pause' className='w-14' isPaused={isPaused} onClick={handleTimer} />
            <CommandButton type='forward' className='w-12' onClick={handleTimer} />
        </Row>
        <CommandButton type='reset' className='w-10' onClick={handleTimer} />
      </Row>
    </View>
  )
}
