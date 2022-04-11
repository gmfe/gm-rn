import S from '../styles'
import { transformSize } from '../global_constant'

/** 数字按钮 */
export const defaultDigitalKeys = [
  /**
   *  生成 7 8 9
   *      4 5 6
   *      1 2 3
   *      0
   */
  ['7', '8', '9'],
  ['4', '5', '6'],
  ['1', '2', '3'],
  [
    { label: '0', style: { width: transformSize(169) } },

    {
      label: '.',
      fn: (value = '') => {
        if (value === '') {
          return '0.'
        }
        if (value.split('').filter((c) => c === '.').length > 0) {
          return value
        } else {
          return value + '.'
        }
      },
    },
  ],
]

export enum ActionKey {
  BACK = 'BACK',
  RESET = 'RESET',
  CONFIRM = 'CONFIRM',
}
/** 右侧功能按钮  */
export const defaultActionKeys = [
  {
    icon: 'rn-keyboard-delete',
    key: ActionKey.BACK,
    textStyle: [],
  },
  { label: '清零', key: ActionKey.RESET, textStyle: [{ fontSize: 15 }] },
  {
    label: '确定',
    key: ActionKey.CONFIRM,
    style: [
      S.bgPrimary,
      {
        height: transformSize(91),
      },
    ],
    textStyle: [
      S.textWhite,
      {
        fontSize: 18,
      },
    ],
  },
]
