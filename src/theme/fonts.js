import * as Font from 'expo-font'

// fonts preloading
export const fontAssets = [
  {
    openSans_regular: require('../../assets/fonts/TypeMates - CeraRoundPro-Regular.otf'),
  },
  {
    openSans_regular_italic: require('../../assets/fonts/TypeMates - CeraRoundPro-Black.otf'),
  },
  {
    openSans_semiBold: require('../../assets/fonts/TypeMates - CeraRoundPro-Light.otf'),
  },
  {
    openSans_semiBold_italic: require('../../assets/fonts/TypeMates - CeraRoundPro-Medium.otf'),
  },
  {
    openSans_bold: require('../../assets/fonts/TypeMates - CeraRoundPro-Bold.otf'),
  },
  {
    openSans_bold_italic: require('../../assets/fonts/TypeMates - CeraRoundPro-Bold.otf'),
  },
].map((x) => Font.loadAsync(x))

const fonts = {
  mates: {
    regular: 'openSans_regular',
    regularItalic: 'openSans_regular_italic',
    semiBold: 'openSans_semiBold',
    semiBoldItalic: 'openSans_semiBold_italic',
    bold: 'openSans_bold',
    boldItalic: 'openSans_bold_italic',
  },
}

export default fonts
