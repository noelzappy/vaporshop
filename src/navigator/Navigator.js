import React from 'react'
import { NavigationContainer } from '@react-navigation/native'

import DrawerNavigator from './Drawer'

const Navigator = () => (
  <NavigationContainer>
    <DrawerNavigator />
  </NavigationContainer>
)

export default Navigator
