import React, { useState, useEffect } from 'react'
import { ActivityIndicator } from 'react-native'
import { Provider } from 'react-redux'
import { SafeAreaView } from 'react-native-safe-area-context'
import { store } from 'utils/store'
import 'utils/ignore'

// assets
import { imageAssets } from 'theme/images'
import { fontAssets } from 'theme/fonts'
import Navigator from './navigator'

const App = () => {
  const [didLoad, setDidLoad] = useState(false)

  // assets preloading
  const handleLoadAssets = async () => {
    await Promise.all([...imageAssets, ...fontAssets])
    setDidLoad(true)
  }

  useEffect(() => {
    handleLoadAssets()
  }, [])

  return didLoad ? (
    <Provider store={store}>
      <SafeAreaView
        style={{
          flex: 1,
        }}
      >
        <Navigator />
      </SafeAreaView>
    </Provider>
  ) : (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <ActivityIndicator />
    </SafeAreaView>
  )
}

export default App
