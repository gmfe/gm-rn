/*
 * @Description: Tabs
 */
import React, { FC, ReactNode, useRef, useState } from 'react'
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  LayoutChangeEvent,
  LayoutRectangle,
} from 'react-native'
import S from '../styles'
import V from '../variable'
import FlexView, { FlexViewProps } from '../flex_view'

import { WINDOW_WIDTH, WINDOW_WIDTH_5 } from '../global_constant'

export interface TabsProps extends FlexViewProps {
  defaultActiveKey?: string
  tabs?: Pick<TabPaneProps, 'tab' | 'key'>[]
  activeKey?: string
  onChange?(activeKey: string): void
}

export interface TabPaneProps extends FlexViewProps {
  tab: ReactNode
  key: string
  tabKey: string
  isActive?: boolean
  onActive?(activeKey: string): void
  setLayout?(event: LayoutChangeEvent): void
}
export const Tabs: FC<TabsProps> = ({
  defaultActiveKey,
  activeKey: propActivekey,
  tabs = [],
  children,
  style,
  onChange,
  ...res
}) => {
  const [activeKey, setActiveKey] = useState(initActiveKey)
  const scrollRef = useRef<ScrollView>(null)
  const layoutRef = useRef<{ layouts: LayoutRectangle[]; scrollWidth: number }>(
    {
      layouts: [],
      scrollWidth: 0,
    },
  )

  function initActiveKey(): string {
    if (activeKey !== undefined || defaultActiveKey || undefined)
      return (activeKey || defaultActiveKey)!
    return tabs[0].key
  }

  function changeActiveKey(index: number, key: string) {
    setActiveKey(key)
    const { layouts, scrollWidth } = layoutRef.current
    const layout = layouts[index]
    const rx = WINDOW_WIDTH_5
    let sx = layout.x - rx + layout.width / 2
    // 不满足滑动条件，停留不动
    if (sx < 0) sx = 0

    // 正常滑动
    sx < scrollWidth - WINDOW_WIDTH &&
      scrollRef.current?.scrollTo({ x: sx, animated: true })
    // 靠后部分则直接滑到底部
    sx >= scrollWidth - WINDOW_WIDTH &&
      scrollRef.current?.scrollToEnd({ animated: true })

    onChange && onChange(key)
  }

  function setLayout(index: number, event: LayoutChangeEvent) {
    const layout = event.nativeEvent.layout
    layoutRef.current.layouts[index] = layout
    layoutRef.current.scrollWidth += layout.width
  }

  const tempActiveKey = propActivekey ?? activeKey
  return (
    <ScrollView
      ref={scrollRef}
      horizontal
      directionalLockEnabled
      showsHorizontalScrollIndicator={false}
      snapToAlignment="center"
      {...res}
      style={[tabsStyles.container, S.paddingHorizontal12, style]}>
      {Array.isArray(tabs)
        ? tabs.map((tab, index) => {
            const isActive = tab.key === tempActiveKey
            return (
              <TabPane
                {...tab}
                tabKey={tab.key}
                onActive={changeActiveKey.bind(null, index)}
                setLayout={setLayout.bind(null, index)}
                isActive={isActive}
              />
            )
          })
        : children}
    </ScrollView>
  )
}

export const TabPane: FC<TabPaneProps> = ({
  tab,
  isActive,
  style,
  setLayout,
  ...res
}) => {
  function onPress() {
    res.onActive && res.onActive(res.tabKey)
  }
  return (
    <TouchableOpacity
      activeOpacity={1}
      accessible
      accessibilityRole="button"
      onPress={onPress}
      onLayout={setLayout}
      style={[S.flex]}>
      <FlexView
        flex
        row
        justifyCenter
        {...res}
        style={[tabsStyles.TabPaneContainer, style]}>
        <FlexView justifyCenter paddingHorizontal4>
          {typeof tab === 'object' ? (
            tab
          ) : (
            <Text
              style={[
                S.text16,
                S.marginBottom8,
                tabsStyles.tabPaneText,
                isActive && S.textBlack,
                isActive && S.textBold,
              ]}>
              {tab}
            </Text>
          )}

          <FlexView
            marginHorizontal4
            borderRadius5
            bgPrimary
            style={[
              tabsStyles.tabBottomBlock,
              isActive && tabsStyles.tabBottomBlockActive,
            ]}
          />
        </FlexView>
      </FlexView>
    </TouchableOpacity>
  )
}
const tabsStyles = StyleSheet.create({
  container: {
    height: 50,
    backgroundColor: V.bgDefault,
    borderTopWidth: 1,
    borderTopColor: V.borderColor,
  },
  TabPaneContainer: {
    marginRight: 24,
  },
  tabBottomBlock: {
    height: 4,
    opacity: 0,
  },
  tabBottomBlockActive: {
    opacity: 1,
  },
  tabPaneText: {
    color: '#757575',
  },
})
