/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import { Button, View } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { enableScreens } from 'react-native-screens';
import { Screen } from '../packages/components/src';
import { LayerRoot } from '../packages/components/src';
import ButtonDemo from './screens/button';
import CellDemo from './screens/cell';
import IconDemo from './screens/icon';
import DialogDemo from './screens/dialog';
import ActionSheetDemo from './screens/action_sheet';
import PopupDemo from './screens/popup';
import FormDemo from './screens/form';
import ToastDemo from './screens/toast';
import _ from 'lodash';
import RequestDemo from './screens/request';
import SearchBarDemo from './screens/search_bar';
import PdaScannerDemo from './screens/pda_scanner';
import CameraDemo from './screens/camera';

// global.origin = 'https://x.guanmai.cn';

enableScreens();

export type RootParamList = {
  mainStack: undefined;
};

export type PrimaryParamList = {
  [key: string]: undefined;
};

const Stack = createStackNavigator<RootParamList>();
const MainStack = createStackNavigator<PrimaryParamList>();

const pages = {
  button: ButtonDemo,
  icon: IconDemo,
  action_sheet: ActionSheetDemo,
  cell: CellDemo,
  dialog: DialogDemo,
  popup: PopupDemo,
  form: FormDemo,
  toast: ToastDemo,
  request: RequestDemo,
  search_bar: SearchBarDemo,
  pda_scanner: PdaScannerDemo,
  camera: CameraDemo,
};

const Home = () => {
  const navigation = useNavigation();

  const onPress = (name: string) => {
    navigation.navigate(name);
  };

  return (
    <Screen preset="scroll">
      {_.map(pages, (value, key) => (
        <View key={key} style={{ paddingVertical: 5 }}>
          <Button title={key} onPress={() => onPress(key)} />
        </View>
      ))}
    </Screen>
  );
};

function MainNavigator() {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <MainStack.Screen name="home" component={Home} />
      {_.map(pages, (value, key) => (
        <MainStack.Screen key={key} name={key} component={value} />
      ))}
    </MainStack.Navigator>
  );
}

const RootStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="mainStack"
        component={MainNavigator}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
      <LayerRoot />
    </View>
  );
};

export default App;
