import { Text } from 'app/design/typography'
import React from 'react'

export interface TimerDisplayProps {
  value: number
}
const TimerDisplay: React.FC<TimerDisplayProps> = ({ value }) => {

  const toHoursAndMinutes = (totalSeconds) => {
  // get in https://www.codingbeautydev.com/blog/javascript-convert-seconds-to-hours-and-minutes
  const totalMinutes = Math.floor(totalSeconds / 60);

  const seconds = totalSeconds % 60;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const display = (value) => value < 10 && value >= 0 ? '0' + value : value

  return { h: display(hours), m: display(minutes), s: display(seconds) };
}
  return (
      <Text className='text-6xl'>{toHoursAndMinutes(value).h}:{toHoursAndMinutes(value).m}:{toHoursAndMinutes(value).s}</Text>

  )
}

export default TimerDisplay