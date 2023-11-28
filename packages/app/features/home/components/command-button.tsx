import { CustomButton } from 'app/design/custom-button'
import { View } from 'app/design/view'
import React from 'react'
import { Platform } from 'react-native'
import { commandIconsImport } from '../helpers/icons-imports'

export type CommandType = 'start' | 'pause' | 'forward' | 'backward' | 'reset' | 'refresh'
export type ButtonType = 'play/pause' | 'forward' | 'backward' | 'reset' | 'refresh'

export interface CommandButtonProps {
  type: ButtonType
  isPaused?: boolean
  onClick: (command: CommandType) => void
  className?: string
}

const Icons = commandIconsImport()

 const commandButtonsStyle = Platform.select({
    web: 'h-full w-full',
    native: 'self-center w-full'
  })

const CommandButton: React.FC<CommandButtonProps> = ({ type, onClick, isPaused, className }) => {
  const Icon = () => {
    switch (type) {
      case 'play/pause':
        return isPaused ? <Icons.PlayCircleIcon size={60} color='black' className={commandButtonsStyle}/> : <Icons.PauseCircleIcon size={60} color='black'className={commandButtonsStyle}/>
      case 'forward':
        return <Icons.ForwardIcon size={48} color='black' className={commandButtonsStyle}/>
      case 'backward':
        return <Icons.BackwardIcon size={48} color='black' className={commandButtonsStyle}/>
      case 'reset':
        return <Icons.StopCircleIcon size={38} color='black' className={commandButtonsStyle}/>
      case 'refresh':
        return <Icons.ArrowPathIcon size={34} color='black' className={commandButtonsStyle}/>
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