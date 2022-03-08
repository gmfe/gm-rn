import { NativeModules, NativeEventEmitter } from 'react-native'

export interface PdaScannerProps {
  SCANNER_RESULT_CHANGE_KEY: string
  initScanner: (callback: (error: string, res: string) => void) => void
  singleScan: (enable: boolean) => void
  recycleScanner: () => void
  addListener: (callback: (result: string) => void) => void
  removeListener: () => void
}

const { PdaScanner } = NativeModules
let eventListener: any = null

const Scanner: PdaScannerProps = {
  ...PdaScanner,
  addListener: (callback) => {
    const eventEmitter = new NativeEventEmitter(PdaScanner)
    eventListener = eventEmitter.addListener(
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
}

export default Scanner
