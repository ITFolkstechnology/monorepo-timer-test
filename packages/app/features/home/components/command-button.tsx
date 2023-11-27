import { ArrowPathIcon, BackwardIcon, ForwardIcon, PauseCircleIcon, PlayCircleIcon, StopCircleIcon } from '@heroicons/react/24/outline'
import { CustomButton } from 'app/design/custom-button'
import { View } from 'app/design/view'
import React from 'react'

export type CommandType = 'start' | 'pause' | 'forward' | 'backward' | 'reset' | 'refresh'
export type ButtonType = 'play/pause' | 'forward' | 'backward' | 'reset' | 'refresh'

export interface CommandButtonProps {
  type: ButtonType
  isPaused?: boolean
  onClick: (command: CommandType) => void
  className?: string
}
const CommandButton: React.FC<CommandButtonProps> = ({ type, onClick, isPaused, className }) => {
  const Icon = () => {
    switch (type) {
      case 'play/pause':
        return isPaused ? <PlayCircleIcon className='h-full w-full' /> : <PauseCircleIcon className='h-full w-full' />
      case 'forward':
        return <ForwardIcon className='h-full w-full' />
      case 'backward':
        return <BackwardIcon className='h-full w-full' />
      case 'reset':
        return <StopCircleIcon className='h-full w-full' />
      case 'refresh':
        return <ArrowPathIcon className='h-full w-full' />
      default:
        return
    }
  }
  const handleClick = (onClick: (command: CommandType) => void) => {
    switch (type) {
      case 'play/pause':
        return isPaused ? onClick('start') : onClick('pause')
      case 'forward':
      case 'backward':
      case 'reset':
      case 'refresh':
        return onClick(type)
      default:
        return
    }
  }
  return (
    <View className={`justify-center ${className}`}>
      <CustomButton onPress={() => handleClick(onClick)} >
        {Icon()}
      </CustomButton >
    </View>
  )
}

export default CommandButton