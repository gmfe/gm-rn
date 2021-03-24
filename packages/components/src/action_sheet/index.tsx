import React, { FC } from 'react';

import {
  View,
  Text,
  TouchableHighlight,
  ScrollView,
  StyleSheet,
} from 'react-native';
import _ from 'lodash';
import V from '../variable';
import S from '../styles';
import Mask from '../mask';
import Button from '../button';
import FlexView from '../flex_view';
import LayoutRoot from '../layer_root';
import { ViewStyleType } from '../type';

export interface DataItem<T> {
  value: T;
  text: string;
  disabled?: boolean;
  desc?: string;
}
export interface ActionSheetProps<T = number | string> {
  title?: string;
  list: DataItem<T>[];
  style?: ViewStyleType;
  onSelect: (value: T) => void;
  onCancel?: () => void;
}

export interface ActionSheetStatic {
  render: <T extends number | string>(props: ActionSheetProps<T>) => void;
  hide: () => void;
}
const ActionSheet: FC<ActionSheetProps> & ActionSheetStatic = ({
  title,
  list,
  style,
  onCancel,
  onSelect,
  ...rest
}) => {
  return (
    <Mask
      {...rest}
      animationIn="slideInUp"
      onCancel={onCancel}
      style={[S.justifyEnd, style]}>
      <FlexView bgDefault>
        <FlexView borderBottom bgWhite style={[styles.maxHeight300]}>
          {!!title && (
            <FlexView padding16 borderBottom>
              <Text style={[S.text, S.text14, S.textDesc, S.textCenter]}>
                {title}
              </Text>
            </FlexView>
          )}
          <ScrollView>
            {_.map(list, ({ value, text, desc, disabled }) => {
              const textContainerStyle = {
                minWidth: 250,
                opacity: disabled ? 0.3 : 1,
              };
              return (
                <TouchableHighlight
                  key={value}
                  underlayColor={V.activeColor}
                  disabled={disabled}
                  onPress={() => onSelect(value)}>
                  <FlexView padding12 borderTop style={[textContainerStyle]}>
                    <Text style={[S.text16, S.textCenter]}>{text}</Text>
                    {desc && (
                      <Text style={[S.text, S.textDesc, S.textCenter]}>
                        {desc}
                      </Text>
                    )}
                  </FlexView>
                </TouchableHighlight>
              );
            })}
          </ScrollView>
        </FlexView>
        <View style={S.marginTop8} />
        <Button onPress={onCancel}>取消</Button>
      </FlexView>
    </Mask>
  );
};

ActionSheet.render = (props) => {
  return new Promise((resolve, reject) => {
    LayoutRoot.setComponent(
      LayoutRoot.TYPE.PopUp,
      <ActionSheet
        {...props}
        onSelect={(v) => {
          ActionSheet.hide();
          props.onSelect && props.onSelect(v);
          resolve(v);
        }}
        onCancel={() => {
          ActionSheet.hide();
          props.onCancel && props.onCancel();
          reject();
        }}
      />,
    );
  });
};

ActionSheet.hide = () => LayoutRoot.removeComponent(LayoutRoot.TYPE.PopUp);

const styles = StyleSheet.create({
  maxHeight300: {
    maxHeight: 300,
  },
});
export default ActionSheet;
