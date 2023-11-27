import { CheckIcon, CloudArrowDownIcon, CloudArrowUpIcon, CloudIcon } from '@heroicons/react/24/outline'
import { CustomButton } from 'app/design/custom-button'
import { Row } from 'app/design/layout'
import { View } from 'app/design/view'
import React from 'react'

export type SyncValue = 'send' | 'get' | 'ready'
export interface SyncButtonProps {
  value: SyncValue
  onClick: () => void
  className?: string
}
const SyncButton: React.FC<SyncButtonProps> = ({
  value, onClick, className
}) => {
  const ReadyIcon = <Row className='relative'><CloudIcon className='h-full w-full' /><CheckIcon className='left-[6px] top-[6px] absolute w-3' /></Row>
  const Icon = () => {
    switch (value) {
      case 'send':
        return <CloudArrowUpIcon className='h-full w-full' />
      case 'get':
        return <CloudArrowDownIcon className='h-full w-full' />
      case 'ready':
        return ReadyIcon
      default:
        return
    }
  } 
  return (
    <View className={`justify-center ${className}`}>
      <CustomButton onPress={() => onClick()} >
        {Icon()}
      </CustomButton >
    </View>
  )
}

export default SyncButton