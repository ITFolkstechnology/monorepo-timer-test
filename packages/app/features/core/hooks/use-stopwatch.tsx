import React from "react";

const REFRESH_RATE = 100

type UseStopwatchType = (params?: { initialValue?: number }) => {
  currentTime: number,
  isRunning: boolean,
  play: () => void,
  pause: () => void,
  reset: () => void,
  restart: () => void,
  forward: (ms?: number) => void,
  rewind: (ms?: number) => void 
}

export const useStopwatch: UseStopwatchType = (params) => {
  const initialValue = params?.initialValue || 0
  const [currentTime, setCurrentTime] = React.useState(initialValue);
  const [isRunning, setIsRunning] = React.useState(false);

  React.useEffect(() => {
    setCurrentTime(initialValue)
  }, [initialValue])
  React.useEffect(() => {
    if (!isRunning) return;
    const timeout = setInterval(() => {
      setCurrentTime(old => old + REFRESH_RATE)
    }, REFRESH_RATE)
    return () => clearInterval(timeout)
  }, [isRunning])

  const play = () => setIsRunning(true)
  const pause = () => setIsRunning(false)
  const restart = () => setCurrentTime(0)
  const reset = () => {
    setIsRunning(false)
    setCurrentTime(0)
  }
  const forward = (amount = 30000) => {
    setCurrentTime(currentTime + amount)
  }
  const rewind = (amount = 30000) => {
    const newValue = currentTime - amount
    setCurrentTime(newValue < 0 ? 0 : newValue)
  }

  return { currentTime, isRunning, play, pause, reset, restart, forward, rewind }
}
