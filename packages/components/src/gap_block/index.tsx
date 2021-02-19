/*
 * @Description: 分隔块级
 */
import React, { FC } from 'react';
import FlexView, { IFlexViewProps } from '../flex_view';


interface IGapBlockProps extends IFlexViewProps{};

const GapBlock: FC<IGapBlockProps> = ({ style, ...res }) => {
  return <FlexView paddingVertical8 {...res} style={[style]} />;
};

export default GapBlock;
