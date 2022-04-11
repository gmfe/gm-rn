/*
 * @Description: 根据原生Image封装
 */
import React, { ReactElement, useMemo, useState } from 'react'
import {
  StyleSheet,
  Image as BaseImage,
  ImageProps as BaseImageProps,
  TouchableOpacity,
} from 'react-native'

import Icon from '../icon/iconfont'
import Mask from '../mask'
import { WINDOW_HEIGHT_5, WINDOW_WIDTH } from '../global_constant'
import S from '../styles'

interface ImageProps extends Omit<BaseImageProps, 'source'> {
  uri?: string
  size?: number
  circle?: boolean
  source?: BaseImageProps['source']
  /** 是否放大预览，true的话点击后会自动放大 */
  preview?: boolean
  width?: number
  height?: number
}
interface CircleImageProps extends ImageProps {
  /** 圆的width和height都等于size */
  size: number
  /** 是否是圆的 */
  circle: true
}
export function Image(props: ImageProps): ReactElement
export function Image(props: CircleImageProps): ReactElement
export function Image({
  uri,
  size,
  circle,
  style,
  source,
  preview,
  width,
  height,
  ...res
}: ImageProps | CircleImageProps) {
  const [visible, setVisible] = useState(false)
  const allStyle = [
    circle && ImageStyles.circle,
    circle && { width: size, height: size },
    style,
  ]
  if (width !== undefined) {
    const widthOrHeight = { width, height: height || width }
    allStyle.unshift(widthOrHeight)
  }
  source = useMemo(() => {
    if (source) return source
    return { uri }
  }, [source, uri])

  const hide = () => setVisible(false)
  const show = () => setVisible(true)
  if (preview) {
    return (
      <>
        <TouchableOpacity activeOpacity={1} onPress={show}>
          <BaseImage source={source} style={allStyle} {...res} />
        </TouchableOpacity>
        <Mask
          animationIn="zoomIn"
          isVisible={visible}
          backdropOpacity={1}
          onCancel={hide}
          style={[S.row, S.justifyCenter]}>
          <Icon
            name="rn-pda-close"
            style={[S.positionAbsolute, ImageStyles.closeIcon]}
            color="rgba(255, 255, 255, .57)"
            size={16}
            onPress={hide}
          />
          <BaseImage
            source={source}
            resizeMode="contain"
            style={[
              // allStyle,
              { width: WINDOW_WIDTH, height: WINDOW_HEIGHT_5 },
              // @ts-ignore
              S.alignSelfCenter,
            ]}
            {...res}
          />
        </Mask>
      </>
    )
  }
  return <BaseImage source={source} style={allStyle} {...res} />
}

const ImageStyles = StyleSheet.create({
  circle: {
    borderRadius: 9999,
    overflow: 'hidden',
  },
  closeIcon: {
    right: 22,
    top: 22,
  },
})
