import { FC, ReactNode } from 'react'
import { ViewProps, TextProps } from 'react-native'

import _Style from './styles'
import _Variable from './variable'

export const S: typeof _Style
export const Style: typeof _Style
export const V: typeof _Variable
export const Variable: typeof _Variable

export { default as Screen } from './screen'
export { ScreenProps } from './screen/screen.props'

export interface CellProps extends ViewProps {
  first?: boolean
  access?: boolean
  input?: boolean
  error?: boolean
  onPress?: () => void
}

export const Cell: FC<CellProps>

export interface CellsProps extends ViewProps {}

export const Cells: FC<CellsProps>

export interface CellBodyProps extends ViewProps {
  input?: boolean
  error?: boolean
}

export const CellBody: FC<CellBodyProps>

export interface CellFooterProps extends TextProps {
  access?: boolean
  children?: ReactNode
}

export const CellFooter: FC<CellFooterProps>

export interface CellHeaderProps extends ViewProps {}

export const CellHeader: FC<CellHeaderProps>

export interface CellsTipsProps extends TextProps {}

export const CellsTips: FC<CellsTipsProps>

export interface CellsTitleProps extends TextProps {}

export const CellsTitle: FC<CellsTitleProps>

export interface SearchBarProps {
  value?: string
  autoFocus?: boolean
  placeholder?: string
  onChange?: (value: string) => void
  onClear?: () => void
  onSearch?: (value: string) => void
  searchBtn?: boolean | string
  /** 提供一个假输入框，点击的时候出发fake回调 */
  fake: () => void
}

export const SearchBar: FC<SearchBarProps>

export { default as FlexView } from './flex_view'
export { default as GapBlock } from './gap_block'
export { default as QRScannerView } from './qrcode_scanner_view'
export { default as Toast } from './toast'
export { default as Icon } from './icon'
export { default as ActionSheet } from './action_sheet'
export { default as Popup } from './popup'
export { default as PopupV1 } from './popup/popup_v1'
export { default as LayerRoot } from './layer_root'
export { default as Mask } from './mask'
export { default as Button } from './button'
export { default as Input } from './input'
export * from './dialog'
export * from './flex_view'
export * from './gap_block'
export * from './block_view'
export * from './cell_rows'
export * from './qrcode_scanner_view'
export * from './toast'
export * from './action_sheet'
export * from './popup'
export * from './form'
export * from './layer_root'
export * from './mask'
export * from './icon'
export * from './button'
export * from './input'
export * from './type'
export * from './calendar'
