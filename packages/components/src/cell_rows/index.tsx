import React, { FC } from 'react'
import { View, Text } from 'react-native'
import S from '../styles'
import FlexView, { FlexViewProps } from '../flex_view'

interface CellRowProps extends FlexViewProps {
  label: string
}

interface CellRowsProps extends FlexViewProps {
  rows: CellRowProps[]
  isBetween?: boolean
}
export const CellRows: FC<CellRowsProps> = ({ rows, isBetween, ...res }) => {
  return (
    <FlexView {...res}>
      {rows.map((row, index) => (
        <CellRow
          {...row}
          key={row.label}
          justifyBetween={isBetween}
          marginBottom8={index !== rows.length - 1}
        />
      ))}
    </FlexView>
  )
}

export const CellRow: FC<CellRowProps> = ({ label, children, ...res }) => {
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
  )
}
