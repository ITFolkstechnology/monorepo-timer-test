export const convertMsToSec = (ms: number) => Math.floor(ms / 1000)
export const convertMsToMin = (ms: number) => Math.floor(ms / (1000 * 60))
export const convertMsToHour = (ms: number) => Math.floor(ms / (1000 * 60 * 60))

export const convertMsToHrMinSec = (ms: number) => {
  if (ms <= 0) return ({ hours: 0, minutes: 0, seconds: 0 })

  return ({
    hours: convertMsToHour(ms),
    minutes: convertMsToMin(ms) % 60,
    seconds: convertMsToSec(ms) % 60,
  })
}