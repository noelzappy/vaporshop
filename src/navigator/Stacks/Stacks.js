import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { colors } from 'theme'

import TabNavigator from '../Tabs/Tabs'

// ------------------------------------
// Constants
// ------------------------------------

const Stack = createStackNavigator()

const navigationProps = {
  headerTintColor: colors.black,
  headerStyle: { backgroundColor: colors.white },
  headerTitleStyle: { display: 'none' },
  headerShown: false,
}

// ------------------------------------
// Navigators
// ------------------------------------

const HomeNavigator = () => (
  <Stack.Navigator
    initialRouteName="Home"
    headerMode="screen"
    screenOptions={navigationProps}
  >
    <Stack.Screen name="Home" component={TabNavigator} />
  </Stack.Navigator>
)

export default HomeNavigator
