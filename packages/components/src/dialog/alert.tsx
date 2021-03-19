import React from 'react';
import { Text } from 'react-native';
import Dialog from './dialog';
import LayerRoot from '../layer_root';
import S from '../styles';
import { ViewStyleType } from '../type';

export interface IAlertProps {
  title: string;
  content: string;
  options?: { okText: string; style?: ViewStyleType };
}
export type AlertType = (
  title: string,
  content: string,
  options?: { okText?: string; style?: ViewStyleType },
) => Promise<void>;
const Alert: AlertType = (title, content, options = {}): Promise<void> => {
  return new Promise((resolve) => {
    LayerRoot.setComponent(
      LayerRoot.TYPE.DIALOG,
      <Dialog
        title={title}
        buttons={[
          {
            text: options.okText || '确定',
            onPress: () => {
              LayerRoot.removeComponent(LayerRoot.TYPE.DIALOG);
              setTimeout(() => {
                resolve();
              }, 0);
            },
          },
        ]}
        style={options.style}>
        <Text style={[S.text, S.textDesc, S.textCenter]}>{content}</Text>
      </Dialog>,
    );
  });
};

export default Alert;
