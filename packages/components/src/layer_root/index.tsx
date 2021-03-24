import React, { FC, useState, useEffect, ReactNode } from 'react';
import { View } from 'react-native';
import FlexView from '../flex_view';

enum LayoutType {
  PopUp = 'popup',
  Dialog = 'dialog',
  Toast = 'toast',
}
export type LayoutStateType = {
  [key in LayoutType]?: ReactNode;
};

interface LayoutStatic {
  setComponent(type: LayoutType, component: ReactNode): void;
  removeComponent(type: LayoutType): void;
  TYPE: typeof LayoutType;
}
type setComponentFuncType = null | LayoutStatic['setComponent'];
let setComponentFunc: setComponentFuncType = null;
const LayerRoot: FC & LayoutStatic = () => {
  const [state, setState] = useState<LayoutStateType>({
    popup: null,
    dialog: null,
    toast: null,
  });

  useEffect(() => {
    setComponentFunc = (type, component) => {
      setState((oldState) => ({ ...oldState, [type]: component }));
    };
    return () => {
      setComponentFunc = null;
    };
  }, []);

  const { popup, dialog, toast } = state;

  if (![popup, dialog, toast].some(Boolean)) {
    return null;
  }

  return (
    <FlexView top0 left0 right0 bottom0>
      <View>{popup}</View>
      <View>{dialog}</View>
      <View>{toast}</View>
    </FlexView>
  );
};

LayerRoot.setComponent = (type, com) => {
  if (setComponentFunc) {
    LayerRoot.removeComponent(type);
    setComponentFunc(type, com);
  } else {
    console.warn('LayerRoot is uninitialized');
  }
};
LayerRoot.removeComponent = (type: LayoutType) => {
  if (setComponentFunc) {
    setComponentFunc(type, null);
  } else {
    console.warn('LayerRoot is uninitialized');
  }
};

LayerRoot.TYPE = LayoutType;

export default LayerRoot;
