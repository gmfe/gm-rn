import { ReactNode } from 'react'
import { numberOrString } from '../type'

export interface CascaderOption<T extends numberOrString = string> {
  value: T
  label?: ReactNode
  disabled?: boolean
  children?: CascaderOption<T>[]
  // /** 是否为叶子节点 */
  isLeaf?: boolean
}

export interface CascaderProps<T extends numberOrString = string>
  extends Pick<SelectedBarProps<T>, 'onClose'> {
  options?: CascaderOption<T>[]
  value?: T[]
  defaultValue?: T[]
  onChange?(value: T[], selected: CascaderOption<T>[]): void
  all?: boolean
  allText?: string
}

export interface SelectedBarProps<T extends numberOrString = string> {
  selected: CascaderOption<T>[]
  tabIndex: number
  onTabChange(options: CascaderOption<T>[], index: number): void
  /** 是否展示关闭，传入onClose表示展示关闭的icon */
  onClose?(): void
}
