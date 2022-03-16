import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  top: {
    justifyContent: 'flex-start',
  },
  bottom: {
    justifyContent: 'flex-end',
  },
  left: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  right: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  header: {
    borderTopStartRadius: 12,
    borderTopRightRadius: 12,
    height: 50,
  },
})

export default styles
