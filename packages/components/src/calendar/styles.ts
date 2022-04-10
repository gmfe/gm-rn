import V from '../variable'
import { Dimensions, StyleSheet } from 'react-native'
const { width } = Dimensions.get('window')

const marginEdge = 0
const dayItemSize = (width - marginEdge * 2) / 7
export const gapItemSize = (dayItemSize - 30) / 2
export const THEME_COLOR = V.primaryColor

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width,
    paddingBottom: 40,
  },
  monthContainer: {
    width,
    flexWrap: 'wrap',
  },
  weekHeader: {
    paddingVertical: 15,
  },

  monthHeader: {
    padding: 15,
  },
  dayItem: {
    width: dayItemSize,
    paddingVertical: 2,
  },
  dayItemInner: {
    height: dayItemSize - 2 * gapItemSize,
    width: dayItemSize - 2 * gapItemSize,
    // overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  currentDayNotSelect: {
    borderWidth: 0.5,
    borderRadius: 4,
    borderColor: V.primaryColor,
  },
  dayItemActive: {
    borderRadius: 4,
  },
  dayItemActiveInner: {
    // width: 30,
    backgroundColor: V.secondaryColor,
  },
  dayItemActiveFill: {
    // width: 30,
    backgroundColor: THEME_COLOR,
  },
  disableText: {
    color: '#bbb',
  },
  dateText: {
    color: '#333',
    fontSize: 12,
  },
})

export default styles
