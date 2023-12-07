import { IconButton } from 'app/design/buttons'
import {
  CheckCircleIcon,
  CloudArrowDownIcon,
  CloudArrowUpIcon,
  ExclamationCircleIcon,
} from 'app/design/icons'
import React from 'react'
import { ActivityIndicator } from 'react-native'

export type SyncStatusType = 'send' | 'receive' | 'synced' | 'error' | 'pending'

export interface SyncIndicatorProps {
  status: SyncStatusType
  onPress?: () => void
}
export const SyncIndicator: React.FC<SyncIndicatorProps> = ({
  status = 'error',
  onPress,
}) => {
  const Icon = getIcon(status)
  return (
    <IconButton
      icon={<Icon color="black" />}
      variant="ghost"
      onPress={onPress}
      disabled={!(status === 'receive' || status === 'send' || status === "error")}
    />
  )
}

export default SyncIndicator

const getIcon = (status: SyncStatusType) => {
  switch (status) {
    case 'pending':
      return ActivityIndicator
    case 'synced':
      return CheckCircleIcon
    case 'send':
      return CloudArrowUpIcon
    case 'receive':
      return CloudArrowDownIcon
    default:
      return ExclamationCircleIcon
  }
}
