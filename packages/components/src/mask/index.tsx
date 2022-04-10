import React, { FC } from 'react'
import _ from 'lodash'
import Modal, { ModalProps } from 'react-native-modal'

import S from '../styles'
import { AnyCallbackType, ViewStyleType } from '../type'

export interface MaskProps extends Partial<ModalProps> {
  onCancel?: AnyCallbackType
  style?: ViewStyleType
}
const Mask: FC<MaskProps> = ({
  isVisible = true,
  children,
  style,
  onCancel = _.noop,
  backdropOpacity = 0.1,
  ...rest
}) => {
  function handleCancel() {
    onCancel()
  }
  return (
    <Modal
      {...rest}
      isVisible={isVisible}
      avoidKeyboard
      backdropOpacity={backdropOpacity}
      onBackButtonPress={handleCancel}
      onBackdropPress={handleCancel}
      style={[S.margin0, style]}>
      {children}
    </Modal>
  )
}

export default Mask
