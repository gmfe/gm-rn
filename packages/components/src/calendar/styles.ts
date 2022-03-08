import { V } from '..'
import { Dimensions, StyleSheet } from 'react-native'
const { width } = Dimensions.get('window')

const { create } = StyleSheet
const marginEdge = 0
const dayItemSize = (width - marginEdge * 2) / 7
export const THEME_COLOR = V.primaryColor

const styles = create({
  container: {
    // flex: 1,
    backgroundColor: '#fefefe',
    height: '100%',
    // justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    // borderBottomWidth: hairlineWidth,
    // borderBottomColor: '#ddd',
  },
  monthContainer: {
    // flexDirection: 'row',
    flexWrap: 'wrap',
    overflow: 'hidden',
  },
  weekHeader: {
    flexDirection: 'row',
    paddingVertical: 15,
    backgroundColor: '#fff',
    // borderBottomWidth: hairlineWidth,
    // borderBottomColor: '#aaa',
  },
  weekHeaderItem: {
    width: dayItemSize,
    alignItems: 'center',
  },
  monthHeader: {
    padding: 15,
    backgroundColor: '#fff',
    // borderBottomWidth: hairlineWidth,
    // borderBottomColor: '#ccc',
  },
  dayItem: {
    alignItems: 'center',
    width: dayItemSize,
    height: dayItemSize,
    paddingTop: 5,
    paddingBottom: 15,
    // flex: 1,
    // overflow: 'hidden',
  },
  dayItemInner: {
    height: 30,
    width: dayItemSize,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayItemActive: {
    // width: 30,
    // width: dayItemSize,
    borderRadius: 4,
    // paddingRight: 10,
    borderRightColor: V.secondaryColor,
    // borderRightWidth: 10,
    // backgroundColor: '#E5F7EF',
  },
  dayItemActiveInner: {
    width: 30,
    // width: dayItemSize,
    // borderRadius: 4,
    backgroundColor: V.secondaryColor,
  },
  dayItemActiveFill: {
    width: 30,
    backgroundColor: THEME_COLOR,
  },
  dayItemActiveBorder: {
    borderWidth: 1,
    borderColor: THEME_COLOR,
  },
  holidayText: {
    fontSize: 12,
  },
  disableText: {
    color: '#bbb',
  },
  dateText: {
    color: '#333',
    fontSize: 12,
  },
  dayNoteTextItem: {
    width: dayItemSize,
    height: 15,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  noteText: {
    fontSize: 10,
  },
})

export default styles
