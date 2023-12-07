import { differenceInMilliseconds } from 'date-fns'
import React from 'react'

const REFRESH_RATE = 100

type UseStopwatchType = (params?: {}) => {
  currentTime: number
  isRunning: boolean
  setCurrentTime: (value: number) => void
  play: () => void
  pause: () => void
  reset: () => void
  restart: () => void
  forward: (ms?: number) => void
  rewind: (ms?: number) => void
}

export const useStopwatch: UseStopwatchType = () => {
  const [currentTime, setCurrentTime] = React.useState(0)
  const [lastStartDate, setLastStartDate] = React.useState<Date | null>(null)

  const calcElapsedTime = (startDate: Date) =>
    differenceInMilliseconds(new Date(), startDate)

  React.useEffect(() => {
    if (!lastStartDate) return
    const timeout = setInterval(() => {
      setCurrentTime(currentTime + calcElapsedTime(lastStartDate))
    }, REFRESH_RATE)
    return () => clearInterval(timeout)
  }, [lastStartDate])

  const play = () => setLastStartDate(new Date())
  const pause = () => setLastStartDate(null)
  const restart = () => {
    if (lastStartDate) setLastStartDate(new Date())
    setCurrentTime(0)
  }
  const reset = () => {
    setLastStartDate(null)
    setCurrentTime(0)
  }
  const forward = (amount = 30000) => {
    setCurrentTime(currentTime + amount)
    setLastStartDate(new Date())
  }
  const rewind = (amount = 30000) => {
    const newValue = currentTime - amount
    setCurrentTime(newValue < 0 ? 0 : newValue)
    setLastStartDate(new Date())
  }

  return {
    currentTime,
    setCurrentTime,
    isRunning: !!lastStartDate,
    play,
    pause,
    reset,
    restart,
    forward,
    rewind,
  }
}
