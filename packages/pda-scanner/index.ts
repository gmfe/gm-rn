import { NativeModules, NativeEventEmitter } from 'react-native'

export interface PdaScannerProps {
  SCANNER_RESULT_CHANGE_KEY: string
  initScanner: (callback: (error: string, res: string) => void) => void
  singleScan: (enable: boolean) => void
  recycleScanner: () => void
  /** @deprecated 请使用 `listen` */
  addListener: (callback: (result: string) => void) => void
  /** 添加 listener，会返回 clearListener 函数 */
  listen: (callback: (result: string) => void) => () => void
  /** @deprecated 请使用 `listen`返回的 `clernFn` */
  removeListener: () => void
}

const { PdaScanner } = NativeModules
let eventListener: any = null
let eventEmitter: NativeEventEmitter | null = null

function initEventEmitter() {
  if (!eventEmitter) eventEmitter = new NativeEventEmitter(PdaScanner)
}
const Scanner: PdaScannerProps = {
  ...PdaScanner,
  addListener: (callback) => {
    initEventEmitter()
    eventListener = eventEmitter!.addListener(
      PdaScanner.SCANNER_RESULT_CHANGE_KEY,
      (event: any) => {
        callback(event.result)
      },
    )
  },
  removeListener: () => {
    if (eventListener) {
      eventListener.remove()
      eventListener = null
    }
  },
  listen: (callback) => {
    initEventEmitter()
    const listener = (event: any) => {
      callback(event.result)
    }
    const emitterSubscription = eventEmitter!.addListener(
      PdaScanner.SCANNER_RESULT_CHANGE_KEY,
      listener,
    )
    return emitterSubscription.remove.bind(emitterSubscription)
  },
}

export default Scanner
