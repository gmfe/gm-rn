import React, { FC, useState, useEffect, useRef, ReactNode } from 'react'
import {
  StyleSheet,
  Animated,
  Easing,
  Text,
  Image,
  AppState,
  ImageSourcePropType,
} from 'react-native'
import { RNCamera, RNCameraProps } from 'react-native-camera'
import { ViewStyleType } from '../type'
import FlexView from '../flex_view'
import S from '../styles'
import _ from 'lodash'
const RNCAMERA_CONSTANT = RNCamera.Constants

export interface QRScannerRectViewProps {
  cornerOffsetSize?: number // 转角偏移距离
  scanBarAnimateTime?: number // 扫描动画时长

  maskColor?: string // 遮罩颜色
  hintText?: string // 提示文字

  isShowCorner?: boolean // 是否显示转角
  isShowScanBar?: boolean // 是否显示扫描条
  isSCanBarAnimateReverse?: boolean // 扫描条是否来回移动

  scanBarImage?: ImageSourcePropType // 自定义扫描条图片
  scanBarStyle?: typeof styles.defaultScanBar & {
    height: number
  } // 扫描条样式
  rectStyle?: ViewStyleType // 扫码框样式
  cornerStyle?: ViewStyleType // 转角样式
  hintTextStyle?: ViewStyleType // 提示文字样式
}
export const QRScannerRectView: FC<QRScannerRectViewProps> = ({
  cornerOffsetSize = 0,
  scanBarAnimateTime = 3000,

  maskColor = '#0000004D',
  hintText = '将二维码/条码放入框内，即可自动扫描',

  isShowScanBar = true,
  isShowCorner = true,
  isSCanBarAnimateReverse,

  scanBarImage,

  rectStyle,
  cornerStyle,
  scanBarStyle,
  hintTextStyle,
}) => {
  const [state] = useState({
    animatedValue: new Animated.Value(0),
  })
  const scanBarAnimationRef = useRef<Animated.CompositeAnimation>()
  const innerRectStyle = Object.assign(styles.defaultRect, rectStyle)
  const innerCornerStyle = Object.assign(styles.defaultCorner, cornerStyle)
  const innerScanBarStyle = Object.assign(styles.defaultScanBar, scanBarStyle)
  const innerHintTextStyle = Object.assign(
    styles.defaultHintText,
    hintTextStyle,
  )

  useEffect(() => {
    scanBarMove()
    return scanBarAnimationRef.current?.stop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // 扫描动画
  function scanBarMove() {
    // 扫描条高度
    const scanBarHeight = isShowScanBar ? innerScanBarStyle?.height || 4 : 0
    // 开始扫描的位置
    const startValue = innerCornerStyle.borderWidth
    // 单方向扫描到达位置
    const endValue =
      innerRectStyle.height -
      (innerRectStyle.borderWidth +
        cornerOffsetSize +
        innerCornerStyle.borderWidth) -
      scanBarHeight
    // 如果来回扫码
    if (isSCanBarAnimateReverse) {
      scanBarAnimationRef.current = Animated.sequence([
        Animated.timing(state.animatedValue, {
          toValue: endValue,
          duration: scanBarAnimateTime,
          easing: Easing.linear,
          isInteraction: false,
          useNativeDriver: true,
        }),
        Animated.timing(state.animatedValue, {
          toValue: startValue,
          duration: scanBarAnimateTime,
          easing: Easing.linear,
          isInteraction: false,
          useNativeDriver: true,
        }),
      ])
      scanBarAnimationRef.current?.start(scanBarMove)
    } else {
      state.animatedValue.setValue(startValue) //重置Rotate动画值为0
      scanBarAnimationRef.current = Animated.timing(state.animatedValue, {
        toValue: endValue,
        duration: scanBarAnimateTime,
        easing: Easing.linear,
        isInteraction: false,
        useNativeDriver: true,
      })
      scanBarAnimationRef.current.start(scanBarMove)
    }
  }

  //获取背景颜色
  function getBackgroundColor() {
    return { backgroundColor: maskColor }
  }

  //获取扫描框背景大小
  function getRectSize() {
    return _.pick(innerRectStyle, ['height', 'width'])
  }

  //获取扫描框偏移量
  function getRectOffsetHeight() {
    return { height: innerRectStyle.marginBottom }
  }

  //获取扫描框边框大小
  function getBorderStyle() {
    return {
      height: innerRectStyle.height - cornerOffsetSize * 2,
      width: innerRectStyle.width - cornerOffsetSize * 2,
      borderWidth: innerRectStyle.borderWidth,
      borderColor: innerRectStyle.borderColor,
    }
  }

  //获取扫描框转角的颜色
  function getCornerStyle() {
    return _.pick(innerCornerStyle, [
      'height',
      'width',
      'borderColor',
      'borderWidth',
    ])
  }

  function getScanImageWidth() {
    return innerRectStyle.width - innerScanBarStyle.marginHorizontal * 2
  }

  //绘制扫描线
  function renderScanBar() {
    if (!isShowScanBar) {
      return
    }
    const scanBarImageStyle = [
      innerScanBarStyle,
      {
        resizeMode: 'contain',
        backgroundColor: 'transparent',
        width: getScanImageWidth(),
      },
    ]
    const flexViewStyle = [{ height: 4 }, innerScanBarStyle]
    return scanBarImage ? (
      <Image source={scanBarImage} style={scanBarImageStyle} />
    ) : (
      <FlexView style={flexViewStyle} />
    )
  }

  const animatedStyle = {
    transform: [{ translateY: state.animatedValue }],
  }

  return (
    <FlexView flex bottom0>
      {/*扫描框上方遮罩*/}
      <FlexView flex style={[getBackgroundColor()]} />
      <FlexView row>
        {/*扫描框左侧遮罩*/}
        <FlexView flex style={[getBackgroundColor()]} />
        {/*扫描框*/}
        <FlexView justifyCenter alignCenter style={[getRectSize()]}>
          {/*扫描框边线*/}
          <FlexView style={getBorderStyle()}>
            <Animated.View style={[animatedStyle]}>
              {renderScanBar()}
            </Animated.View>
          </FlexView>
          {/*/!*扫描框转角-左上角*!/*/}
          {isShowCorner && (
            <FlexView
              borderRight0
              borderBottom0
              style={[getCornerStyle(), styles.topLeftCorner]}
            />
          )}

          {/*扫描框转角-右上角*/}
          {isShowCorner && (
            <FlexView
              borderLeft0
              borderBottom0
              style={[getCornerStyle(), styles.topRightCorner]}
            />
          )}

          {/*扫描框转角-左下角*/}
          {isShowCorner && (
            <FlexView
              borderRight0
              borderTop0
              style={[getCornerStyle(), styles.bottomLeftCorner]}
            />
          )}

          {/*扫描框转角-右下角*/}
          {isShowCorner && (
            <FlexView
              borderLeft0
              borderTop0
              style={[getCornerStyle(), styles.bottomRightCorner]}
            />
          )}
        </FlexView>
        {/*扫描框右侧遮罩*/}
        <FlexView flex style={[getBackgroundColor()]} />
      </FlexView>
      {/*扫描框下方遮罩*/}
      <FlexView flex alignCenter style={[getBackgroundColor()]}>
        <Text style={innerHintTextStyle} numberOfLines={1}>
          {hintText}
        </Text>
      </FlexView>
      <FlexView style={[getBackgroundColor(), getRectOffsetHeight()]} />
    </FlexView>
  )
}

/**
 * Desc：扫码界面相机层
 */
export interface QRScannerViewProps extends QRScannerRectViewProps {
  scanInterval?: number
  torchOn?: boolean
  userFront?: boolean // 是否使用前置摄像头
  renderHeaderView?(): ReactNode
  renderFooterView?(): ReactNode
  onScanResult: RNCameraProps['onBarCodeRead']
}
const QRScannerView: FC<QRScannerViewProps> = ({
  scanInterval = 2000,
  torchOn,
  userFront,
  renderHeaderView,
  renderFooterView,
  onScanResult,
  ...res
}) => {
  const rnCameraRef = useRef<RNCamera>(null)
  useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange)
    const rnCameraRefCurrent = rnCameraRef.current
    return () => {
      AppState.removeEventListener('change', handleAppStateChange)
      rnCameraRefCurrent?.pausePreview()
    }
  }, [])

  function handleAppStateChange(currentAppState: string) {
    if (currentAppState !== 'active') {
      rnCameraRef.current?.pausePreview()
    }
  }
  function onBarCodeRead(): RNCameraProps['onBarCodeRead'] {
    return _.throttle(onScanResult!, scanInterval, {
      trailing: false,
    })
  }

  return (
    <RNCamera
      ref={rnCameraRef}
      captureAudio={false}
      type={RNCAMERA_CONSTANT.Type[userFront ? 'front' : 'back']}
      flashMode={RNCAMERA_CONSTANT.FlashMode[torchOn ? 'torch' : 'off']}
      onBarCodeRead={onBarCodeRead()}
      style={S.flex}>
      {/*绘制扫描遮罩*/}
      <QRScannerRectView {...res} />
      {/*绘制顶部标题栏组件*/}
      {renderHeaderView && (
        <FlexView style={[styles.topContainer]}>{renderHeaderView()}</FlexView>
      )}
      {/*绘制底部操作栏*/}
      {renderFooterView && (
        <FlexView style={[styles.bottomContainer]}>
          {renderFooterView()}
        </FlexView>
      )}
    </RNCamera>
  )
}

const styles = StyleSheet.create({
  topContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  topLeftCorner: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  topRightCorner: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  bottomLeftCorner: {
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  bottomRightCorner: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  defaultRect: {
    height: 300,
    width: 300,
    borderWidth: 0,
    borderColor: '#000000',
    marginBottom: 0,
  },
  defaultCorner: {
    height: 32,
    width: 32,
    borderWidth: 6,
    borderColor: '#1A6DD5',
  },
  defaultScanBar: {
    marginHorizontal: 8,
    borderRadius: 2,
    backgroundColor: '#1A6DD5',
  },
  defaultHintText: {
    color: '#fff',
    fontSize: 14,
    backgroundColor: 'transparent',
    marginTop: 32,
  },
})
export default QRScannerView
