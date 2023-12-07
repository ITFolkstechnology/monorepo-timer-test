import { Text } from 'app/design/typography';
import { convertMsToHrMinSec } from 'app/features/core/helpers/time-functions';
import React from 'react';

export interface TimerDisplayProps {
  timeInMilliseconds?: number
};
export const TimerDisplay: React.FC<TimerDisplayProps> = ({ timeInMilliseconds = 0 }) => {
  const { hours, minutes, seconds } = convertMsToHrMinSec(timeInMilliseconds)
  return (
    <Text className='text-5xl'>{
      [hours, minutes, seconds]
        .map(value => value.toLocaleString(undefined, { minimumIntegerDigits: 2 }))
        .join(":")
    }</Text>
  )
};

export default TimerDisplay;
