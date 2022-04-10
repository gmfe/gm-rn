import React, { useState, useRef } from 'react'
import moment from 'moment'

import {
  Screen,
  Button,
  Popup,
  S,
  Calendar,
} from '../../packages/components/src'
function CalendarDemo() {
  const [dateRange, setDateRange] = useState('')
  const dateRangeRef = useRef('')
  const [singleDate, setSingleDate] = useState('')
  const singleDateRef = useRef('')
  return (
    <Screen>
      <Button
        style={S.marginTop8}
        type={'default'}
        onPress={() => {
          Popup.render({
            position: 'bottom',
            title: '选择日期',
            children: (
              <Calendar
                onChange={(_, [start, end]) => {
                  dateRangeRef.current = `${start.format('MM-DD')}~${end.format(
                    'MM-DD',
                  )}`
                  console.log(dateRangeRef.current)
                }}
                min={moment().add(-90, 'day')}
                max={moment().add(90, 'day')}
                value={[moment().add(15, 'day'), moment().add(30, 'day')]}
                type="range"
              />
            ),
            style: {
              height: '50%',
            },
            onOk() {
              setDateRange(dateRangeRef.current)
              Popup.hide()
            },
          }).catch(() => {
            console.log('关闭啦')
          })
        }}>
        选择日期范围为：{dateRange}
      </Button>
      <Button
        style={S.marginTop8}
        type={'default'}
        onPress={() => {
          Popup.render({
            position: 'bottom',
            title: '选择日期',
            children: (
              <Calendar
                onChange={(_, selected) => {
                  singleDateRef.current = `${selected.format('MM-DD')}`
                }}
                min={moment().add(-90, 'day')}
                max={moment().add(90, 'day')}
                value={[moment().add(15, 'day'), moment().add(30, 'day')]}
                disabledDate={(date) => {
                  return moment(date) > moment().add(10, 'day')
                }}
                type="single"
              />
            ),
            style: {
              height: '70%',
            },
            onOk() {
              setSingleDate(singleDateRef.current)
              Popup.hide()
            },
          }).catch(() => {
            console.log('关闭啦')
          })
        }}>
        单选日期为：{singleDate}
      </Button>
    </Screen>
  )
}

export default CalendarDemo
