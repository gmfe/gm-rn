import React, { FC, ReactNode } from 'react'

import { View, StyleSheet, Text } from 'react-native'

import Mask from '../mask'
import LayoutRootV1 from '../layer_root/v1'
import FlexView from '../flex_view'
import S from '../styles'
import { AnyCallbackType, ViewStyleType } from '../type'
import { addUuidToOption } from '../../../utils/src'

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

export interface PopupV1Props {
  position: keyof typeof AnimationInMap
  style?: ViewStyleType
  onCancel?: () => void
  onOk?: () => void
  children?: ReactNode
  title?: string
  cancelText?: string
  okText?: string
  showHeader?: boolean
}

export interface PopupV1Static {
  render: (props: PopupV1Props) => AnyCallbackType
  hide: (id: string) => void
}

const PopupV1: FC<PopupV1Props> & PopupV1Static = ({
  position,
  onCancel,
  onOk,
  children,
  style,
  title,
  cancelText = '取消',
  okText = '确定',
  showHeader,
  ...rest
}) => {
  return (
    <Mask
      {...rest}
      animationIn={AnimationInMap[position]}
      onCancel={onCancel}
      style={[styles[position]]}>
      {showHeader && (
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
          <Text onPress={onOk} style={S.textLink}>
            {okText}
          </Text>
        </FlexView>
      )}
      <View style={[S.bgWhite, style]}>{children}</View>
    </Mask>
  )
}

PopupV1.render = function (props) {
  const id = addUuidToOption(props)
  LayoutRootV1.setComponent(
    LayoutRootV1.TYPE.PopUp,
    <PopupV1
      onCancel={() => {
        PopupV1.hide(id)
      }}
      {...props}
    />,
  )
  return PopupV1.hide.bind(null, id)
}

PopupV1.hide = function (id: string) {
  if (!id) {
    console.error('need id when manual hide')
  }
  LayoutRootV1.removeComponent(LayoutRootV1.TYPE.PopUp, id)
}

export default PopupV1
