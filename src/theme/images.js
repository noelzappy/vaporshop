import { Asset } from 'expo-asset'

const images = {
  logo: require('../../assets/images/applogo.png'),
  demo: require('../../assets/images/demo.png'),
  notfound: require('../../assets/images/notfound.png'),
}

// image preloading
export const imageAssets = Object.keys(images).map((key) =>
  Asset.fromModule(images[key]).downloadAsync(),
)

export default images
