import React, { ReactNode } from 'react'
import { Text } from 'react-native'
import _ from 'lodash'
import Dialog from './dialog'
import LayerRoot from '../layer_root'
import S from '../styles'
import { textStyleType, ViewStyleType } from '../type'

export type ConfirmType = (
  title: string,
  content: ReactNode,
  options?: {
    okText?: string
    cancelText?: string
    style?: ViewStyleType
    /** 内容style */
    contentStyle?: textStyleType
  },
) => Promise<void>

const Confirm: ConfirmType = (title, content, options = {}) => {
  return new Promise((resolve, reject) => {
    LayerRoot.setComponent(
      LayerRoot.TYPE.Dialog,
      <Dialog
        title={title}
        buttons={[
          {
            text: options.cancelText || '取消',
            onPress: () => {
              LayerRoot.removeComponent(LayerRoot.TYPE.Dialog)
              setTimeout(() => {
                reject()
              }, 0)
            },
          },
          {
            text: options.okText || '确定',
            onPress: () => {
              LayerRoot.removeComponent(LayerRoot.TYPE.Dialog)
              setTimeout(() => {
                resolve()
              }, 0)
            },
          },
        ]}
        onCancel={() => {
          LayerRoot.removeComponent(LayerRoot.TYPE.Dialog)
          setTimeout(() => {
            reject()
          }, 0)
        }}
        style={options.style}>
        {_.isString(content) ? (
          <Text
            style={[S.text, S.textDesc, S.textCenter, options.contentStyle]}>
            {content}
          </Text>
        ) : (
          content
        )}
      </Dialog>,
    )
  })
}

export default Confirm
