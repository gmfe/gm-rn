/*
 * @Description: 封装TextInput
 */
import React, { ReactNode, useState, forwardRef } from 'react'
import { Text, TextInput, TextInputProps } from 'react-native'
import _ from 'lodash'

import FlexView from '../flex_view'
import Icon from '../icon'

export interface InputProps extends TextInputProps {
  label?: ReactNode
  underline?: boolean
}

const Input = forwardRef<TextInput, InputProps>(
  ({ label, underline, ...res }, ref) => {
    const { textContentType } = res

    const [showPassword, setShowPassword] = useState(false)

    function toggle() {
      setShowPassword((isShowPassword) => !isShowPassword)
    }
    function renderInput(type: TextInputProps['textContentType']) {
      const tempRes = _.omit(res, ['underlineColorAndroid'])

      if (type === 'password') {
        tempRes.textContentType = showPassword ? 'none' : 'password'
        tempRes.secureTextEntry = !showPassword
      }
      return (
        <>
          {label && (typeof label === 'object' ? label : <Text>{label}</Text>)}
          <TextInput {...tempRes} ref={ref} />
          {textContentType === 'password' && (
            <Icon
              name={showPassword ? 'rn-password-open' : 'password-closecopy'}
              onPress={toggle}
            />
          )}
        </>
      )
    }
    return (
      <FlexView row justifyBetween alignCenter borderBottom={underline}>
        {renderInput(textContentType)}
      </FlexView>
    )
  },
)
export default Input
