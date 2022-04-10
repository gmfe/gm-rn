import React from 'react'
import { Tabs, FlexView, S } from '../../packages/components'
export default function TabsDemo() {
  return (
    <FlexView border bgWhite>
      <Tabs
        style={[S.bgWhite]}
        tabs={[
          { key: '1', tab: 'tab 1' },
          { key: '2', tab: 'tab 2' },
          { key: '3', tab: 'tab 3' },
          { key: '4', tab: 'tab 4' },
          { key: '5', tab: 'tab 5' },
          { key: '6', tab: 'tab 6' },
          { key: '7', tab: 'tab 7' },
        ]}
      />
    </FlexView>
  )
}
