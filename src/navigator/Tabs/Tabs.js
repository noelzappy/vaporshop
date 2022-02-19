import React from 'react'
import { View, Platform } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import FontIcon from 'react-native-vector-icons/FontAwesome5'
import { colors } from 'theme'
import { useSelector } from 'react-redux'
import SearchScreen from 'screens/Search'
import Home from 'screens/Home'
import CartScreen from 'screens/Cart'
import { width } from 'react-native-dimension'

const Tab = createBottomTabNavigator()

const TabNavigator = () => {
  const { app } = useSelector((state) => state)
  const { shoppingCart } = app

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        // eslint-disable-next-line react/prop-types
        tabBarIcon: ({ focused }) => {
          switch (route.name) {
            case 'HomeScreen':
              return (
                <FontIcon
                  name="home"
                  color={focused ? colors.black : colors.gray}
                  size={20}
                  solid
                />
              )
            case 'SearchScreen':
              return (
                <FontIcon
                  name="search"
                  color={focused ? colors.black : colors.gray}
                  size={20}
                  solid
                />
              )

            case 'CartScreen':
              return (
                <FontIcon
                  name="shopping-cart"
                  color={focused ? colors.black : colors.gray}
                  size={20}
                  solid
                />
              )
            default:
              return <View />
          }
        },
        headerShown: false,
        keyboardHidesTabBar: true,
        tabBarActiveTintColor: colors.black,
        tabBarInactiveTintColor: colors.gray,

        tabBarLabelStyle: {
          display: 'none',
        },
        tabBarStyle: {
          borderTopEndRadius: width(12),
          borderTopStartRadius: width(12),
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 7,
          },
          shadowOpacity: 0.41,
          shadowRadius: 9.11,

          elevation: 5,
          paddingTop: Platform.OS === 'ios' ? width(5) : width(0.1),
        },
      })}
      initialRouteName="HomeScreen"
      swipeEnabled={false}
    >
      <Tab.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{
          title: 'Search',
        }}
      />
      <Tab.Screen
        name="HomeScreen"
        component={Home}
        options={() => ({
          title: 'Home',
        })}
      />
      <Tab.Screen
        name="CartScreen"
        component={CartScreen}
        options={{
          title: 'Cart',
          tabBarBadge: shoppingCart.length,
        }}
      />
    </Tab.Navigator>
  )
}

export default TabNavigator
