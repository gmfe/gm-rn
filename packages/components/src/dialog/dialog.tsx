import React, { FC } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Dimensions,
} from 'react-native';

import Mask from '../mask';
import V from '../variable';
import S from '../styles';
import LayerRoot from '../layer_root';
import { ViewStyleType } from '../type';

const styles = StyleSheet.create({
  dialog: {
    backgroundColor: 'white',
    width: Dimensions.get('window').width - 60,
    borderRadius: 3,
  },
  dialogTitle: {
    fontSize: V.fontSize16,
    textAlign: 'center',
  },
  dialogFooter: {
    marginTop: 30,
    height: 42,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: V.borderColor,
    borderStyle: 'solid',
  },
  dialogFooterOpr: {
    height: 42,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dialogFooterOprWithBorder: {
    borderLeftWidth: StyleSheet.hairlineWidth,
    borderColor: V.borderColor,
    borderStyle: 'solid',
  },
});

export interface DialogProps {
  title?: string;
  buttons?: { text: string; onPress: () => void }[];
  style?: ViewStyleType;
  onCancel?: () => void;
}

export interface DialogStatic {
  render: (props: DialogProps) => void;
  hide: () => void;
}

const Dialog: FC<DialogProps> & DialogStatic = ({
  title,
  onCancel,
  style,
  buttons = [],
  children,
}) => {
  function renderButtons() {
    return buttons!.map((button, i) => {
      const { text, onPress } = button;
      const isLastButton = i + 1 === buttons.length;
      return (
        <TouchableHighlight
          key={button.text}
          style={[
            styles.dialogFooterOpr,
            i > 0 ? styles.dialogFooterOprWithBorder : {},
          ]}
          underlayColor={V.activeColor}
          onPress={onPress}>
          <Text
            style={[
              S.text,
              S.text16,
              {
                color: V[isLastButton ? 'primaryColor' : 'defaultColor'],
              },
            ]}>
            {text}
          </Text>
        </TouchableHighlight>
      );
    });
  }

  return (
    <Mask
      animationIn="zoomIn"
      onCancel={onCancel}
      style={[S.alignCenter, maskStyles.container]}>
      <View>
        <View style={[styles.dialog, style]}>
          {title && (
            <View style={[S.paddingHorizontal12, S.paddingTop12]}>
              <Text style={styles.dialogTitle}>{title}</Text>
            </View>
          )}
          <View style={[S.paddingHorizontal12, S.paddingTop12]}>
            {children}
          </View>
          {buttons?.length > 0 && (
            <View style={styles.dialogFooter}>{renderButtons()}</View>
          )}
        </View>
      </View>
    </Mask>
  );
};

Dialog.render = (props) => {
  return new Promise(() => {
    LayerRoot.setComponent(LayerRoot.TYPE.Dialog, <Dialog {...props} />);
  });
};

Dialog.hide = () => {
  LayerRoot.removeComponent(LayerRoot.TYPE.Dialog);
};

const maskStyles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,.2)',
    width: Dimensions.get('window').width,
  },
});
export default Dialog;
