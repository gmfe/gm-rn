import React, { ReactElement } from 'react';
import { Text } from 'react-native';
import Dialog from './dialog';
import LayerRoot from '../layer_root';
import S from '../styles';
import { ViewStyleType } from '../type';

export type ConfirmType = (
  title: string,
  content: ReactElement,
  options?: { okText?: string; cancelText?: string; style?: ViewStyleType },
) => Promise<void>;

const Confirm: ConfirmType = (title, content, options = {}) => {
  return new Promise((resolve, reject) => {
    LayerRoot.setComponent(
      LayerRoot.TYPE.DIALOG,
      <Dialog
        title={title}
        buttons={[
          {
            text: options.cancelText || '取消',
            onPress: () => {
              LayerRoot.removeComponent(LayerRoot.TYPE.DIALOG);
              setTimeout(() => {
                reject();
              }, 0);
            },
          },
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
        onCancel={() => {
          LayerRoot.removeComponent(LayerRoot.TYPE.DIALOG);
          setTimeout(() => {
            reject();
          }, 0);
        }}
        style={options.style}>
        {content?.type !== undefined ? (
          content
        ) : (
          <Text style={[S.text, S.textDesc, S.textCenter]}>{content}</Text>
        )}
      </Dialog>,
    );
  });
};

export default Confirm;
