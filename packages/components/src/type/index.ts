/*
 * @Description: 公用类型
 */
import {
  StyleProp,
  ViewStyle,
  GestureResponderEvent,
  ImageStyle,
  NativeSyntheticEvent,
  NativeScrollEvent,
  TextStyle,
} from 'react-native'

export type ViewStyleType = StyleProp<ViewStyle>
export type ImageStyleType = StyleProp<ImageStyle>
export type textStyleType = StyleProp<TextStyle>
export type onPressType = (event: GestureResponderEvent) => void
export type numberOrString = number | string
export type scrollEventType = NativeSyntheticEvent<NativeScrollEvent>
export type AnyCallbackType = (...args: any) => any
