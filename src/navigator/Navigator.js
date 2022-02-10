import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { ActivityIndicator, View } from 'react-native'

import DrawerNavigator from './Drawer'
import { getCategories, getProducts, getWarehouse } from '../utils/Actions'

const Navigator = () => {
  const dispatch = useDispatch()
  const { app } = useSelector((state) => state)
  const { productCategories, products, wareHouses, defaultStore } = app
  useEffect(() => {
    dispatch(getProducts())
    dispatch(getCategories())
    dispatch(getWarehouse())
  }, [])

  useEffect(() => {
    dispatch(getProducts())
  }, [defaultStore])

  return productCategories !== null &&
    products !== null &&
    wareHouses !== null ? (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  ) : (
    <View>
      <ActivityIndicator />
    </View>
  )
}

export default Navigator
