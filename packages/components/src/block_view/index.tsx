/*
 * @Description: 块级容器
 */
import React, { FC, ReactNode } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { isString } from 'lodash';
import FlexView, {  IFlexViewProps } from '../flex_view';
import  { ViewStyleType } from '../type';
import S from '../styles';


export interface IBlockViewTitleProps {
  title?: ReactNode;
  titleStyle?: ViewStyleType;
}

export interface IBlockViewProps extends IBlockViewTitleProps, IFlexViewProps {
}
export const BlockView: FC<IBlockViewProps> = ({
  title,
  titleStyle,
  style,
  children,
  ...res
}) => {
  return (
    <FlexView padding16 {...res} style={[blockViewstyles.container, style]}>
      {title && <BlockViewTitle title={title} titleStyle={titleStyle} />}
      {children}
    </FlexView>
  );
};

const BlockViewTitle: FC<IBlockViewTitleProps> = ({ title, titleStyle }) => {
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
    borderRadius: 16,
    backgroundColor: 'white',
    elevation: 4,
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
});
