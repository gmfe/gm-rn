import { FlexView, S } from '..'
import React, { memo, ReactElement } from 'react'
import {
  TouchableOpacity,
  Text,
  View,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native'
import { DateStatus } from './constant'
import styles from './styles'
import { DateInfo } from './type'

const StatusText = {
  [DateStatus.START]: '开始',
  [DateStatus.END]: '结束',
  [DateStatus.INNER]: '',
  [DateStatus.NOT_SELECT]: '',
  [DateStatus.SINGLE]: '单天',
}

interface DayProps {
  dayInfo: DateInfo
  renderDate?(dateInfo: DateInfo): ReactElement
  onPress(date: string): void
}
function Day({ dayInfo, renderDate, onPress }: DayProps) {
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
  }

  if (disable) {
    dayTextStyle.push(styles.disableText)
  }

  //finnaly show text

  var dateJSX = [
    <View style={dayBoxStyle} key={0}>
      <FlexView justifyCenter>
        <Text style={[...dayTextStyle, S.textCenter]}>{text}</Text>
        {[DateStatus.START, DateStatus.END, DateStatus.SINGLE].includes(
          status,
        ) && (
          <Text style={[...dayTextStyle, S.textCenter, S.text10]}>
            {StatusText[status]}
          </Text>
        )}
      </FlexView>
    </View>,
  ]

  const containerStyle = [styles.dayItem]
  // 日期单独选中为正方形，选择一段时连续高亮，需要处理中间部分背景色，判断当前渲染日期是否为所在月份的 第一天/最后一天

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={containerStyle}
      onPress={_onPress}>
      <FlexView row>
        {(innerSelected || DateStatus.END === status) && index % 7 !== 0 ? (
          <FlexView flex style={[S.bgSecondary]} />
        ) : (
          <FlexView flex />
        )}
        {customRender || dateJSX}
        {(innerSelected || DateStatus.START === status) && index % 7 !== 6 ? (
          <FlexView flex style={[S.bgSecondary]} />
        ) : (
          <FlexView flex />
        )}
      </FlexView>
    </TouchableOpacity>
  )
}

export default memo(Day, (preProps, nextProps) => {
  return !(
    nextProps.dayInfo.selected !== preProps.dayInfo.selected ||
    nextProps.dayInfo.innerSelected !== preProps.dayInfo.innerSelected ||
    nextProps.dayInfo.status !== preProps.dayInfo.status
  )
})
