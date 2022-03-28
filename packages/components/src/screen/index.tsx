import * as React from 'react'
import {
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
  ScrollView,
  StatusBar,
  View,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { ScreenProps, ScrollScreenProps } from './screen.props'
import { isNonScrolling, offsets, presets } from './screen.presets'
import V from '../variable'

const isIos = Platform.OS === 'ios'
const keyboardAvoidingViewBehavior = isIos ? 'padding' : undefined

function BaseScreen(props: ScreenProps) {
  const {
    preset,
    backgroundColor,
    keyboardOffset = 'none',
    statusBar = 'light-content',
    // StatusBarBackgroundColor,
    children,
  } = props

  const outerStyle = presets[preset!].outer
  const backgroundStyle = backgroundColor ? { backgroundColor } : {}
  /**
   *  KeyboardAvoidingView：
   *  手机上弹出的键盘常常会挡住当前的视图。
   * 本组件可以自动根据键盘的高度，调整自身的 height 或底部的 padding，以避免被遮挡
   */
  return (
    <KeyboardAvoidingView
      style={[outerStyle, backgroundStyle]}
      behavior={keyboardAvoidingViewBehavior}
      keyboardVerticalOffset={offsets[keyboardOffset]}>
      <StatusBar
        // backgroundColor={StatusBarBackgroundColor}
        barStyle={statusBar}
      />
      {children}
    </KeyboardAvoidingView>
  )
}

function ScreenWithoutScrolling(props: ScreenProps) {
  const insets = useSafeAreaInsets()
  const preset = presets.fixed
  const style = props.style || {}

  const insetStyle = { paddingTop: props.unsafe ? 0 : insets.top }
  return (
    <BaseScreen
      preset="fixed"
      backgroundColor={props.backgroundColor}
      keyboardOffset={props.keyboardOffset}
      statusBar={props.statusBar}>
      <View style={[preset.inner, style, insetStyle]}>{props.children}</View>
    </BaseScreen>
  )
}

function ScreenWithScrolling(props: ScrollScreenProps) {
  const insets = useSafeAreaInsets()
  const preset = presets.scroll
  const {
    style,
    backgroundColor,
    unsafe,
    keyboardShouldPersistTaps,
    children,
    refreshing,
    onRefresh,
    ...res
  } = props
  const backgroundStyle = backgroundColor
    ? { backgroundColor: backgroundColor }
    : {}
  const insetStyle = { paddingTop: unsafe ? 0 : insets.top }

  return (
    <BaseScreen backgroundColor={backgroundColor} {...res}>
      <View style={[preset.outer, backgroundStyle, insetStyle]}>
        <ScrollView
          keyboardShouldPersistTaps={keyboardShouldPersistTaps}
          style={[preset.outer, backgroundStyle]}
          contentContainerStyle={[preset.inner, style]}
          refreshControl={
            <RefreshControl
              colors={[V.primaryColor]} //android
              titleColor={V.primaryColor}
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }>
          {children}
        </ScrollView>
      </View>
    </BaseScreen>
  )
}

/**
 * The starting component on every screen in the app.
 *
 * @param props The screen props
 */
export function Screen(props: ScreenProps): React.ReactElement
export function Screen(props: ScrollScreenProps): React.ReactElement
export default function Screen(props: ScreenProps | ScrollScreenProps) {
  if (isNonScrolling(props.preset)) {
    return <ScreenWithoutScrolling {...props} />
  } else {
    return <ScreenWithScrolling {...(props as ScrollScreenProps)} />
  }
}
