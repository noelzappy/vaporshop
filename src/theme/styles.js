import { Platform } from 'react-native'
import { height, totalSize, width } from 'react-native-dimension'
import colors from './colors'

export const fontSizes = {
  huge: Platform.OS === 'ios' ? totalSize(2.8) : totalSize(3),
  big: Platform.OS === 'ios' ? totalSize(2.3) : totalSize(2.5),
  maxi: Platform.OS === 'ios' ? totalSize(1.8) : totalSize(2),
  normal: Platform.OS === 'ios' ? totalSize(1.3) : totalSize(1.5),
  small: Platform.OS === 'ios' ? totalSize(0.8) : totalSize(1),
}

export const appStyles = {
  inputContainerStyle: {
    backgroundColor: colors.gray,
    paddingHorizontal: width(1.6),
    borderBottomWidth: 0,
    height: height(6),
    marginTop: height(1),
    borderRadius: width(3),
  },
  inputStyle: {
    color: colors.white,
    fontSize: fontSizes.big,
  },
  textRegular: {
    paddingTop: height(1),
    color: colors.white,
    fontSize: fontSizes.big,
    fontWeight: 'bold',
  },
  homeContainer1: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: height(2),
    height: height(25),
    marginBottom: height(1),
  },
  homeContainer2: {
    marginHorizontal: height(3),
    marginVertical: height(1.6),
    backgroundColor: colors.pink,
    borderRadius: width(3),
  },
}
