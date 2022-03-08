import React, { FC, ReactNode } from 'react'

import { View, StyleSheet, Text } from 'react-native'

import Mask from '../mask'
import LayoutRoot from '../layer_root'
import FlexView from '../flex_view'
import S from '../styles'
import { ViewStyleType } from '../type'

const styles = StyleSheet.create({
  top: {
    justifyContent: 'flex-start',
  },
  bottom: {
    justifyContent: 'flex-end',
  },
  left: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  right: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  header: {
    borderTopStartRadius: 8,
    borderTopRightRadius: 8,
    height: 48,
  },
})

export enum AnimationInMap {
  top = 'slideInDown',
  right = 'slideInRight',
  bottom = 'slideInUp',
  left = 'slideInLeft',
}

export interface PopupProps {
  position: keyof typeof AnimationInMap
  style?: ViewStyleType
  onCancel?: () => void
  onOk?: () => void
  children?: ReactNode
  title?: string
  cancelText?: string
  okText?: string
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
  ...rest
}) => {
  return (
    <Mask
      {...rest}
      animationIn={AnimationInMap[position]}
      onCancel={onCancel}
      style={[styles[position]]}>
      <FlexView
        row
        justifyBetween
        alignCenter
        paddingHorizontal12
        bgWhite
        borderBottom
        style={[styles.header]}>
        <Text onPress={onCancel}>{cancelText}</Text>
        <Text style={[S.textBold, S.text16]}>{title}</Text>
        <Text onPress={onOk}>{okText}</Text>
      </FlexView>
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
