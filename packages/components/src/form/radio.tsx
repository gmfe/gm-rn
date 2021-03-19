import React, { FC } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';
import Icon from '../icon';
import S from '../styles';
import V from '../variable';
import { textStyleType, ViewStyleType } from '../type';

const styles = StyleSheet.create({
  font: {
    paddingTop: 2,
    fontSize: V.fontSize14 * 1.3,
    marginRight: 2,
  },
});
export interface RadioProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  color?: string;
  style?: ViewStyleType;
  textStyle?: textStyleType;
}
const Radio: FC<RadioProps> = ({
  onChange,
  children,
  style,
  textStyle,
  color,
  checked,
  ...rest
}) => {
  function handleChange() {
    onChange(!checked);
  }

  return (
    <TouchableHighlight onPress={handleChange} underlayColor={V.activeColor}>
      <View {...rest} style={[S.row, S.alignCenter, style]}>
        {checked ? (
          <Icon
            name="success-circle"
            color={color || V.primaryColor}
            style={styles.font}
          />
        ) : (
          <Icon name="circle" color={V.descColor} style={styles.font} />
        )}
        {!(children && children.type) ? (
          <Text style={[S.text, textStyle]}>{children}</Text>
        ) : (
          children
        )}
      </View>
    </TouchableHighlight>
  );
};

Radio.propTypes = {
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  color: PropTypes.string,
};

export default Radio;
