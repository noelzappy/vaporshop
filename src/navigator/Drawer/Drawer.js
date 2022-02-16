import React from 'react'
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer'
import { View, Image, Text, Linking, TouchableOpacity } from 'react-native'
import { height, width } from 'react-native-dimension'
import HomeNavigator from '../Stacks'
import { fontSizes } from '../../theme/styles'
import colors from '../../theme/colors'
import { fonts } from '../../theme'
import MenuLogo from '../../../assets/images/menulogo.svg'

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
            fontFamily: fonts.mates.semiBold,
          }}
          style={{
            backgroundColor: colors.spGray,
          }}
        />

        <DrawerItem
          label="Рідини для POD систем"
          onPress={() => {
            navigation.navigate('HomeScreen')
          }}
          labelStyle={{
            fontSize: 17,
            color: colors.black,
            fontFamily: fonts.mates.semiBold,
          }}
          style={{
            backgroundColor: colors.spGray,
          }}
        />
        <DrawerItem
          label="Картриджі"
          onPress={() => {
            navigation.navigate('ProductsScreen', {
              itemName: '04 Картриджі',
              titleName: 'Картриджі',
            })
          }}
          labelStyle={{
            fontSize: 17,
            color: colors.black,
            fontFamily: fonts.mates.semiBold,
          }}
          style={{
            backgroundColor: colors.spGray,
          }}
        />

        <DrawerItem
          label="Bипаровувачі"
          onPress={() => {
            navigation.navigate('ProductsScreen', {
              itemName: '05 Випаровувачі',
              titleName: 'Bипаровувачі',
            })
          }}
          labelStyle={{
            fontSize: 17,
            color: colors.black,
            fontFamily: fonts.mates.semiBold,
          }}
          style={{
            backgroundColor: colors.spGray,
          }}
        />

        <DrawerItem
          label="Напої"
          onPress={() => {
            navigation.navigate('ProductsScreen', {
              itemName: '12 Напої',
              titleName: 'Напої',
            })
          }}
          labelStyle={{
            fontSize: 17,
            color: colors.black,
            fontFamily: fonts.mates.semiBold,
          }}
          style={{
            backgroundColor: colors.spGray,
          }}
        />
      </View>

      <TouchableOpacity
        style={{
          marginTop: height(45),
          alignItems: 'flex-start',
          paddingLeft: width(3),
        }}
        onPress={() => Linking.openURL('https://noelzappy.github.io')}
        activeOpacity={0.9}
      >
        <MenuLogo width={width(20)} height={height(10)} />
        <Text
          style={{
            color: colors.gray,
            textAlign: 'center',
            fontSize: fontSizes.normal,
            paddingLeft: width(3),
            fontFamily: fonts.mates.semiBold,
          }}
        >
          By Zappy
        </Text>
      </TouchableOpacity>
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
