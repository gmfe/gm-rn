import moment from 'moment'
import React from 'react'
import { Text, View } from 'react-native'
import { Calendar } from '.'
import { S } from '..'
import Popup from '../popup'

const PopCanlerdarStatic = {
  render(title) {
    Popup.render({
      position: 'bottom',
      title: '选择日期',
      children: (
        <Calendar
          // onChange={console.log}
          value={[moment(), moment().add(3, 'day')]}
          disabledDate={(date) => {
            return moment(date) > moment().add(10, 'day')
          }}
        />
      ),
      style: {
        height: '70%',
      },
      onOk() {
        console.log(111)
        Popup.hide()
      },
    }).catch(() => {
      console.log('关闭啦')
    })
  },
}

export default PopCanlerdarStatic
