import React, { FC } from 'react';
import { Text, ActivityIndicator } from 'react-native';
import Icon from '../icon';
import LayerRoot from '../layer_root';
import FlexView from '../flex_view';
import S from '../styles';

interface IToastProps {
  icon: keyof typeof Icon.glyphMap;
}

export type ToastStaticOption =
  | {
      time?: number;
      children: string;
    }
  | string;

export interface ToastStatic {
  clear: () => void;
  tip: (option: ToastStaticOption, icon: IToastProps['icon']) => void;
  success: (option: ToastStaticOption) => void;
  info: (option: ToastStaticOption) => void;
  warning: (option: ToastStaticOption) => void;
  danger: (option: ToastStaticOption) => void;
  loading: (option: ToastStaticOption) => void;
}
const renderIcon = (icon: IToastProps['icon']) => {
  if (icon === 'loading') {
    return <ActivityIndicator color="#fff" style={[S.marginRight4]} />;
  }

  return <Icon name={icon} style={[S.marginRight4, S.textWhite]} />;
};

const Toast: FC<IToastProps> & ToastStatic = ({ icon, children }) => {
  const containerStyle = [{ top: 200 }];
  const textContainerStyle = [
    {
      padding: 10,
      marginHorizontal: 60,
      borderRadius: 5,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
  ];
  return (
    <FlexView alignCenter justifyCenter left0 right0 style={containerStyle}>
      <FlexView
        row
        alignCenter
        paddingHorizontal16
        paddingHorizontal20
        marginHorizontal20
        style={textContainerStyle}>
        {icon && renderIcon(icon)}
        <Text style={[S.text, S.textWhite]}>{children}</Text>
      </FlexView>
    </FlexView>
  );
};

const processOptions = (options: ToastStaticOption) => {
  if (typeof options === 'string') {
    options = {
      children: options,
    };
  }
  return options || {};
};

let timer: NodeJS.Timeout | number;

// 静态方法支持time参数。 false 或者 数字
// Object.assign(Toast, {
Toast.clear = () => {
  LayerRoot.removeComponent(LayerRoot.TYPE.TOAST);
};
Toast.tip = (options, icon) => {
  clearTimeout(timer as number);
  options = processOptions(options);
  LayerRoot.setComponent(
    LayerRoot.TYPE.TOAST,
    <Toast icon={icon} {...options} />,
  );
  if (options.time !== 0) {
    timer = setTimeout(() => {
      LayerRoot.removeComponent(LayerRoot.TYPE.TOAST);
    }, options.time || 2000);
  }
};
Toast.success = (options) => {
  Toast.tip(options, 'success-circle');
};
Toast.info = (options) => {
  Toast.tip(options, 'info-circle');
};
Toast.warning = (options) => {
  Toast.tip(options, 'warning-circle');
};
Toast.danger = (options) => {
  Toast.tip(options, 'close-circle');
};
Toast.loading = (options) => {
  options = processOptions(options);
  Toast.tip(Object.assign({ children: '加载中...' }, options), 'loading');
};

export default Toast;
