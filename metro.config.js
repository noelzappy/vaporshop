// expo v40:
const { getDefaultConfig } = require('expo/metro-config')

module.exports = (async () => {
  const {
    transformer,
    resolver: { sourceExts, assetExts, ...resolver },
    ...config
  } = await getDefaultConfig(__dirname)
  return {
    ...config,
    transformer: {
      ...transformer,
      babelTransformerPath: require.resolve('react-native-svg-transformer'),
    },
    resolver: {
      ...resolver,
      assetExts: assetExts.filter((ext) => ext !== 'svg'),
      sourceExts: [...sourceExts, 'svg'],
    },
  }
})()
