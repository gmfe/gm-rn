import React, { useMemo, useState } from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native'
import FlexView from '../flex_view'
import Icon from '../icon'
import S from '../styles'
import V from '../variable'

import { CascaderOption, CascaderProps, SelectedBarProps } from './type'
import SelectedBar from './selected_bar'
import { numberOrString } from '../type'

const ALL = '$$CascaderAll'
const LEAF_ITEM = {
  label: '请选择',
  value: ALL,
} as CascaderOption

const All_ITEM = {
  label: '全部',
  value: ALL,
} as CascaderOption
export function Cascader<T extends numberOrString = string>({
  options = [],
  onChange = console.log,
  onClose,
  defaultValue = [],
  all,
  allText,
}: CascaderProps<T>) {
  const [selected, setSelected] = useState<SelectedBarProps<T>['selected']>(
    initSelected,
  )
  const values = useMemo(() => {
    return selected.map((item) => item.value)
  }, [selected])
  const [data, setData] = useState(initData)
  const [tabIndex, setTabIndex] = useState(
    selected.length ? selected.length - 1 : 0,
  )
  function initSelected() {
    if (!defaultValue.length)
      return [{ ...(LEAF_ITEM as any), children: options }]
    const newSelected: SelectedBarProps<T>['selected'] = []
    let tempData = options
    for (const v of defaultValue) {
      const item = tempData.find((item) => item.value === v)
      if (item) {
        const originChildren = item.children
        newSelected.push({ ...item, children: tempData })
        if (originChildren?.length) {
          tempData = originChildren
        } else {
          break
        }
      }
    }
    return newSelected
  }

  function initData() {
    if (selected.length < 2) return options
    return selected[selected.length - 1].children!
  }
  const onReselect = (newData: CascaderOption<T>[], index: number) => {
    setTabIndex(index)
    setData(newData)
  }
  const newData = useMemo(() => {
    if (all === undefined) return data
    if (all === true)
      return [
        ({
          ...All_ITEM,
          label: allText ?? All_ITEM.label,
        } as unknown) as CascaderOption<T>,
        ...data,
      ]
    return data
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, all, allText])
  return (
    <View style={[S.overflowScroll]}>
      <SelectedBar
        selected={selected}
        onTabChange={onReselect}
        onClose={onClose}
        tabIndex={tabIndex}
      />
      <FlatList
        data={newData}
        keyExtractor={(item) => `${item.value}`}
        renderItem={({ item }) => {
          const { label, value } = item
          const isAll = value === ALL
          const isLeaf = item.isLeaf || !item.children?.length
          return (
            <TouchableOpacity
              key={value}
              activeOpacity={1}
              onPress={() => {
                if (isAll || isLeaf) {
                  if (onChange) {
                    const allSelected = [...selected.slice(0, tabIndex)]
                    if (!isAll) allSelected.push(item)
                    const allSelectedValue = allSelected.map(
                      (item) => item.value,
                    )
                    onChange(allSelectedValue, allSelected)
                  }
                } else {
                  setSelected([
                    ...selected.slice(0, tabIndex),
                    { ...item, children: data },
                    { ...LEAF_ITEM, children: item.children } as any,
                  ])
                  setTabIndex(tabIndex + 1)
                  item.children?.length && setData(item.children!)
                }
              }}>
              <FlexView
                row
                justifyBetween
                alignCenter
                style={[styles.item, S.borderTop]}>
                <Text style={[values.includes(value) && S.textPrimary]}>
                  {label}
                </Text>
                {!isLeaf && (
                  <Icon name="rn-pda-enter" color={V.borderColor} size={24} />
                )}
              </FlexView>
            </TouchableOpacity>
          )
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  item: {
    height: 47,
    paddingHorizontal: 14,
  },
})
