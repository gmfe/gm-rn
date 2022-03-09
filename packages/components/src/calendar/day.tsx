import React, { memo } from 'react'
import {
  TouchableOpacity,
  Text,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native'
import moment from 'moment'

import { DateStatus, DATE_FORMAT } from './constant'
import styles, { gapItemSize } from './styles'
import { DayProps } from './type'
import FlexView from '../flex_view'
import S from '../styles'

const StatusText = {
  [DateStatus.RANGE_START]: '开始',
  [DateStatus.RANGE_END]: '结束',
  [DateStatus.INNER]: '',
  [DateStatus.NOT_SELECT]: '',
  [DateStatus.SINGLE]: '单天',
}

function Day({
  dayInfo,
  renderDate,
  onPress,
  gapWidth = gapItemSize + 0.1,
}: DayProps) {
  function _onPress() {
    !disable && onPress(date)
  }

  const {
    date,
    text,
    selected,
    innerSelected,
    disable,
    status,
    index,
    isMonthEnd,
  } = dayInfo

  /**
   * blank day
   */
  if (!date) {
    return <FlexView style={styles.dayItem} />
  }

  /**
   * customer render date
   * @type {Object}
   */
  const param = dayInfo
  const customRender = renderDate && renderDate(param)

  // selected text

  // item View style
  const dayBoxStyle: StyleProp<ViewStyle> = [styles.dayItemInner]
  const containerStyle = [styles.dayItem]

  // date text style
  let dayTextStyle: StyleProp<TextStyle> = [styles.dateText]
  if (selected) {
    // in range
    if (innerSelected) {
      // selectedStyle.color = THEME_COLOR
      dayBoxStyle.push(styles.dayItemActiveInner)
    } else {
      dayBoxStyle.push(styles.dayItemActive)
      dayBoxStyle.push(styles.dayItemActiveFill)
      dayTextStyle.push(S.textWhite)
    }
  } else {
    if (date === moment().format(DATE_FORMAT)) {
      dayTextStyle.push(S.textSecondary)
      dayBoxStyle.push(styles.currentDayNotSelect)
    }
  }

  if (disable) {
    dayTextStyle.push(styles.disableText)
  }
  //finnaly show text
  const isRangeStrtOrRangeEndOrSingle = [
    DateStatus.RANGE_START,
    DateStatus.RANGE_END,
    DateStatus.SINGLE,
  ].includes(status)

  // 日期单独选中为正方形，选择一段时连续高亮，需要处理中间部分背景色，判断当前渲染日期是否为所在月份的 第一天/最后一天
  const isMonthStart = text === '1'
  const startWithColorGap =
    (innerSelected || DateStatus.RANGE_END === status) &&
    index % 7 !== 0 &&
    !isMonthStart
  const endWithColorGap =
    (innerSelected || DateStatus.RANGE_START === status) &&
    index % 7 !== 6 &&
    !isMonthEnd
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={[containerStyle]}
      onPress={_onPress}>
      <FlexView row>
        <FlexView
          style={[startWithColorGap && S.bgSecondary, { width: gapWidth }]}
        />
        {customRender || (
          <FlexView style={[dayBoxStyle]} justifyCenter>
            <Text style={[...dayTextStyle, S.textCenter]}>{text}</Text>
            {isRangeStrtOrRangeEndOrSingle && (
              <Text style={[...dayTextStyle, S.textCenter, S.text10]}>
                {StatusText[status]}
              </Text>
            )}
          </FlexView>
        )}
        <FlexView
          style={[endWithColorGap && S.bgSecondary, { width: gapWidth }]}
        />
      </FlexView>
    </TouchableOpacity>
  )
}

export default memo(Day, (preProps, nextProps) => {
  return !(
    nextProps.dayInfo.selected !== preProps.dayInfo.selected ||
    nextProps.dayInfo.innerSelected !== preProps.dayInfo.innerSelected ||
    nextProps.dayInfo.status !== preProps.dayInfo.status ||
    nextProps.dayInfo.isMonthEnd !== preProps.dayInfo.isMonthEnd
  )
})
