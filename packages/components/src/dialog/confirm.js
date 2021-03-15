import React from 'react';
import { Text } from 'react-native';
import Dialog from './dialog';
import LayerRoot from '../layer_root';
import S from '../styles';
import FlexView from '../flex_view';

const Confirm = (title, content, options = {}) => {
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
        {content && content.type !== undefined ? (
          content
        ) : (
          /**
           *  父级center，子级不center,实现单行center，多行靠左
           */
          <FlexView row justifyCenter>
            <Text style={[S.text, S.textDesc]}>{content}</Text>
          </FlexView>
        )}
      </Dialog>,
    );
  });
};

export default Confirm;
