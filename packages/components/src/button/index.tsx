/*
 * @Description:
 */
import React, { FC } from 'react'
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  StyleProp,
  TextStyle,
  ActivityIndicator,
  GestureResponderEvent,
} from 'react-native'
import FlexView, { FlexViewProps } from '../flex_view'
import V from '../variable'
import { onPressType, ViewStyleType } from '../type'

export interface ButtonProps extends FlexViewProps {
  type?:
    | 'primary'
    | 'default'
    | 'link'
    | 'text'
    | 'warning'
    | 'secondary'
    | 'primaryBg'
    | 'defaultBg'
    | 'warningBg'
    | 'secondaryBg'
  textStyle?: StyleProp<TextStyle>
  containerStyle?: ViewStyleType
  bordered?: boolean
  mini?: boolean
  plain?: boolean
  circle?: boolean
  activeOpacity?: number
  onPress?: onPressType
  loading?: boolean
  // loading的时候是否隐藏文本
  loadingHideText?: boolean
  loadingColor?: string
  inText?: boolean
  disabled?: boolean
}
const Button: FC<ButtonProps> = ({
  type = 'default',
  activeOpacity = 0.9,
  bordered = true,
  loading,
  loadingHideText,
  loadingColor,
  onPress,
  children,
  style,
  textStyle,
  containerStyle,
  inText = true,
  circle = true,
  disabled,
  mini,
  ...res
}) => {
  function onTouchPress(e: GestureResponderEvent) {
    onPress && onPress(e)
  }

  function getLoadingColor(color?: string): string {
    if (color) {
      return color
    }

    const tempColorKey = type.includes('Bg')
      ? 'whiteColor'
      : (`${type}Color` as keyof typeof V)
    let tempLoadingColor = V[tempColorKey] as string
    if (type === 'defaultBg') {
      tempLoadingColor = '#7A7A7A'
    }
    return tempLoadingColor
  }
  const disabledButtonKey = `${type}Disabled` as keyof typeof ButtonStyles
  const disabledTextKey = `${type}Disabled` as keyof typeof ButtonTextStyles

  return (
    <TouchableOpacity
      activeOpacity={activeOpacity}
      disabled={disabled || loading}
      style={containerStyle}
      onPress={onTouchPress}>
      <FlexView
        row
        justifyCenter
        alignCenter
        borderRadius5={!circle}
        borderRadiusCircle={circle}
        paddingHorizontal16
        positionRelative
        border={bordered}
        {...res}
        style={[
          ButtonStyles.button,
          mini && ButtonStyles.mini,
          ButtonStyles[type],
          disabled && ButtonStyles.disabled,
          disabled && ButtonStyles[disabledButtonKey],
          style,
        ]}>
        {loading && (
          <ActivityIndicator
            color={getLoadingColor(loadingColor)}
            style={[loadingStyles.default]}
          />
        )}
        {inText ? (
          <Text
            style={[
              ButtonTextStyles[type],
              disabled && ButtonTextStyles[disabledTextKey],
              textStyle,
            ]}>
            {loading && loadingHideText ? null : children}
          </Text>
        ) : (
          children
        )}
      </FlexView>
    </TouchableOpacity>
  )
}
const ButtonStyles = StyleSheet.create({
  button: {
    height: 40,
    backgroundColor: V.whiteColor,
  },
  mini: {
    height: 34,
  },
  disabled: {
    opacity: 0.3,
  },
  default: {
    borderColor: V.borderColor,
  },
  defaultBg: {
    backgroundColor: V.bgDefault,
  },
  primary: {
    borderColor: V.primaryColor,
  },
  primaryBg: {
    backgroundColor: V.primaryColor,
  },
  link: {
    borderColor: V.primaryColor,
  },
  text: {
    borderWidth: 0,
  },
  warning: {
    borderColor: V.warningColor,
  },
  warningBg: {
    backgroundColor: V.warningColor,
  },
  secondary: {
    borderColor: V.secondaryColor,
  },
  secondaryBg: {
    backgroundColor: V.secondaryColor,
  },
})

const ButtonTextStyles = StyleSheet.create({
  primary: {
    color: V.primaryColor,
  },
  primaryBg: {
    color: V.whiteColor,
  },
  default: {
    color: 'rgba(0,0,0,.8)',
  },
  defaultBg: {
    color: '#7A7A7A',
  },
  link: {
    color: V.primaryColor,
  },
  text: {
    color: 'rgba(0,0,0,.8)',
  },
  warning: {
    color: V.warningColor,
  },
  warningBg: {
    color: V.whiteColor,
  },
  secondary: {
    color: V.secondaryColor,
  },
  secondaryBg: {
    color: V.whiteColor,
  },
})
const loadingStyles = StyleSheet.create({
  default: {
    marginRight: 4,
    width: 20,
    height: 20,
  },
})

export default Button
