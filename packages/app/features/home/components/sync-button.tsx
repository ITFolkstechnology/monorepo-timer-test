import { CustomButton } from 'app/design/custom-button'
import { Row } from 'app/design/layout'
import { View } from 'app/design/view'
import React from 'react'
import { syncIconsImport } from '../helpers/icons-imports'

export type SyncValue = 'send' | 'get' | 'ready'
export interface SyncButtonProps {
  value: SyncValue
  onClick: () => void
  className?: string
}

const Icons = syncIconsImport()

const SyncButton: React.FC<SyncButtonProps> = ({
  value, onClick, className
}) => {
  const ReadyIcon = <Row className='relative'><Icons.CloudIcon size={48} color='black' className='h-full w-full' /><Icons.CheckIcon size={36} color='black' className='left-[6px] top-[6px] absolute w-3' /></Row>
  const Icon = () => {
    switch (value) {
      case 'send':
        return <Icons.CloudArrowUpIcon size={48} color='black' className='h-full w-full' />
      case 'get':
        return <Icons.CloudArrowDownIcon size={48} color='black' className='h-full w-full' />
      case 'ready':
        return ReadyIcon
      default:
        return
    }
  } 
  return (
    <View className={`self-end mt-4 mr-4 ${className}`}>
      <CustomButton onPress={() => onClick()} >
        {Icon()}
      </CustomButton >
    </View>
  )
}

export default SyncButton