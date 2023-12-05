import { classNameBuilder } from 'app/features/core/helpers/class-name-builder';
import React from 'react';
import { Platform, Pressable } from 'react-native';

type SizeType = "40"
type VariantType = "outline" | "ghost"

export interface IconButtonProps {
  icon: JSX.Element
  size?: SizeType
  variant?: VariantType
  onPress?: () => void
};
export const IconButton: React.FC<IconButtonProps> = ({icon, size = "40", variant = "outline", onPress = () => null}) => {
  const buttonProps = Platform.select({
    web: { onClick: onPress },
    default: { onPress },
  })
  const ButtonComponent = Platform.OS === "web" ? "button" : Pressable

  return (
    <ButtonComponent className={classNameBuilder('flex rounded-full items-center justify-center', sizeMap[size], variantMap[variant])} {...buttonProps}>
      {icon}
    </ButtonComponent>
  )
};

export default IconButton;

const sizeMap: Record<SizeType, string> = {
  "40": "h-10 w-10"
}

const variantMap: Record<VariantType, string> = {
  ghost: "",
  outline: "hover:bg-black/20 active:bg-black/30 border border-black"
}
