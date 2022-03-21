import React, {
  FC,
  memo,
  ReactElement,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react'
import { Text, View, FlatList, FlatListProps } from 'react-native'

import moment, { MomentInput } from 'moment'
import styles from './styles'
import Month from './month'
import {
  SingleCalandarProps,
  MonthItem,
  RangeCalandarProps,
  BaseCalandarProps,
  ListItemData,
} from './type'
import S from '../styles'
import { DATE_FORMAT } from './constant'
import FlexView from '../flex_view'
import { CalenderContext } from './context'

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
    initialNumToRender = 2,
    disabledDate,
    renderDate,
  } = props

  const [views, setViews] = useState<Set<string>>(new Set())
  const [innerValue, setInnerValue] = useState(initValue)

  /** 用ref避免闭包 */
  const valueRef = useRef<string[]>(innerValue)
  valueRef.current = innerValue
  const propsRef = useRef<typeof props>(props)
  propsRef.current = props

  /** 也要求不可变 */
  const viewabilityConfig = useMemo(
    () => ({
      // item可见度超过5%则意味着visible
      itemVisiblePercentThreshold: 2,
    }),
    [],
  )
  /** 日历的数据和初始要滚动到的位置 */
  const [dataSource, initialScrollIndex] = useMemo(() => {
    const latestProps = propsRef.current
    const {
      value: valueProp = defaultValue,
      min = valueProp[0],
      max = valueProp[1],
    } = latestProps
    const lastDateMoment = moment(valueRef.current[valueRef.current.length - 1])
    const [selectedYear, selectedMonth] = [
      lastDateMoment.year(),
      lastDateMoment.month(),
    ]
    let startDate = moment(min)
    const endDate = moment(max)
    const data = []
    while (endDate.isSameOrAfter(startDate, 'day')) {
      const year = startDate.year()
      const month = startDate.month()
      data.push({ year, month, key: `${year}${month}` })
      startDate = startDate.add(1, 'month')
    }
    let targetIndex = data.findIndex(
      ({ year, month }) => selectedYear === year && selectedMonth === month,
    )
    // 这里的意思是找到了end对应的月份的index，如果不是最后一项，那么减1的目的是为了大致让选择项居中
    if (targetIndex !== data.length - 1) targetIndex--
    return [data, targetIndex]
  }, [])
  /** 初始化数据 */
  function initValue() {
    let newValue = value as MomentInput[]
    if (type === 'single') newValue = [value] as MomentInput[]
    return newValue!.map((item) => moment(item).format(DATE_FORMAT))
  }
  /** 点击日期的回调 */
  const _onPress = useCallback((date: string) => {
    const latestProps = propsRef.current
    const { type: typeProp, onChange } = latestProps
    let newInnerValue = [...valueRef.current]

    if (typeProp === 'range') {
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
  }, [])
  /** onViewableItemsChanged务必保持不可变 */
  const onViewableItemsChanged = useCallback<
    NonNullable<FlatListProps<ListItemData>['onViewableItemsChanged']>
  >(({ viewableItems }) => {
    setViews(new Set(viewableItems.map((item) => item.key)))
  }, [])
  return (
    <View style={[styles.container]}>
      {(props.renderHeader && props.renderHeader()) || <CalenderHeader />}
      <CalenderContext.Provider
        value={{
          value: innerValue,
          disabledDate,
          renderDate,
          onPress: _onPress,
        }}>
        <FlatList<ListItemData>
          getItemLayout={(_, index) => {
            // 253是通过下面ListItem的onLayout得到的
            return {
              length: 253,
              offset: 253 * index,
              index,
            }
          }}
          initialScrollIndex={initialScrollIndex}
          data={dataSource}
          initialNumToRender={initialNumToRender}
          renderItem={({ item }) => {
            return (
              <ListItem {...item} type={type} isView={views.has(item.key)} />
            )
          }}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={viewabilityConfig}
        />
      </CalenderContext.Provider>
    </View>
  )
}

const MonthHeader: FC<Pick<MonthItem, 'month' | 'year'>> = memo(
  ({ year, month }) => {
    return (
      <View style={styles.monthHeader}>
        <Text>{`${year}年 ${month + 1}月`}</Text>
      </View>
    )
  },
)

const CalenderHeader = memo(() => {
  const WEEKS = ['日', '一', '二', '三', '四', '五', '六']

  return (
    <FlexView row justifyBetween style={styles.weekHeader}>
      {WEEKS.map((item, i) => {
        // 是否是一行中的第一个和最后一个
        const isRowFirstOrLast = [0, WEEKS.length - 1].includes(i)
        return (
          <FlexView flex alignCenter key={i}>
            <Text style={[isRowFirstOrLast && S.textDesc, S.text12]}>
              {item}
            </Text>
          </FlexView>
        )
      })}
    </FlexView>
  )
})

const ListItem: FC<
  Pick<BaseCalandarProps, 'renderMonthHeader'> &
    MonthItem & { type: 'range' | 'single'; isView?: boolean }
> = memo(({ renderMonthHeader, type, year, month, isView }) => {
  return (
    <View>
      {(renderMonthHeader && renderMonthHeader({ year, month })) || (
        <MonthHeader year={year} month={month} />
      )}
      <Month
        isRange={type === 'range'}
        year={year}
        month={month}
        isView={isView}
      />
    </View>
  )
})
