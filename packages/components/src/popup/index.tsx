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

export enum animationInMap {
  top = 'slideInDown',
  right = 'slideInRight',
  bottom = 'slideInUp',
  left = 'slideInLeft',
}

export interface PopupProps {
  position: keyof typeof animationInMap;
  style?: ViewStyleType;
  onCancel?: () => void;
  children?: ReactNode;
}

export interface PopupStatic {
  render: (props: Partial<PopupProps>) => Promise<void>;
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
      animationIn={animationInMap[position]}
      onCancel={onCancel}
      style={[styles[position], style]}>
      <View style={[S.bgWhite]}>{children}</View>
    </Mask>
  );
};

Popup.render = (props) => {
  return new Promise((resolve, reject) => {
    LayoutRoot.setComponent(
      LayoutRoot.TYPE.POPUP,
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

Popup.hide = () => LayoutRoot.removeComponent(LayoutRoot.TYPE.POPUP);

export default Popup;
