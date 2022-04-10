import React, { FC, useState, useEffect, ReactNode } from 'react'
import { View } from 'react-native'
import FlexView from '../flex_view'

enum LayoutType {
  PopUp = 'popup',
  Dialog = 'dialog',
  Toast = 'toast',
}
export type LayoutStateType = {
  [key in LayoutType]?: ReactNode[]
}

interface LayoutStaticV1 {
  setComponent(type: LayoutType, component: ReactNode, id?: string): void
  removeComponent(type: LayoutType, id?: string): void
  removeComponentByType(type: LayoutStateType): void
  clear(): void
  TYPE: typeof LayoutType
}
type setComponentFuncType = null | LayoutStaticV1['setComponent']
let setComponentFunc: setComponentFuncType = null
let removeComponentByType: LayoutStaticV1['removeComponentByType'] | null = null
let clearComponent: LayoutStaticV1['clear'] | null = null
const LayerRootV1: FC & LayoutStaticV1 = () => {
  const [state, setState] = useState<LayoutStateType>({})

  useEffect(() => {
    setComponentFunc = (type, component, id) => {
      setState((oldState) => {
        // 这里必须用新的数组，否则指针指向上次的s[type]，不会触发render
        const newC = [...(oldState[type] || [])]
        // 有传id说明要移除
        if (id) {
          // 找到对应要移除的index
          const index = newC.findIndex(
            // @ts-ignore
            (component) => component?.props?.id === id,
          )
          // 找到则移除
          index > -1 && newC.splice(index, 1)
        } else {
          // 否则是增加
          newC.push(component)
        }
        return {
          ...oldState,
          [type]: newC,
        }
      })
    }
    return () => {
      setComponentFunc = null
    }
  }, [])
  useEffect(() => {
    removeComponentByType = (type) => {
      // @ts-ignore
      setState((oldState) => ({ ...oldState, [type]: undefined }))
    }

    return () => {
      removeComponentByType = null
    }
  }, [])

  useEffect(() => {
    clearComponent = () => {
      setState({})
    }

    return () => {
      clearComponent = null
    }
  }, [])
  const { popup, dialog, toast } = state

  if (![popup, dialog, toast].some(Boolean)) {
    return null
  }

  return (
    <FlexView top0 left0 right0 bottom0>
      <View>{popup}</View>
      <View>{dialog}</View>
      <View>{toast}</View>
    </FlexView>
  )
}

LayerRootV1.setComponent = (type, com, id) => {
  if (setComponentFunc) {
    LayerRootV1.removeComponent(type)
    setComponentFunc(type, com, id)
  } else {
    console.warn('LayerRootV1 is uninitialized')
  }
}
LayerRootV1.removeComponent = (type, id) => {
  if (setComponentFunc) {
    setComponentFunc(type, null, id)
  } else {
    console.warn('LayerRootV1 is uninitialized')
  }
}
LayerRootV1.removeComponentByType = (type) => {
  if (removeComponentByType) {
    removeComponentByType(type)
  } else {
    console.warn('LayerRootV1 is uninitialized')
  }
}

LayerRootV1.clear = () => {
  if (clearComponent) {
    clearComponent()
  } else {
    console.warn('LayerRootV1 is uninitialized')
  }
}
LayerRootV1.TYPE = LayoutType

export default LayerRootV1
