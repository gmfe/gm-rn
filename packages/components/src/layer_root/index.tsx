import React, { FC, useState, useEffect, ReactNode } from 'react';
import { View } from 'react-native';
import FlexView from '../flex_view';

enum TYPE {
  POPUP = 'popup',
  DIALOG = 'dialog',
  TOAST = 'toast',
}
interface ILayoutState {
  [TYPE.POPUP]?: ReactNode;
  [TYPE.DIALOG]?: ReactNode;
  [TYPE.TOAST]?: ReactNode;
}

interface IStaticLayout {
  setComponent(type: TYPE, component: ReactNode): void;
  removeComponent(type: TYPE): void;
  TYPE: typeof TYPE;
}
type setComponentFuncType = null | IStaticLayout['setComponent'];
let setComponentFunc: setComponentFuncType = null;
const LayerRoot: FC & IStaticLayout = () => {
  const [state, setState] = useState<ILayoutState>({
    popup: null,
    dialog: null,
    toast: null,
  });
  useEffect(() => {
    setComponentFunc = (type, component) => {
      setState({ [type]: component });
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
LayerRoot.removeComponent = (type: TYPE) => {
  if (setComponentFunc) {
    setComponentFunc(type, null);
  } else {
    console.warn('LayerRoot is uninitialized');
  }
};

LayerRoot.TYPE = TYPE;

export default LayerRoot;
