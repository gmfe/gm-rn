import React, { memo, useContext, useRef } from 'react'
import moment from 'moment'
import { View } from 'react-native'
import { DateStatus, DATE_FORMAT } from './constant'
import FlexView from '../flex_view'
import Day from './day'

import styles from './styles'
import { DateInfo } from './type'
import { MonthProps } from './type'
import { CalenderContext } from './context'

function Month({ month, year, isRange, disabledDate, isView }: MonthProps) {
  const { value: selected } = useContext(CalenderContext)
  const _allDate = useRef<DateInfo[] | null>(null)
  const _dayMaps = useRef<Record<string, DateInfo> | null>()

  if (!_allDate.current) {
    // 这个月的开始和结束日期
    let startDay = moment().year(year).month(month).date(1)
    const endDay = moment().year(year).month(month).date(1).add(1, 'month')
    const days = []
    _dayMaps.current = {}
    const emptyDays = Array(
      moment().year(year).month(month).date(1).day(),
    ).fill(0)

    while (endDay.isAfter(startDay, 'day')) {
      const date = startDay.format(DATE_FORMAT)

      const day: Partial<DateInfo> = {
        date,
        text: startDay.date().toString(),
      }

      // filter disabled
      // 日期不在range范围内，则disable
      if (disabledDate && disabledDate(startDay.toDate())) {
        day.disable = true
      }

      days.push(day)

      _dayMaps.current[date] = day as DateInfo

      startDay = startDay.add(1, 'day')
    }

    _allDate.current = [...emptyDays, ...days]
  }
  const dayMaps = _dayMaps.current!
  const newArr = _allDate.current
  const len = newArr.length
  if (!isView)
    return (
      <View
        style={[styles.monthContainer, { minHeight: Math.ceil(len / 7) * 38 }]}
      />
    )

  const row = []
  let start
  let end

  if (isRange && selected.length) {
    start = end = moment(selected[0]).startOf('day')
    if (selected.length === 2) {
      end = moment(selected[1]).startOf('day')
    }
  }
  for (let i = 0; i < len; i += 7) {
    const cell = []
    for (let j = i; j <= i + 6; j++) {
      if (j < len) {
        const date = newArr[j].date
        const disable = newArr[j].disable
        const _selected = selected.includes(date)

        const status = {
          selected: !!(date && _selected),
          innerSelected: false,
          disable,
          status: DateStatus.NOT_SELECT,
          index: j,
          isMonthEnd: j === len - 1,
        }

        if (start && end && date) {
          let _time = moment(date).startOf('day')
          if (_time.isAfter(start) && _time.isBefore(end)) {
            status.selected = status.innerSelected = true
            status.status = DateStatus.INNER
          }
          if (_time.isSame(start)) {
            status.selected = true
            status.status = DateStatus.RANGE_START
          }
          if (_time.isSame(end)) {
            status.selected = true
            status.status = DateStatus.RANGE_END
          }
          if (_time.isSame(start) && _time.isSame(end)) {
            status.status = DateStatus.SINGLE
          }
        }

        const dayInfo = {
          ...(dayMaps[date] || {}),
          ...status,
        }
        cell.push(<Day dayInfo={dayInfo} key={j} />)
      }
    }
    row.push(
      <FlexView row key={i}>
        {cell}
      </FlexView>,
    )
  }

  return <View style={[styles.monthContainer]}>{row}</View>
}

export default memo(Month)
