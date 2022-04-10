import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import FlexView from '../flex_view'
import Icon from '../icon'
import S from '../styles'
import { numberOrString } from '../type'
import V from '../variable'
import { CascaderOption, SelectedBarProps } from './type'

function SelectedBar<T extends numberOrString = string>({
  selected,
  tabIndex,
  onTabChange,
  onClose,
}: SelectedBarProps<T>) {
  return (
    <FlexView
      row
      alignCenter
      justifyBetween
      style={[styles.selectedBarContainer]}>
      <FlexView row height100>
        {selected.map((item, index, self) => {
          const isLast = index === self.length - 1
          return (
            <TouchableOpacity
              activeOpacity={1}
              key={item.value}
              style={[
                styles.selectedBarItem,
                S.row,
                S.justifyCenter,
                S.alignCenter,
                S.height100,
                index === tabIndex && styles.borderSelected,
              ]}
              onPress={() => {
                if (!selected.length) return
                onTabChange(
                  selected[index].children as CascaderOption<T>[],
                  index,
                )
              }}>
              <Text
                style={[
                  index === tabIndex ? S.textPrimary : S.textBlack,
                  S.text16,
                ]}>
                {isLast ? '请选择' : item.label}
              </Text>
            </TouchableOpacity>
          )
        })}
      </FlexView>
      {onClose && (
        <Icon
          name="rn-pda-close"
          onPress={onClose}
          style={[S.paddingVertical12, styles.close]}
        />
      )}
    </FlexView>
  )
}

const styles = StyleSheet.create({
  selectedBarContainer: {
    height: 47,
    paddingLeft: 14,
  },
  selectedBarItem: {
    marginRight: 21,
  },
  borderSelected: {
    borderBottomColor: V.primaryColor,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  close: {
    paddingHorizontal: 14,
  },
})

export default SelectedBar
