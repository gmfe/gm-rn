/*
 * @Description: flex
 */
import React, { FC } from 'react';
import { View, ViewProps } from 'react-native';
import  S  from '../styles';

import { ViewStyleType } from '../type';

type flexOptionType = keyof typeof S;
type flexBooleanType = Partial<Record<flexOptionType, boolean>>;
export interface IFlexViewProps extends  flexBooleanType, ViewProps { }

const FlexView: FC<IFlexViewProps> = ({
  style,
  children,
  ...res
}) => {
  // 获取样式
  const styleBooleanObject = res;
  const styles = getStyle(styleBooleanObject);

  return <View {...res} style={[styles, style]}>{children}</View>;
};

/**
 * @description: 根据配置获取样式
 */
function getStyle(styleBooleanObject: flexBooleanType): ViewStyleType {
  // 去掉配置为false
  Object.keys(styleBooleanObject).forEach((key) => {
    const tempKey = key as flexOptionType;
    if (!styleBooleanObject[tempKey]) {
      delete styleBooleanObject[tempKey];
    }
  });
  const styleArr: ViewStyleType = [];
  const styleKeys = Object.keys(styleBooleanObject);
  // 添加设置为true的样式
  styleKeys.forEach((key) => styleArr.push((S[key as flexOptionType])));
  return styleArr;
};

export default FlexView

