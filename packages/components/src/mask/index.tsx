import React, { FC } from 'react';
import _ from 'lodash';
import Modal from 'react-native-modal';

import S from '../styles';
import { AnyCallbackType, ViewStyleType } from '../type';

export interface MaskProps {
  isVisible?: boolean;
  onCancel?: AnyCallbackType;
  style?: ViewStyleType;
}
const Mask: FC<MaskProps> = ({
  isVisible = true,
  children,
  style,
  onCancel = _.noop,
  ...rest
}) => {
  function handleCancel() {
    onCancel();
  }
  return (
    <Modal
      {...rest}
      isVisible={isVisible}
      avoidKeyboard
      backdropOpacity={0.1}
      onBackButtonPress={handleCancel}
      onBackdropPress={handleCancel}
      style={[S.margin0, style]}>
      {children}
    </Modal>
  );
};

export default Mask;
