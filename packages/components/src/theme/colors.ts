const defaultColor = {
  primary: '#2268FD',
  secondary: '#556890',
  white: '#ffffff',

  success: '#52c41a',
  error: '#ff190c',
  warning: '#faad14',
  disabled: 'hsl(208, 8%, 90%)',
  border: '#E1E1E1',
};

export default {
  ...defaultColor,

  platform: {
    android: {
      primary: '#6cca28',
      secondary: '#556890',
      white: '#ffffff',

      success: '#52c41a',
      error: '#ff190c',
      warning: '#faad14',
      disabled: 'hsl(208, 8%, 90%)',
    },
    default: {
      ...defaultColor,
    },
  },
};
