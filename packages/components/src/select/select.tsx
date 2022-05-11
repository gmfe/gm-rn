import React, { useMemo } from 'react'
import {
  ListRenderItem,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native'
import S from '../styles'
import { numberOrString, ViewStyleType } from '../type'

interface SelectItem<T extends numberOrString = string> {
  label: string
  value: T
  selected?: boolean
  onChange?(): void
  itemCenter?: boolean
}

export type SelectItemData<T extends numberOrString = string> = Omit<
  SelectItem<T>,
  'selected'
>

export interface SelectProps<T extends numberOrString = string> {
  data: SelectItemData<T>[]
  value?: T
  defaultValue?: T
  itemCenter?: boolean
  /** 是否第一项要默认添加上【全部】选项 */
  all?: boolean | { label?: string }
  allText?: string
  style?: ViewStyleType
  onChange?(value: T, item: SelectItemData<T>): void
  filter?(item: SelectItemData<T>): boolean
}

const All_ITEM = {
  value: 'all',
  label: '全部',
}

export function Select<T extends numberOrString = string>({
  data,
  value = 'all' as T,
  all,
  style,
  itemCenter,
  filter,
  onChange,
}: SelectProps<T>) {
  const renderItem: ListRenderItem<SelectItem<T>> = ({ item }) => {
    if (filter && filter(item)) return null
    const isSelect = item.value === value
    return (
      <SelectItem
        itemCenter={itemCenter}
        {...item}
        selected={isSelect}
        onChange={onChange?.bind(null, item.value, item)}
      />
    )
  }
  const newData = useMemo(() => {
    if (all)
      return [
        {
          ...All_ITEM,
          label: typeof all === 'boolean' ? All_ITEM.label : all.label,
        },
        ...data,
      ] as SelectItem<T>[]
    return data
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, all])
  return (
    <FlatList
      data={newData}
      keyExtractor={(item) => `${item.value}`}
      renderItem={renderItem}
      style={style}
    />
  )
}

export function SelectItem<T extends numberOrString = string>({
  label,
  selected,
  itemCenter,
  onChange,
}: SelectItem<T>) {
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => onChange && onChange()}
      style={[
        S.flex,
        S.row,
        S.alignCenter,
        S.borderBottom,
        S.bgWhite,
        itemCenter && S.justifyCenter,
        styles.item,
      ]}>
      <Text style={[selected ? S.textPrimary : S.textBlack, styles.size]}>
        {label}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  item: {
    height: 47,
    paddingHorizontal: 14,
  },
  size: {
    fontSize: 15,
  },
})
