import React, { FC, ReactNode } from 'react'

import { View, Text } from 'react-native'

import Mask from '../mask'
import LayoutRoot from '../layer_root'
import FlexView from '../flex_view'
import S from '../styles'
import { textStyleType, ViewStyleType } from '../type'
import styles from './style'

export enum AnimationInMap {
  top = 'slideInDown',
  right = 'slideInRight',
  bottom = 'slideInUp',
  left = 'slideInLeft',
}

export interface PopupProps {
  position: keyof typeof AnimationInMap
  style?: ViewStyleType
  /** 取消的回调，默认关闭弹窗 */
  onCancel?: () => void
  /** 确定的回调 */
  onOk?: () => void
  children?: ReactNode
  /** 可以为字符串也可以为组件 */
  title?: ReactNode
  /** 可以为字符串也可以为组件 */
  cancelText?: ReactNode
  /** 可以为字符串也可以为组件 */
  okText?: ReactNode
  /** 是否展示header */
  showHeader?: boolean
  /** 自定义渲染头部 */
  renderHeader?(): ReactNode
  /** 头部样式 */
  headerStyle?: ViewStyleType
  /** 取消或者左边文本样式 */
  cancelStyle?: textStyleType
  /** 标题样式 */
  titleStyle?: textStyleType
  /** 确定或者右边样式 */
  okStyle?: textStyleType
}

export interface PopupStatic {
  render: (props: PopupProps) => Promise<void>
  hide: () => void
}

const Popup: FC<PopupProps> & PopupStatic = ({
  position,
  onCancel,
  onOk,
  children,
  style,
  title,
  cancelText = '取消',
  okText = '确定',
  showHeader,
  renderHeader,
  headerStyle,
  cancelStyle,
  titleStyle,
  okStyle,
  ...rest
}) => {
  return (
    <Mask
      {...rest}
      animationIn={AnimationInMap[position]}
      onCancel={onCancel}
      style={[styles[position], { backgroundColor: 'rgba(0,0,0,0.3)' }]}>
      {renderHeader
        ? renderHeader()
        : showHeader && (
            <FlexView
              row
              justifyBetween
              alignCenter
              // paddingHorizontal12
              bgWhite
              borderBottom
              style={[styles.header, headerStyle]}>
              {typeof cancelText === 'string' ? (
                <Text
                  style={[
                    cancelStyle,
                    S.paddingLeft12,
                    S.paddingRight12,
                    styles.area,
                  ]}
                  onPress={onCancel}>
                  {cancelText}
                </Text>
              ) : (
                cancelText
              )}
              {typeof title === 'string' ? (
                <Text style={[S.textBold, S.text16, titleStyle]}>{title}</Text>
              ) : (
                title
              )}
              {typeof okText === 'string' ? (
                <Text
                  onPress={onOk}
                  style={[
                    S.textLink,
                    okStyle,
                    S.paddingRight12,
                    S.paddingLeft12,
                    styles.area,
                  ]}>
                  {okText}
                </Text>
              ) : (
                okText
              )}
            </FlexView>
          )}
      <View style={[S.bgWhite, style]}>{children}</View>
    </Mask>
  )
}

Popup.render = (props) => {
  return new Promise((resolve, reject) => {
    LayoutRoot.setComponent(
      LayoutRoot.TYPE.PopUp,
      <Popup
        {...props}
        onCancel={() => {
          Popup.hide()
          reject()
        }}
      />,
    )
  })
}

Popup.hide = () => LayoutRoot.removeComponent(LayoutRoot.TYPE.PopUp)

export default Popup
