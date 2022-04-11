import React, { FC } from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import FlexView from '../flex_view'
import Icon from '../icon'
import S from '../styles'
import { transformSize } from '../global_constant'
import { textStyleType, ViewStyleType, numberOrString } from '../type'
import { defaultDigitalKeys, defaultActionKeys, ActionKey } from './const'

export interface KeyboardProps {
  value?: numberOrString
  onChange?(value: string): void
  /** 点击确定的回调 */
  onConfirm?(value: string): void
  /** 小数位精度，默认最长4位 */
  precision?: number
  /** 最长多少位字符，默认14 */
  maxLen?: number
}

export const Keyboard: FC<KeyboardProps> = ({
  value,
  onChange,
  onConfirm,
  precision = 4,
  maxLen = 14,
}) => {
  function onPress(label: string) {
    let newValue = value?.toString() || ''
    switch (label) {
      case ActionKey.BACK:
        if (newValue === '') return
        newValue = newValue.slice(0, newValue.length - 1)
        break
      case ActionKey.RESET:
        newValue = '0'
        break
      case ActionKey.CONFIRM:
        onConfirm && onConfirm(newValue)
        return
      default:
        if (label === '.') {
          if (newValue.includes('.')) return
        }
        if (newValue === '0') {
          if (label === newValue) return
          newValue = ''
        }
        newValue += label
        if (newValue === '.') newValue = '0.'
        const decimal = newValue.split('.')[1] || ''
        if (decimal.length > precision) return
        break
    }
    if (newValue.length > maxLen) return
    onChange && onChange(newValue)
  }
  return (
    <FlexView row paddingHorizontal8 marginBottom4 justifyCenter bgDefault>
      <FlexView>
        {defaultDigitalKeys.map((row, index) => {
          return (
            <FlexView row flex key={index}>
              {row.map((item) => {
                const newItem = (typeof item === 'string'
                  ? { label: item }
                  : item) as KeyboardItemProps
                return (
                  <KeyboardItem
                    {...newItem}
                    key={newItem.label}
                    style={[newItem.style, S.marginRight8]}
                    fn={onPress.bind(null, newItem.label!)}
                  />
                )
              })}
            </FlexView>
          )
        })}
      </FlexView>
      <FlexView>
        {defaultActionKeys.map((item) => {
          const newItem = ((typeof item === 'string'
            ? { label: item }
            : item) as unknown) as KeyboardItemProps & { key: ActionKey }
          return (
            <KeyboardItem
              {...newItem}
              style={[item.style]}
              fn={onPress.bind(null, newItem.key)}
            />
          )
        })}
      </FlexView>
    </FlexView>
  )
}

interface KeyboardItemProps {
  label?: string
  icon?: boolean
  style?: ViewStyleType
  textStyle?: textStyleType
  fn(): void
}
const KeyboardItem = ({
  label,
  icon,
  style,
  textStyle,
  fn,
}: KeyboardItemProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={[
        S.row,
        S.justifyCenter,
        S.alignCenter,
        S.bgWhite,
        S.borderRadius5,
        KeyboardStyle.itemStyle,
        style,
      ]}
      onPress={fn}>
      <Text style={[S.text24, KeyboardStyle.textStyle, textStyle]}>
        {/* @ts-ignore */}
        {icon ? <Icon name={icon} size={21} /> : label}
      </Text>
    </TouchableOpacity>
  )
}

const KeyboardStyle = StyleSheet.create({
  itemStyle: {
    width: transformSize(81),
    height: transformSize(42),
    marginBottom: transformSize(6),
  },
  textStyle: {
    fontWeight: '500',
  },
})
