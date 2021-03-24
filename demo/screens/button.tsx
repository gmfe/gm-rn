import React from 'react';
import { View, Text, ScrollView } from 'react-native';

import { Button, S } from '../../packages/components/src';

class ButtonWrap extends React.Component {
  static navigationOptions = {
    title: 'Button',
  };

  render() {
    return (
      <ScrollView style={[S.flex, S.bgWhite]}>
        <View style={S.padding8}>
          <Text>按钮类型</Text>

          <Button style={S.marginTop8}>默认按钮</Button>
          <Button type="defaultBg" style={S.marginTop8}>
            默认按钮
          </Button>
          <Button type="primaryBg" style={S.marginTop8}>
            主要按钮
          </Button>
          <Button type="warningBg" style={S.marginTop8}>
            警告按钮
          </Button>
          <Button type="secondaryBg" style={S.marginTop8}>
            警告按钮
          </Button>
          <Text>朴素按钮</Text>

          <Button style={S.marginTop8}>默认按钮</Button>
          <Button type="primary" plain style={S.marginTop8}>
            主要按钮
          </Button>
          <Button type="warning" plain style={S.marginTop8}>
            警告按钮
          </Button>

          <Text>禁用</Text>

          <Button disabled style={S.marginTop8}>
            禁用按钮
          </Button>
          <Button type="primary" disabled style={S.marginTop8}>
            禁用按钮
          </Button>
          <Button type="warning" disabled style={S.marginTop8}>
            禁用按钮
          </Button>
          <Button type="secondary" disabled style={S.marginTop8}>
            禁用按钮
          </Button>
          <Button type="primaryBg" disabled style={S.marginTop8}>
            禁用按钮
          </Button>
          <Button type="defaultBg" disabled style={S.marginTop8}>
            禁用按钮
          </Button>
          <Button type="warningBg" disabled style={S.marginTop8}>
            禁用按钮
          </Button>
          <Button type="secondaryBg" disabled style={S.marginTop8}>
            禁用按钮
          </Button>
          <Text>按钮尺寸</Text>

          <View style={[S.flex, S.row]}>
            <Button mini style={S.marginTop8}>
              小号按钮
            </Button>
          </View>
          <Text>loading</Text>
          <Button style={S.marginTop8} loading>
            loading
          </Button>
          <Button type="primary" style={S.marginTop8} loading>
            loading
          </Button>
          <Button type="warning" style={S.marginTop8} loading>
            loading
          </Button>
          <Button type="secondary" style={S.marginTop8} loading>
            loading
          </Button>
          <Button type="primaryBg" style={S.marginTop8} loading>
            loading
          </Button>
          <Button type="defaultBg" style={S.marginTop8} loading>
            loading
          </Button>
          <Button type="warningBg" style={S.marginTop8} loading>
            loading
          </Button>
          <Button type="secondaryBg" style={S.marginTop8} loading>
            loading
          </Button>

          <Text>loading</Text>
          <Button style={S.marginTop8} circle={false}>
            radius: 5
          </Button>

          <Button type="primary" style={S.marginTop8} circle={false}>
            radius: 5
          </Button>
          <Button type="warning" style={S.marginTop8} circle={false}>
            radius: 5
          </Button>

          <Button type="secondary" style={S.marginTop8} circle={false}>
            radius: 5
          </Button>

          <Button type="primaryBg" style={S.marginTop8} circle={false}>
            radius: 5
          </Button>

          <Button type="warningBg" style={S.marginTop8} circle={false}>
            radius: 5
          </Button>
          <Button type="secondaryBg" style={S.marginTop8} circle={false}>
            radius: 5
          </Button>
        </View>
      </ScrollView>
    );
  }
}

export default ButtonWrap;
