/*
 * @Description: 块级容器
 */
import React, { FC, ReactNode } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { isString } from 'lodash';
import FlexView, { FlexViewProps } from '../flex_view';
import { ViewStyleType } from '../type';
import S from '../styles';

export interface BlockViewTitleProps {
  title?: ReactNode;
  titleStyle?: ViewStyleType;
}

export interface BlockViewProps extends BlockViewTitleProps, FlexViewProps {
  noRadius?: boolean;
  shadow?: boolean;
}
export const BlockView: FC<BlockViewProps> = ({
  title,
  titleStyle,
  style,
  noRadius,
  shadow,
  children,
  ...res
}) => {
  return (
    <FlexView
      padding16
      {...res}
      style={[
        blockViewstyles.container,
        noRadius && blockViewstyles.noRadius,
        shadow && blockViewstyles.shadow,
        style,
      ]}>
      {title && <BlockViewTitle title={title} titleStyle={titleStyle} />}
      {children}
    </FlexView>
  );
};

const BlockViewTitle: FC<BlockViewTitleProps> = ({ title, titleStyle }) => {
  return (
    <View>
      {isString(title) ? (
        <Text style={[S.textBold, S.text, titleStyle]}>{title}</Text>
      ) : (
        title
      )}
    </View>
  );
};
export const blockViewstyles = StyleSheet.create({
  container: {
    borderRadius: 5,
    backgroundColor: 'white',
  },
  borderTopLeftRadius0: {
    borderTopLeftRadius: 0,
  },
  borderTopRightRadius0: {
    borderTopRightRadius: 0,
  },
  borderTopRadius0: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  noRadius: {
    borderRadius: 0,
  },
  shadow: {
    elevation: 4,
  },
});
