import * as Font from 'expo-font'

// fonts preloading
export const fontAssets = [
  {
    openSans_regular: require('../../assets/fonts/CeraRoundPro-Light.otf'),
  },
  {
    openSans_regular_italic: require('../../assets/fonts/CeraRoundPro-Light.otf'),
  },
  {
    openSans_semiBold: require('../../assets/fonts/CeraRoundPro-Light.otf'),
  },
  {
    openSans_semiBold_italic: require('../../assets/fonts/CeraRoundPro-Medium.otf'),
  },
  {
    openSans_bold: require('../../assets/fonts/CeraRoundPro-Bold.otf'),
  },
  {
    openSans_bold_italic: require('../../assets/fonts/CeraRoundPro-Bold.otf'),
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
