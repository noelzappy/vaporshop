import React from 'react'
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer'
import HomeNavigator from '../Stacks'

// import DrawerMenu from './DrawerMenu'

const Drawer = createDrawerNavigator()

const DrawerMenuContainer = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      {/* <DrawerItem label="Hello" /> */}
    </DrawerContentScrollView>
  )
}

export default () => (
  <Drawer.Navigator
    initialRouteName="HomeDrawer"
    drawerContent={DrawerMenuContainer}
    screenOptions={{
      headerShown: false,
    }}
  >
    <Drawer.Screen name="HomeDrawer" component={HomeNavigator} />
  </Drawer.Navigator>
)
