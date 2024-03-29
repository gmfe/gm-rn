import { StyleSheet } from 'react-native'
import V from './variable'

// TODO 补充，从 mgm 搬过来
const Styles = {
  // bg
  bgDefault: {
    backgroundColor: V.bgDefault,
  },
  bgWhite: {
    backgroundColor: V.bgWhite,
  },
  bgPrimary: {
    backgroundColor: V.primaryColor,
  },
  bgSecondary: {
    backgroundColor: V.secondaryColor,
  },
  bgPrimaryActive: {
    backgroundColor: V.primaryColorActive,
  },
  bgWarning: {
    backgroundColor: V.warningColor,
  },
  bgWarningActive: {
    backgroundColor: V.warningColorActive,
  },
  // text
  textWhite: {
    color: V.whiteColor,
  },
  textBlack: {
    color: V.blackColor,
  },
  textPrimary: {
    color: V.primaryColor,
  },
  textWarning: {
    color: V.warningColor,
  },
  textDesc: {
    color: V.descColor,
  },
  textLink: {
    color: V.linkColor,
  },
  textRed: {
    color: V.redColor,
  },
  textSecondary: {
    color: V.secondaryColor,
  },
  textFinish: {
    color: V.finishColor,
  },
  text8: {
    fontSize: V.fontSize8,
  },
  text10: {
    fontSize: V.fontSize10,
  },
  text12: {
    fontSize: V.fontSize12,
  },
  text14: {
    fontSize: V.fontSize14,
  },
  text16: {
    fontSize: V.fontSize16,
  },
  text18: {
    fontSize: V.fontSize18,
  },
  text24: {
    fontSize: V.fontSize24,
  },
  text30: {
    fontSize: V.fontSize30,
  },

  textLeft: {
    textAlign: 'left',
  },
  textRight: {
    textAlign: 'right',
  },
  textCenter: {
    textAlign: 'center',
  },

  textBold: {
    fontWeight: '700',
  },

  text: {
    fontSize: V.fontSize14,
    color: V.defaultColor,
  },

  border: {
    borderColor: V.borderColor,
    borderWidth: StyleSheet.hairlineWidth,
  },
  borderLeft: {
    borderLeftColor: V.borderColor,
    borderLeftWidth: StyleSheet.hairlineWidth,
  },
  borderTop: {
    borderTopColor: V.borderColor,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  borderRight: {
    borderRightColor: V.borderColor,
    borderRightWidth: StyleSheet.hairlineWidth,
  },
  borderBottom: {
    borderBottomColor: V.borderColor,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  borderTop0: {
    borderTopWidth: V.gap0,
  },
  borderBottom0: {
    borderBottomWidth: V.gap0,
  },
  borderLeft0: {
    borderLeftWidth: V.gap0,
  },
  borderRight0: {
    borderRightWidth: V.gap0,
  },
  borderVertical0: {
    borderTopWidth: V.gap0,
    borderBottomWidth: V.gap0,
  },
  borderHorizontal0: {
    borderLeftWidth: V.gap0,
    borderRightWidth: V.gap0,
  },
  borderVertical: {
    borderColor: V.borderColor,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  borderHorizontal: {
    borderColor: V.borderColor,
    borderLeftWidth: StyleSheet.hairlineWidth,
    borderRightWidth: StyleSheet.hairlineWidth,
  },
  border0: {
    borderWidth: V.gap0,
  },
  border1: {
    borderWidth: V.gap2 / 2,
  },
  borderRadius5: {
    borderRadius: V.n5,
  },
  borderRadius8: {
    borderRadius: V.n8,
  },
  borderRadiusCircle: {
    borderRadius: 9999,
  },
  borderTopRadius0: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  positionAbsolute: {
    position: 'absolute',
  },
  positionRelative: {
    position: 'relative',
  },
  left0: {
    position: 'absolute',
    left: 0,
  },
  right0: {
    right: 0,
  },
  top0: {
    top: 0,
  },
  bottom0: {
    bottom: 0,
  },
  overflowVisible: {
    overflow: 'visible',
  },
  overflowHidden: {
    overflow: 'hidden',
  },
  overflowScroll: {
    overflow: 'scroll',
  },
  // flex
  flex: {
    // todo
    flex: 1,
  },
  flexZero: {
    flex: 0,
  },
  flexB1: {
    flex: -1,
  },
  row: {
    flexDirection: 'row',
  },
  column: {
    flexDirection: 'column',
  },
  rowReverse: {
    flexDirection: 'row-reverse',
  },
  columnReverse: {
    flexDirection: 'column-reverse',
  },
  flexWrap: {
    flexWrap: 'wrap',
  },
  flexNoWrap: {
    flexWrap: 'nowrap',
  },
  justifyStart: {
    justifyContent: 'flex-start',
  },
  justifyEnd: {
    justifyContent: 'flex-end',
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  justifyBetween: {
    justifyContent: 'space-between',
  },
  justifyAround: {
    justifyContent: 'space-around',
  },
  alignStart: {
    alignItems: 'flex-start',
  },
  alignCenter: {
    alignItems: 'center',
  },
  alignEnd: {
    alignItems: 'flex-end',
  },
  alignStretch: {
    alignItems: 'stretch',
  },
  alignSelfAuto: {
    alignSelf: 'auto',
  },
  alignSelfStart: {
    alignSelf: 'flex-start',
  },
  alignSelfEnd: {
    alignSelf: 'flex-end',
  },
  alignSelfCenter: {
    alignSelf: 'center',
  },
  alignSelfStretch: {
    alignSelf: 'stretch',
  },

  // gap
  padding0: {
    padding: V.gap0,
  },
  padding4: {
    padding: V.gap4,
  },
  padding8: {
    padding: V.gap8,
  },
  padding12: {
    padding: V.gap12,
  },
  padding16: {
    padding: V.gap16,
  },

  paddingLeft0: {
    paddingLeft: V.gap0,
  },
  paddingLeft4: {
    paddingLeft: V.gap4,
  },
  paddingLeft8: {
    paddingLeft: V.gap8,
  },
  paddingLeft12: {
    paddingLeft: V.gap12,
  },
  paddingLeft16: {
    paddingLeft: V.gap16,
  },

  paddingRight0: {
    paddingRight: V.gap0,
  },
  paddingRight4: {
    paddingRight: V.gap4,
  },
  paddingRight8: {
    paddingRight: V.gap8,
  },
  paddingRight12: {
    paddingRight: V.gap12,
  },
  paddingRight16: {
    paddingRight: V.gap16,
  },

  paddingTop0: {
    paddingTop: V.gap0,
  },
  paddingTop4: {
    paddingTop: V.gap4,
  },
  paddingTop8: {
    paddingTop: V.gap8,
  },
  paddingTop12: {
    paddingTop: V.gap12,
  },
  paddingTop16: {
    paddingTop: V.gap16,
  },

  paddingBottom0: {
    paddingBottom: V.gap0,
  },
  paddingBottom4: {
    paddingBottom: V.gap4,
  },
  paddingBottom8: {
    paddingBottom: V.gap8,
  },
  paddingBottom12: {
    paddingBottom: V.gap12,
  },
  paddingBottom16: {
    paddingBottom: V.gap16,
  },

  paddingVertical0: {
    paddingVertical: V.gap0,
  },
  paddingVertical2: {
    paddingVertical: V.gap2,
  },
  paddingVertical4: {
    paddingVertical: V.gap4,
  },
  paddingVertical8: {
    paddingVertical: V.gap8,
  },
  paddingVertical12: {
    paddingVertical: V.gap12,
  },
  paddingVertical16: {
    paddingVertical: V.gap16,
  },
  paddingVertical20: {
    paddingVertical: V.gap20,
  },
  paddingVertical24: {
    paddingVertical: V.gap24,
  },
  paddingHorizontal0: {
    paddingHorizontal: V.gap0,
  },
  paddingHorizontal4: {
    paddingHorizontal: V.gap4,
  },
  paddingHorizontal8: {
    paddingHorizontal: V.gap8,
  },
  paddingHorizontal12: {
    paddingHorizontal: V.gap12,
  },
  paddingHorizontal16: {
    paddingHorizontal: V.gap16,
  },
  paddingHorizontal20: {
    paddingHorizontal: V.gap20,
  },
  margin0: {
    margin: V.gap0,
  },
  margin4: {
    margin: V.gap4,
  },
  margin8: {
    margin: V.gap8,
  },
  margin12: {
    margin: V.gap12,
  },
  margin16: {
    margin: V.gap16,
  },

  marginLeft0: {
    marginLeft: V.gap0,
  },
  marginLeft4: {
    marginLeft: V.gap4,
  },
  marginLeft8: {
    marginLeft: V.gap8,
  },
  marginLeft12: {
    marginLeft: V.gap12,
  },
  marginLeft16: {
    marginLeft: V.gap16,
  },

  marginRight0: {
    marginRight: V.gap0,
  },
  marginRight4: {
    marginRight: V.gap4,
  },
  marginRight8: {
    marginRight: V.gap8,
  },
  marginRight12: {
    marginRight: V.gap12,
  },
  marginRight16: {
    marginRight: V.gap16,
  },

  marginTop0: {
    marginTop: V.gap0,
  },
  marginTop4: {
    marginTop: V.gap4,
  },
  marginTop8: {
    marginTop: V.gap8,
  },
  marginTop12: {
    marginTop: V.gap12,
  },
  marginTop16: {
    marginTop: V.gap16,
  },

  marginBottom0: {
    marginBottom: V.gap0,
  },
  marginBottom4: {
    marginBottom: V.gap4,
  },
  marginBottom8: {
    marginBottom: V.gap8,
  },
  marginBottom12: {
    marginBottom: V.gap12,
  },
  marginBottom16: {
    marginBottom: V.gap16,
  },

  marginVertical0: {
    marginVertical: V.gap0,
  },
  marginVertical4: {
    marginVertical: V.gap4,
  },
  marginVertical8: {
    marginVertical: V.gap8,
  },
  marginVertical12: {
    marginVertical: V.gap12,
  },
  marginVertical16: {
    marginVertical: V.gap16,
  },

  marginHorizontal0: {
    marginHorizontal: V.gap0,
  },
  marginHorizontal4: {
    marginHorizontal: V.gap4,
  },
  marginHorizontal8: {
    marginHorizontal: V.gap8,
  },
  marginHorizontal12: {
    marginHorizontal: V.gap12,
  },
  marginHorizontal16: {
    marginHorizontal: V.gap16,
  },
  marginHorizontal20: {
    marginHorizontal: V.gap20,
  },
  height100: {
    height: '100%',
  },
  // input
  input: {
    color: V.defaultColor,
    fontSize: V.fontSize14,
    height: V.fontSize14 * V.baseLineHeight,
    lineHeight: V.fontSize14 * V.baseLineHeight,
    padding: 0,
    textAlignVertical: 'top',
  },
}
// @ts-ignore
export default StyleSheet.create(Styles)
