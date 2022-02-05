import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { colors } from 'theme'
import TabNavigator from '../Tabs/Tabs'
import Products from '../../screens/Products/Products'
import Checkout from '../../screens/Checkout/Checkout'

// ------------------------------------
// Constants
// ------------------------------------

const Stack = createNativeStackNavigator()

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
    initialRouteName="MainScreen"
    headerMode="screen"
    screenOptions={navigationProps}
  >
    <Stack.Screen name="Home" component={TabNavigator} />
    <Stack.Screen name="ProductsScreen" component={Products} />
    <Stack.Screen name="CheckoutScreen" component={Checkout} />
  </Stack.Navigator>
)

export default HomeNavigator
