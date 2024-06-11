import React from 'react'
import LayoutRootV1 from '../layer_root/v1'
import { AnyCallbackType } from '../type'
import PopUp, { PopupProps } from '.'
import { addUuidToOption } from '@gm-rn/utils'

type PopupV1Props = PopupProps

export interface PopupV1Static {
  render: (props: PopupV1Props) => AnyCallbackType
  hide: (id: string) => void
}

const PopupV1: PopupV1Static = {
  render: (props) => {
    const id = addUuidToOption(props)
    LayoutRootV1.setComponent(
      LayoutRootV1.TYPE.PopUp,
      <PopUp
        onCancel={() => {
          PopupV1.hide(id)
        }}
        {...props}
      />,
    )
    return PopupV1.hide.bind(null, id)
  },
  hide: (id: string) => {
    if (!id) {
      console.error('need id when manual hide')
    }
    LayoutRootV1.removeComponent(LayoutRootV1.TYPE.PopUp, id)
  },
}

export default PopupV1
