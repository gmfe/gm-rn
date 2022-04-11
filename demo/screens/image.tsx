import React from 'react'
import { Text } from 'react-native'
import { Screen, S, FlexView, Image, V } from '../../packages/components/src'

function ImageDemo() {
  return (
    <Screen style={S.bgDefault}>
      <FlexView row alignCenter bgWhite paddingVertical12>
        <Text>基本使用, 直接传入{'uri={link}'}即可</Text>
        <Image
          uri="https://s3.ifanr.com/wp-content/uploads/2021/04/suhswhehcqx.jpeg!720"
          width={100}
        />
      </FlexView>
      <FlexView row alignCenter bgWhite paddingVertical12>
        <Text>点击放大预览， preview prop</Text>
        <FlexView border>
          <Image
            uri="https://s3.ifanr.com/wp-content/uploads/2021/04/suhswhehcqx.jpeg!720"
            width={100}
            preview
          />
        </FlexView>
      </FlexView>
      <FlexView row alignCenter bgWhite paddingVertical12>
        <Text>头像（circle: true ）:</Text>

        <Image
          uri="https://s3.ifanr.com/wp-content/uploads/2021/04/suhswhehcqx.jpeg!720"
          size={120}
          circle
          style={[
            {
              borderColor: V.blackColor,
              borderWidth: 1,
              marginLeft: 12,
              borderColor: V.primaryColor,
            },
          ]}
        />
      </FlexView>
    </Screen>
  )
}

export default ImageDemo
