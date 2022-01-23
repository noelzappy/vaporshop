import { Platform } from 'react-native'
import { height, totalSize } from 'react-native-dimension'


export const fontSizes = {
  huge: Platform.OS === 'ios' ? totalSize(2.8) : totalSize(3),
  big: Platform.OS === 'ios' ? totalSize(2.3) : totalSize(2.5),
  maxi: Platform.OS === 'ios' ? totalSize(1.8) : totalSize(2),
  normal: Platform.OS === 'ios' ? totalSize(1.3) : totalSize(1.5),
  small: Platform.OS === 'ios' ? totalSize(0.8) : totalSize(1),
}

 export const appStyles = {

}


