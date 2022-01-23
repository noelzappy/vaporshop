import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { ActivityIndicator, View } from 'react-native'

import DrawerNavigator from './Drawer'
import { getCategories, getProducts } from '../utils/Actions'

const Navigator = () => {
  const dispatch = useDispatch()
  const { app } = useSelector((state) => state)
  const { productCategories, products } = app
  useEffect(() => {
    dispatch(getProducts())
    dispatch(getCategories())
  }, [])

  return productCategories !== null && products !== null ? (
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
