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
  key: string
}
export interface BaseCalandarProps {
  min: MomentInput
  max: MomentInput
  /** 自定义不可选日期 */
  value?: MomentInput[]
  initialNumToRender?: number
  disabledDate?: (date: Date) => boolean
  renderHeader?():ReactElement
  renderMonthHeader?(monthItem: MonthItem): ReactElement
  /** 日历左右两侧的距离 */
  gapWidth?: number
}
export interface SingleCalandarProps extends BaseCalandarProps {
  type: 'single'
  onChange?(values: number, moments:Moment): void
}

export interface RangeCalandarProps extends BaseCalandarProps {
  type: 'range'
  onChange?(values: [number, number], moments:[Moment, Moment]): void
}

export interface MonthProps extends Pick<BaseCalandarProps, 'disabledDate' | 'gapWidth'> {
  isRange?: boolean
  selected: string[]
  year: number
  month: number | string
  renderDate?(dateInfo: DateInfo): ReactElement
  onPress(date: string): void
}

export interface DayProps extends Pick<BaseCalandarProps, 'gapWidth'> {
  dayInfo: DateInfo
  renderDate?(dateInfo: DateInfo): ReactElement
  onPress(date: string): void
}