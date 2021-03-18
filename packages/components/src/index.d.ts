import { FC, ReactNode } from 'react';
import { ViewProps, TextProps, ViewStyle, TextInputProps } from 'react-native';

import _Style from './styles';
import _Variable from './variable';
import { onPressType } from './type';

export const S: typeof _Style;
export const Style: typeof _Style;
export const V: typeof _Variable;
export const Variable: typeof _Variable;

export { default as Screen } from './screen';
export { ScreenProps } from './screen/screen.props';

export type ButtonType = 'default' | 'primary' | 'warning';

export interface TouchableComponent {
  type?: ButtonType;
  plain?: boolean;
  disabled?: boolean;
  mini?: boolean;
  onPress?: () => void | Promise<any>;
  children: ReactNode;
  Style?: ViewStyle;
}

interface ButtonProps extends TouchableComponent { }

export const Button: FC<ButtonProps>;

export const LayerRoot: FC;

export interface MaskProps {
  isVisible: boolean;
  onCancel: () => void;
}

export const Mask: FC<MaskProps>;

export interface IconProps {
  name: string;
  size?: number;
  color?: string;
  onPress?: onPressType;
}

export const Icon: FC<IconProps>;

export interface DataItem<T> {
  value: T;
  text: string;
  disabled?: boolean;
  desc?: string;
}

export interface ActionSheetProps<T = number | string> {
  title?: string;
  list: DataItem<T>[];
  onSelect: (value: T) => void;
  onCancel?: () => void;
}

export interface ActionSheetStatic {
  render: <T extends number | string>(props: ActionSheetProps<T>) => void;
  hide: () => void;
}

export const ActionSheet: FC<ActionSheetProps> & ActionSheetStatic;

export interface CellProps extends ViewProps {
  first?: boolean;
  access?: boolean;
  input?: boolean;
  error?: boolean;
  onPress?: () => void;
}

export const Cell: FC<CellProps>;

export interface CellsProps extends ViewProps { }

export const Cells: FC<CellsProps>;

export interface CellBodyProps extends ViewProps {
  input?: boolean;
  error?: boolean;
}

export const CellBody: FC<CellBodyProps>;

export interface CellFooterProps extends TextProps {
  access?: boolean;
  children?: ReactNode;
}

export const CellFooter: FC<CellFooterProps>;

export interface CellHeaderProps extends ViewProps { }

export const CellHeader: FC<CellHeaderProps>;

export interface CellsTipsProps extends TextProps { }

export const CellsTips: FC<CellsTipsProps>;

export interface CellsTitleProps extends TextProps { }

export const CellsTitle: FC<CellsTitleProps>;

export interface DialogProps {
  title?: string;
  buttons?: { text: string; onPress: () => void }[];
  onCancel?: () => void;
  children?: ReactNode;
}

export interface DialogStatic {
  render: (props: DialogProps) => void;
  hide: () => void;
}

export const Dialog: FC<DialogProps> & DialogStatic;

export const Alert: (
  title: string,
  content: string,
  options?: { okText: string; style?: ViewStyle },
) => Promise<void>;

export const Confirm: (
  title: string,
  content: string,
  options?: { okText?: string; cancelText?: string; style?: ViewStyle },
) => Promise<void>;

export const Prompt: (
  title: string,
  content: string,
  options?: {
    onOk: () => void;
    okText: string;
    cancelText: string;
    style: ViewStyle;
  } & TextInputProps,
) => Promise<void>;

export interface PopupProps {
  position: 'top' | 'right' | 'bottom' | 'left';
  onCancel?: () => void;
}

export interface PopupStatic {
  render: () => Promise<void>;
  hide: () => void;
}

export const Popup: FC<PopupProps> & PopupStatic;

export interface RadioProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  color?: string;
}

export const Radio: FC<RadioProps>;

export interface ToastProps {
  icon?: string;
  children: string;
}

export type ToastStaticOption =
  | {
    time: number;
    children: string;
  }
  | string;

export interface ToastStatic {
  clear: () => void;
  tip: (option: ToastStaticOption, icon: string) => void;
  success: (option: ToastStaticOption) => void;
  info: (option: ToastStaticOption) => void;
  warning: (option: ToastStaticOption) => void;
  danger: (option: ToastStaticOption) => void;
  loading: (option: ToastStaticOption) => void;
}

export interface SearchBarProps {
  value?: string;
  autoFocus?: boolean;
  placeholder?: string;
  onChange?: (value: string) => void;
  onClear?: () => void;
  onSearch?: (value: string) => void;
  searchBtn?: boolean | string;
  /** 提供一个假输入框，点击的时候出发fake回调 */
  fake: () => void;
}

export const SearchBar: FC<SearchBarProps>;

export const Toast: FC<ToastProps> & ToastStatic;

export { default as FlexView } from './flex_view';
export { default as GapBlock } from './gap_block';
export { default as QRCodeCcan } from './qrcode_scanner_view';
export * from './flex_view';
export * from './gap_block';
export * from './block_view';
export * from './cell_rows';
export * from './qrcode_scanner_view';
export * from './type';
