/*
 * @Description: 需要用到的全局常量
 */
import { Dimensions, PixelRatio } from 'react-native'
// 屏幕大小 start
export const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get(
  'window',
)
const fontScale = PixelRatio.getFontScale()
// 设计稿宽高，dp
let designWidth = 360
let designHeight = 720
export const WINDOW_WIDTH_1 = WINDOW_WIDTH * 0.1
export const WINDOW_WIDTH_2 = WINDOW_WIDTH * 0.2
export const WINDOW_WIDTH_3 = WINDOW_WIDTH * 0.3
export const WINDOW_WIDTH_4 = WINDOW_WIDTH * 0.4
export const WINDOW_WIDTH_5 = WINDOW_WIDTH * 0.5
export const WINDOW_WIDTH_6 = WINDOW_WIDTH * 0.6
export const WINDOW_WIDTH_7 = WINDOW_WIDTH * 0.7
export const WINDOW_WIDTH_8 = WINDOW_WIDTH * 0.8
export const WINDOW_WIDTH_9 = WINDOW_WIDTH * 0.9

export const WINDOW_HEIGHT_1 = WINDOW_HEIGHT * 0.1
export const WINDOW_HEIGHT_2 = WINDOW_HEIGHT * 0.2
export const WINDOW_HEIGHT_3 = WINDOW_HEIGHT * 0.3
export const WINDOW_HEIGHT_4 = WINDOW_HEIGHT * 0.4
export const WINDOW_HEIGHT_5 = WINDOW_HEIGHT * 0.5
export const WINDOW_HEIGHT_6 = WINDOW_HEIGHT * 0.6
export const WINDOW_HEIGHT_7 = WINDOW_HEIGHT * 0.7
export const WINDOW_HEIGHT_8 = WINDOW_HEIGHT * 0.8
export const WINDOW_HEIGHT_9 = WINDOW_HEIGHT * 0.9

/**
 * 设置text
 * @param size  设计稿dp
 * @returns {Number} dp
 */
export function setSpText(size: number) {
  const scaleWidth = WINDOW_WIDTH / designWidth
  const scaleHeight = WINDOW_HEIGHT / designHeight
  const scale = Math.min(scaleWidth, scaleHeight)
  size = Math.round((size * scale) / fontScale + 0.5)
  return size
}
/**
 * 设置宽度
 * @param size  设计稿dp
 * @returns {Number} dp
 */
export function transformSize(size: number) {
  const scaleWidth = (size * WINDOW_WIDTH) / designWidth
  return Math.round(scaleWidth)
}
/**
 * 设置高度
 * @param size  设计稿dp
 * @returns {Number} dp
 */
export function scaleSizeH(size: number) {
  const scaleHeight = (size * WINDOW_HEIGHT) / designHeight
  return Math.round(scaleHeight)
}
/**
 * @description: 设置设计稿宽高
 * @param {*} width 设计稿宽度
 * @param {*} height 设计稿高度
 */
export function setDesign(width = 360, height = 720) {
  designWidth = width
  designHeight = height
}
