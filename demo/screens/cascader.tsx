import React, { useState } from 'react'
import { Text } from 'react-native'
import { Cascader, FlexView, S, Button, Toast } from '../../packages/components'
export default function CascaderDemo() {
  const [selected, setSelected] = useState('')
  const [close, setClose] = useState(false)
  return (
    <FlexView bgWhite flex>
      <Button
        type="primaryBg"
        style={{ width: 100, alignSelf: 'center' }}
        onPress={() => setClose((preStatus) => !preStatus)}>
        {close ? '关闭' : '显示'} x
      </Button>
      <Cascader
        onChange={(value) => setSelected(value.join('/'))}
        onClose={close ? () => Toast.info('点击了关闭') : undefined}
        options={[
          {
            label: '广东省',
            value: '广东省',
            children: [
              {
                label: '广州市',
                value: '广州市',
                children: [
                  {
                    label: '天河区',
                    value: '天河区',
                  },
                  {
                    label: '黄浦区',
                    value: '黄浦区',
                  },
                  {
                    label: '番禺区',
                    value: '番禺区',
                  },
                ],
              },
              {
                label: '深圳市',
                value: '深圳市',
                children: [
                  {
                    label: '福田区',
                    value: '福田区',
                  },
                  {
                    label: '宝安区',
                    value: '宝安区',
                  },
                  {
                    label: '南山区',
                    value: '南山区',
                  },
                ],
              },
              {
                label: '佛山市',
                value: '佛山市',
                children: [
                  {
                    label: '三水区',
                    value: '三水区',
                  },
                  {
                    label: '顺德区',
                    value: '顺德区',
                    children: [
                      {
                        label: '容桂',
                        value: '容桂',
                      },
                      {
                        label: '大良',
                        value: '大良',
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            label: '福建省',
            value: '福建省',
            children: [
              {
                label: '福州市',
                value: '福州市',
              },
              {
                label: '厦门市',
                value: '厦门市',
              },
              {
                label: '泉州市',
                value: '泉州市',
              },
            ],
          },
          {
            label: '广西省',
            value: '广西省',
            children: [
              {
                label: '柳州市',
                value: '柳州市',
              },
              {
                label: '南宁市',
                value: '南宁市',
              },
            ],
          },
        ]}
      />
      <Text style={[S.textCenter]}>{selected}</Text>
    </FlexView>
  )
}
