import { CalenderContextType } from './type'
import { createContext } from 'react'

export const CalenderContext = createContext<CalenderContextType>({
  value: [],
  onPress: () => {},
})
