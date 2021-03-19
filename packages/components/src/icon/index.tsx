import React, { FC } from 'react';
import IconFont from './iconfont';
import glyphMap from './glyph_map';
import Variable from '../variable';
import { onPressType, ViewStyleType } from '../type';

export interface IconProps {
  name: keyof typeof glyphMap;
  size?: number;
  color?: string;
  onPress?: onPressType;
  style?: ViewStyleType;
}

interface IStaticIcon {
  glyphMap: typeof glyphMap;
}
const Icon: FC<IconProps> & IStaticIcon = ({
  name,
  size = Variable.fontSize14,
  color = Variable.defaultColor,
  onPress,
  style,
}) => {
  return (
    <IconFont
      name={name}
      size={size}
      color={color}
      style={style}
      onPress={onPress}
    />
  );
};

Icon.glyphMap = glyphMap;

export default Icon;
