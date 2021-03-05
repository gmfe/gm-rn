import React from 'react';
import { Text } from 'react-native';

import { Screen, Button, S } from '../../packages/components/src';
import PdaScanner from '@gm-rn/pda-scanner';

class Component extends React.Component<{}, { result: string }> {
  static navigationOptions = {
    title: 'Pda Scanner',
  };

  constructor(props: any) {
    super(props);
    this.state = {
      result: '',
    };
  }

  componentWillUnmount() {
    PdaScanner.removeListener();
  }

  render() {
    return (
      <Screen>
        <Button
          style={S.marginTop8}
          type={'default'}
          onPress={() =>
            PdaScanner.initScanner((error: string, res: string) =>
              console.log(error, res),
            )
          }>
          初始化扫描头
        </Button>

        <Button
          style={S.marginTop8}
          type={'default'}
          onPress={() => PdaScanner.recycleScanner()}>
          释放扫描头
        </Button>

        <Button
          style={S.marginTop8}
          type={'default'}
          onPress={() => PdaScanner.singleScan(true)}>
          启动扫描
        </Button>
        <Text style={{ textAlign: 'center' }}>
          {'一般pda提供有启动扫码头的按键，不需要软件主动提供来出发singleScan'}
        </Text>

        <Button
          style={S.marginTop8}
          type={'default'}
          onPress={() =>
            PdaScanner.addListener((result: string) => {
              this.setState({
                result,
              });
            })
          }>
          监听结果
        </Button>

        <Button
          style={S.marginTop8}
          type={'default'}
          onPress={() => PdaScanner.removeListener()}>
          移除监听
        </Button>
        <Text style={{ textAlign: 'center' }}>{this.state.result}</Text>
      </Screen>
    );
  }
}

export default Component;
