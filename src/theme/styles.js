import { Platform } from 'react-native'
import { height, totalSize, width } from 'react-native-dimension'
import colors from './colors'
import fonts from './fonts'

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
    fontFamily: fonts.mates.semiBold,
  },
  inputStyle: {
    color: colors.white,
    fontSize: fontSizes.big,
    fontFamily: fonts.mates.semiBold,
  },
  textRegular: {
    paddingTop: height(1),
    color: colors.white,
    fontSize: fontSizes.big,
    fontWeight: 'bold',
    fontFamily: fonts.mates.semiBold,
  },

  homeContainer2: {
    height: height(25),
    marginHorizontal: height(3),
    marginVertical: height(1.6),
    borderRadius: width(13),
    flex: 1,
    fontFamily: fonts.mates.semiBold,
  },
}
