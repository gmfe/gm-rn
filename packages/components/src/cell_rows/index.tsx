import React, { FC } from 'react';
import { View, Text } from 'react-native';
import  S  from '../styles';
import FlexView, {  IFlexViewProps } from '../flex_view';



interface ICellRowProps extends IFlexViewProps {
  label: string;
}

interface ICellRowsProps extends IFlexViewProps {
  rows: ICellRowProps[];
  isBetween?: boolean;
}
export const CellRows: FC<ICellRowsProps> = ({ rows, isBetween, ...res }) => {
  return (
    <FlexView {...res}>
      {rows.map((row, index) => (
        <CellRow {...row} key={row.label} justifyBetween={isBetween} marginBottom8={index !== rows.length - 1} />
      ))}
    </FlexView>
  );
};

export const CellRow: FC<ICellRowProps> = ({
  label,
  children,
  ...res
}) => {
  return (
    <FlexView row {...res} marginBottom8>
      <View>
        <Text style={[S.alignStart]}>
          {label}
          {res.justifyBetween ? null : '：'}
        </Text>
      </View>
      <FlexView row flex={!res.justifyBetween}>
        {typeof children === 'object' ? children : <Text>{children}</Text>}
      </FlexView>
    </FlexView>
  );
};
