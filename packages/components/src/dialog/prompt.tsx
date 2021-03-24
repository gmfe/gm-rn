import React from 'react';
import { View, Text, TextInput, TextInputProps } from 'react-native';
import Dialog from './dialog';
import LayerRoot from '../layer_root';
import S from '../styles';
import _ from 'lodash';
import { ViewStyleType } from '../type';

export type PromptType = (
  title: string,
  content: string,
  options?: {
    onOk?: () => void;
    okText?: string;
    cancelText?: string;
    style?: ViewStyleType;
  } & TextInputProps,
) => Promise<string | void>;

const Prompt: PromptType = (title, content, options = {}) => {
  return new Promise((resolve, reject) => {
    let text = options.defaultValue || '';

    const onOK = () => {
      const sC = options.onOk || _.noop;

      Promise.resolve(sC(text)).then(() => {
        LayerRoot.removeComponent(LayerRoot.TYPE.Dialog);
        setTimeout(() => {
          resolve(text);
        }, 0);
      });
    };

    LayerRoot.setComponent(
      LayerRoot.TYPE.Dialog,
      <Dialog
        title={title}
        buttons={[
          {
            text: options.cancelText || '取消',
            onPress: () => {
              LayerRoot.removeComponent(LayerRoot.TYPE.Dialog);
              setTimeout(() => {
                reject();
              }, 0);
            },
          },
          {
            text: options.okText || '确定',
            onPress: onOK,
          },
        ]}
        onCancel={() => {
          LayerRoot.removeComponent(LayerRoot.TYPE.Dialog);
          setTimeout(() => {
            reject();
          }, 0);
        }}
        style={options.style}>
        <Text style={[S.text, S.textDesc]}>{content}</Text>
        <View style={[S.border, S.padding4]}>
          <TextInput
            style={S.input}
            autoFocus
            onSubmitEditing={onOK}
            returnKeyType="done"
            defaultValue={options.defaultValue || ''}
            placeholder={options.placeholder}
            keyboardType={options.keyboardType || 'default'}
            onChangeText={(t) => (text = t)}
          />
        </View>
      </Dialog>,
    );
  });
};

export default Prompt;
