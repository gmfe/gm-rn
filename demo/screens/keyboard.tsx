import React, { useState } from 'react'
import { Text } from 'react-native'
import {
  Screen,
  Keyboard,
  S,
  Toast,
  FlexView,
  Input,
  Button,
} from '../../packages/components'
const PRECISIONS = [2, 4, 6]
const MAXLENS = [10, 12, 14]
function KeyboardDemo() {
  const [value, setValue] = useState('0')
  const [precision, setPrecision] = useState(4)
  const [maxLen, setmaxLen] = useState(14)
  return (
    <Screen style={S.bgDefault}>
      <Text
        style={[
          S.textBlack,
          S.textCenter,
          S.marginBottom12,
          S.bgWhite,
          S.paddingVertical8,
        ]}>
        数值为: {value}
      </Text>
      <FlexView row paddingVertical12 alignCenter>
        <Text>选择精度precision</Text>
        <FlexView row flex justifyAround>
          {PRECISIONS.map((item) => (
            <Button
              key={item}
              type={precision === item ? 'primaryBg' : 'default'}
              onPress={() => {
                setPrecision(item)
                setValue('0')
              }}
              style={[S.border]}>
              {item}
            </Button>
          ))}
        </FlexView>
      </FlexView>
      <FlexView row paddingVertical12 alignCenter>
        <Text>选择最大长度 maxLen</Text>
        <FlexView row flex justifyAround>
          {MAXLENS.map((item) => (
            <Button
              key={item}
              type={maxLen === item ? 'primaryBg' : 'default'}
              onPress={() => {
                setmaxLen(item)
                setValue('0')
              }}
              style={[S.border]}>
              {item}
            </Button>
          ))}
        </FlexView>
      </FlexView>
      <Keyboard
        onChange={setValue}
        value={value}
        precision={precision}
        onConfirm={(comfirmValue) => Toast.info(comfirmValue)}
        maxLen={maxLen}
      />
    </Screen>
  )
}

export default KeyboardDemo
