import { Platform } from "react-native";

const platform = Platform

const isMobile = platform.OS === 'ios' || platform.OS === 'android'

export const commandIconsImport = () => {
  let Icons
  if (isMobile) {
    const { ArrowPathIcon, BackwardIcon, ForwardIcon, PauseCircleIcon, PlayCircleIcon, StopCircleIcon } = require('react-native-heroicons/outline');
    Icons = { ArrowPathIcon, BackwardIcon, ForwardIcon, PauseCircleIcon, PlayCircleIcon, StopCircleIcon }
  } else {
    const { ArrowPathIcon, BackwardIcon, ForwardIcon, PauseCircleIcon, PlayCircleIcon, StopCircleIcon } = require('@heroicons/react/24/outline');
    Icons = { ArrowPathIcon, BackwardIcon, ForwardIcon, PauseCircleIcon, PlayCircleIcon, StopCircleIcon }
  }
  return Icons
}

export const syncIconsImport = () => {
  let Icons
  if (isMobile) {
    const { CheckIcon, CloudArrowDownIcon, CloudArrowUpIcon, CloudIcon } = require('react-native-heroicons/outline');
    Icons = { CheckIcon, CloudArrowDownIcon, CloudArrowUpIcon, CloudIcon }
  } else {
    const { CheckIcon, CloudArrowDownIcon, CloudArrowUpIcon, CloudIcon } = require('@heroicons/react/24/outline');
    Icons = { CheckIcon, CloudArrowDownIcon, CloudArrowUpIcon, CloudIcon }
  }
  return Icons
}