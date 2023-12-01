import React from "react";

const REFRESH_RATE = 100

export const useStopwatch = () => {
  const [currentTime, setCurrentTime] = React.useState(0);
  const [isRunning, setIsRunning] = React.useState(false);

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
  /**
   * @param amount - time amount in milliseconds
   */
  const forward = (amount = 30000) => {
    setCurrentTime(currentTime + amount)
  }
  /**
   * @param amount - time amount in milliseconds
   */
  const rewind = (amount = 30000) => {
    const newValue = currentTime - amount
    setCurrentTime(newValue < 0 ? 0 : newValue)
  }

  return { currentTime, play, pause, reset, restart, forward, rewind }
}
