import React, { FC, ReactNode } from 'react';

import { View, StyleSheet } from 'react-native';

import Mask from '../mask';
import LayoutRoot from '../layer_root';
import S from '../styles';
import { ViewStyleType } from '../type';

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
});

export enum AnimationInMap {
  top = 'slideInDown',
  right = 'slideInRight',
  bottom = 'slideInUp',
  left = 'slideInLeft',
}

export interface PopupProps {
  position: keyof typeof AnimationInMap;
  style?: ViewStyleType;
  onCancel?: () => void;
  children?: ReactNode;
}

export interface PopupStatic {
  render: (props: PopupProps) => Promise<void>;
  hide: () => void;
}

const Popup: FC<PopupProps> & PopupStatic = ({
  position,
  onCancel,
  children,
  style,
  ...rest
}) => {
  return (
    <Mask
      {...rest}
      animationIn={AnimationInMap[position]}
      onCancel={onCancel}
      style={[styles[position], style]}>
      <View style={[S.bgWhite]}>{children}</View>
    </Mask>
  );
};

Popup.render = (props) => {
  return new Promise((resolve, reject) => {
    LayoutRoot.setComponent(
      LayoutRoot.TYPE.PopUp,
      <Popup
        {...props}
        onCancel={() => {
          Popup.hide();
          reject();
        }}
      />,
    );
  });
};

Popup.hide = () => LayoutRoot.removeComponent(LayoutRoot.TYPE.PopUp);

export default Popup;
