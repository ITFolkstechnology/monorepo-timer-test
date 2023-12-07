import { classNameBuilder } from 'app/features/core/helpers/class-name-builder'
import { styled } from 'nativewind'
import React from 'react'
import { Platform, Pressable } from 'react-native'

type SizeType = '40' | '80'
type VariantType = 'outline' | 'ghost'

const StyledPressable = styled(Pressable)

export interface IconButtonProps {
  icon: JSX.Element
  size?: SizeType
  variant?: VariantType
  disabled?: boolean
  onPress?: () => void
  className?: string
  style?: any
}
export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  size = '40',
  variant = 'outline',
  disabled,
  onPress = () => null,
  style,
  className,
}) => {
  const buttonProps = Platform.select({
    web: { onClick: () => onPress(), disabled },
    default: { onPress: () => onPress(), disabled },
  })
  const ButtonComponent = Platform.OS === 'web' ? 'button' : StyledPressable

  return (
    <ButtonComponent
      className={classNameBuilder(
        'flex rounded-full items-center justify-center',
        sizeMap[size],
        baseVariantMap[variant],
        !disabled && enabledVariantMap[variant],
        className
      )}
      style={style}
      {...buttonProps}
    >
      {icon}
    </ButtonComponent>
  )
}

export default IconButton

const sizeMap: Record<SizeType, string> = {
  '40': 'h-10 w-10',
  '80': 'h-20 w-20',
}

const baseVariantMap: Record<VariantType, string> = {
  ghost: '',
  outline: 'border border-black',
}
const enabledVariantMap: Record<VariantType, string> = {
  ghost: 'hover:bg-black/10 active:bg-black/20',
  outline: 'border border-black',
}
