import { Asset } from 'expo-asset'

const images = {
  logo: require('../../assets/images/applogo.png'),
  demo: require('../../assets/images/demo.png'),
  notfound: require('../../assets/images/notfound.png'),
  one: require('../../assets/images/items/1.png'),
  two: require('../../assets/images/items/2.png'),
  three: require('../../assets/images/items/3.png'),
  four: require('../../assets/images/items/4.png'),
  five: require('../../assets/images/items/5.png'),
  six: require('../../assets/images/items/6.png'),
  seven: require('../../assets/images/items/7.png'),
  eight: require('../../assets/images/items/8.png'),
  nine: require('../../assets/images/items/9.png'),
  ten: require('../../assets/images/items/10.png'),
}

// image preloading
export const imageAssets = Object.keys(images).map((key) =>
  Asset.fromModule(images[key]).downloadAsync(),
)

export default images
