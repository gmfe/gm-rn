/*
 * @Description: 分隔块级
 */
import React, { FC } from 'react';
import FlexView, { FlexViewProps } from '../flex_view';

interface GapBlockProps extends FlexViewProps {}

const GapBlock: FC<GapBlockProps> = ({ style, ...res }) => {
  return <FlexView paddingVertical8 {...res} style={[style]} />;
};

export default GapBlock;
