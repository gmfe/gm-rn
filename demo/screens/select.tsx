import React, { useState } from 'react'
import { Text } from 'react-native'
import { Select, FlexView, S } from '../../packages/components'
export default function SelectsDemo() {
  const [value, setValue] = useState('1')
  return (
    <FlexView bgWhite>
      <Text style={[S.textCenter]}>基本使用</Text>
      <Select
        value={value}
        onChange={(selectedValue) => setValue(selectedValue)}
        data={[
          { value: '1', label: 'label 1' },
          { value: '2', label: 'label 2' },
          { value: '3', label: 'label 3' },
          { value: '4', label: 'label 4' },
          { value: '5', label: 'label 5' },
          { value: '6', label: 'label 6' },
          { value: '7', label: 'label 7' },
        ]}
      />
      <Text style={[S.textCenter]}>选项居中(prop: itemCenter = true)</Text>
      <Select
        itemCenter
        value={value}
        onChange={(selectedValue) => setValue(selectedValue)}
        data={[
          { value: '1', label: 'label 1' },
          { value: '2', label: 'label 2' },
          { value: '3', label: 'label 3' },
          { value: '4', label: 'label 4' },
          { value: '5', label: 'label 5' },
          { value: '6', label: 'label 6' },
          { value: '7', label: 'label 7' },
        ]}
      />
    </FlexView>
  )
}
