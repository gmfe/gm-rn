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
  disabledDate?: (date: Date) => boolean
  // isRange?: boolean
  value?: MomentInput[]
  // onChange?(values: [number, number], moments:[Moment, Moment]): void
  renderHeader?():ReactElement
  renderMonthHeader?(monthItem: MonthItem): ReactElement
}
export interface SingleCalandarProps extends BaseCalandarProps {
  type: 'single'
  onChange?(values: number, moments:Moment): void
}

export interface RangeCalandarProps extends BaseCalandarProps {
  type: 'range'
  onChange?(values: [number, number], moments:[Moment, Moment]): void
}

export interface MonthProps extends Pick<BaseCalandarProps, 'disabledDate'> {
  isRange?: boolean
  selected: string[]
  year: number
  month: number | string
  renderDate?(dateInfo: DateInfo): ReactElement
  onPress(date: string): void
}