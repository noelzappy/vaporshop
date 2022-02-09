import React from 'react'
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer'
import { View, Image, Text, Linking } from 'react-native'
import { height, width } from 'react-native-dimension'
import HomeNavigator from '../Stacks'
import { fontSizes } from '../../theme/styles'
import colors from '../../theme/colors'
import images from '../../theme/images'

const Drawer = createDrawerNavigator()

const DrawerMenuContainer = (props) => {
  const { navigation } = props
  return (
    <DrawerContentScrollView {...props}>
      <View
        style={{
          marginTop: height(2),
          maxHeight: height(40),
        }}
      >
        <DrawerItem
          label="Одноразові под системи"
          onPress={() => {
            navigation.navigate('HomeScreen')
          }}
          labelStyle={{
            fontSize: 17,
            color: colors.black,
          }}
          style={{
            backgroundColor: colors.spGray,
          }}
        />
      </View>

      <View
        style={{
          marginTop: height(55),
          alignItems: 'center',
        }}
      >
        <Image
          source={images.logo}
          style={{
            width: width(40),
            height: height(20),
            marginBottom: height(2),
          }}
        />
        <Text
          style={{
            color: colors.gray,
            textAlign: 'center',
            fontSize: fontSizes.normal,
          }}
          onPress={() => Linking.openURL('https://noelzappy.github.io')}
        >
          Created by Zappy
        </Text>
      </View>
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
