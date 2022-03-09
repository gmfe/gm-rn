import React, { ReactElement, useMemo, useRef, useState } from 'react'
import { Text, View, FlatList } from 'react-native'

import moment, { MomentInput } from 'moment'
import styles from './styles'
import Month from './month'
import { SingleCalandarProps, MonthItem, RangeCalandarProps } from './type'
import S from '../styles'
import { DATE_FORMAT } from './constant'
import FlexView from '../flex_view'

const defaultValue = [
  moment().startOf('day').valueOf(),
  moment().endOf('day').valueOf(),
]

export function Calendar(props: RangeCalandarProps): ReactElement
export function Calendar(props: SingleCalandarProps): ReactElement
export function Calendar(props: RangeCalandarProps | SingleCalandarProps) {
  const {
    type,
    value = defaultValue,
    min = value[0],
    max = value[1],
    initialNumToRender = 2,
    onChange,
  } = props

  const [innerValue, setInnerValue] = useState(initValue)
  const valueRef = useRef<string[]>(innerValue)
  valueRef.current = innerValue

  const [dataSource, initialScrollIndex] = useMemo(() => {
    const selectedMonthIndex = moment(
      valueRef.current[valueRef.current.length - 1],
    ).month()
    let startDate = moment(min)
    const endDate = moment(max)
    const data = []
    while (endDate.isSameOrAfter(startDate, 'day')) {
      const year = startDate.year()
      const month = startDate.month()
      data.push({ year, month, key: `${year}${month}` })
      startDate = startDate.add(1, 'month')
    }
    const targetIndex = data.findIndex(
      (item) => item.month === selectedMonthIndex,
    )
    return [data, targetIndex]
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function initValue() {
    let newValue = value as MomentInput[]
    if (type === 'single') newValue = [value] as MomentInput[]
    return newValue!.map((item) => moment(item).format(DATE_FORMAT))
  }

  function _renderSectionHeader({ year, month }: MonthItem) {
    return (
      <View style={styles.monthHeader}>
        <Text>{`${year}年 ${month + 1}月`}</Text>
      </View>
    )
  }

  function _renderHeader() {
    const WEEKS = ['日', '一', '二', '三', '四', '五', '六']
    const headerItem = WEEKS.map((item, i) => {
      // 是否是一行中的第一个和最后一个
      const isRowFirstOrLast = [0, WEEKS.length - 1].includes(i)
      return (
        <FlexView flex alignCenter key={i}>
          <Text style={[isRowFirstOrLast && S.textDesc, S.text12]}>{item}</Text>
        </FlexView>
      )
    })

    return (
      <FlexView row justifyBetween style={styles.weekHeader}>
        {headerItem}
      </FlexView>
    )
  }

  function _onPress(date: string) {
    let newInnerValue = [...valueRef.current]

    if (type === 'range') {
      if (newInnerValue.length === 1) {
        if (moment(date).isAfter(moment(newInnerValue[0]))) {
          newInnerValue.push(date)
        } else {
          newInnerValue.unshift(date)
        }
      } else if (newInnerValue.length === 2) {
        newInnerValue = [date]
      }
      // 范围选择
      if (newInnerValue.length) {
        const [start, end] = [
          moment(newInnerValue[0]).startOf('day'),
          moment(newInnerValue[1] || newInnerValue[0]).endOf('day'),
        ]
        onChange && onChange([start.valueOf(), end.valueOf()], [start, end])
      }
    } else {
      // 单选
      const singleDate = moment(date)
      onChange && onChange(singleDate.valueOf(), singleDate)
    }

    setInnerValue(newInnerValue)
  }
  return (
    <View style={[styles.container]}>
      {(props.renderHeader && props.renderHeader()) || _renderHeader()}
      <FlatList
        initialScrollIndex={initialScrollIndex}
        data={dataSource}
        initialNumToRender={initialNumToRender}
        renderItem={({ item, index }) => {
          return (
            <View key={index}>
              {(props.renderMonthHeader && props.renderMonthHeader(item)) ||
                _renderSectionHeader(item)}
              <Month
                {...props}
                isRange={type === 'range'}
                selected={innerValue}
                onPress={_onPress}
                {...item}
              />
            </View>
          )
        }}
      />
    </View>
  )
}
