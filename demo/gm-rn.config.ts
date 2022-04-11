import { setVariable } from '../packages/components/src/variable'
import { setDesign } from '../packages/components/src/global_constant'

setVariable({
  primaryColor: '#1B9E5F',
  descColor: '#9D9D9D',
  secondaryColor: '#E5F7EF',
  linkColor: '#47639D',
  borderColor: '#EAEAEA',
  bgDefault: '#F3F4F5',
})

// 设计稿宽高，dp
const designWidth = 360
const designHeight = 720

setDesign(designWidth, designHeight)
