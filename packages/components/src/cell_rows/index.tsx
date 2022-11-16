import React, { FC, ReactNode } from 'react'
import { View, Text } from 'react-native'
import S from '../styles'
import FlexView, { FlexViewProps } from '../flex_view'
import { textStyleType } from '../type'

export interface CellRowProps extends FlexViewProps {
  label: string
  children: ReactNode
  hide?: boolean
  labelStyle?: textStyleType
  childrenStyle?: textStyleType
}

export interface CellRowsProps extends FlexViewProps {
  rows: CellRowProps[]
  commonLabelStyle?: textStyleType
  commonChildrenStyle?: textStyleType
  isBetween?: boolean
}
export const CellRows: FC<CellRowsProps> = ({
  rows,
  isBetween,
  commonLabelStyle,
  commonChildrenStyle,
  ...res
}) => {
  return (
    <FlexView {...res}>
      {rows
        .filter((item) => !item.hide)
        .map(({ labelStyle, childrenStyle, ...rest }, index, self) => (
          <CellRow
            {...rest}
            key={rest.label}
            labelStyle={[commonLabelStyle, labelStyle]}
            childrenStyle={[commonChildrenStyle, childrenStyle]}
            justifyBetween={isBetween}
            marginBottom8={index !== self.length - 1}
          />
        ))}
    </FlexView>
  )
}

export const CellRow: FC<CellRowProps> = ({
  label,
  labelStyle,
  childrenStyle,
  hide,
  children,
  ...res
}) => {
  if (hide) return null
  return (
    <FlexView row {...res} marginBottom8>
      <View>
        <Text style={[S.alignStart, labelStyle]}>
          {label}
          {res.justifyBetween ? null : '：'}
        </Text>
      </View>
      <FlexView row flex={!res.justifyBetween}>
        {typeof children === 'object' ? (
          children
        ) : (
          <Text style={childrenStyle}>{children}</Text>
        )}
      </FlexView>
    </FlexView>
  )
}
