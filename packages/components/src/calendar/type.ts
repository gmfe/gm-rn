import { ReactElement } from 'react'
import { Moment, MomentInput } from 'moment'
import { DateStatus } from './constant'


export interface DateInfo {
  text: string
  selected?: boolean
  innerSelected?: boolean
  activedisabled?: boolean
  disable?: boolean
  day: string
  status: DateStatus
  date: string
  index: number
  isMonthEnd: boolean,
}
export type DateValue = string | number | Moment
export interface MonthItem {
  year: number
  month: number
}
export interface ListItemData extends MonthItem {
  key: string
}
export interface BaseCalandarProps {
  /** 设置日历的开始范围 */
  min: MomentInput
  /** 设置日历的结束范围 */
  max: MomentInput
  /** 自定义不可选日期 */
  value?: MomentInput[]
  /** 初始化要渲染多少个item，默认是2 */
  initialNumToRender?: number
  /** 自定义渲染日历头部，星期的那个位置 */
  renderHeader?():ReactElement
  /** 自定义渲染每月的头部，就是如2022年3月那个位置 */
  renderMonthHeader?(monthItem: MonthItem): ReactElement
  /** 日历左右两侧的距离 */
  gapWidth?: number
  /** 自定义要disable的日期 */
  disabledDate?: (date: Date) => boolean
  /** 自定义渲染日期 */
  renderDate?(dateInfo: DateInfo): ReactElement

}
export interface SingleCalandarProps extends BaseCalandarProps {
  type: 'single'
  onChange?(values: number, moments:Moment): void
}

export interface RangeCalandarProps extends BaseCalandarProps {
  /** 范围选择 */
  type: 'range'
  onChange?(values: [number, number], moments:[Moment, Moment]): void
}

export interface MonthProps extends Pick<BaseCalandarProps, 'gapWidth' | 'disabledDate'> {
  year: number
  month: number | string
  isRange: boolean
  isView?: boolean
}

export interface DayProps extends Pick<BaseCalandarProps, 'gapWidth'> {
  dayInfo: DateInfo
}

export interface CalenderContextType extends Pick<BaseCalandarProps, 'disabledDate' | 'renderDate'>{
    value: string[]
    onPress(date: string): void
}