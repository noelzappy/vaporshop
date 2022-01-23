import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import { AntDesign, MaterialIcons } from '@expo/vector-icons'
import { useSelector } from 'react-redux'
import { colors, fontSizes } from 'theme'
import { height, width } from 'react-native-dimension'
import { Header, Input } from 'react-native-elements'
import fuzzysort from 'fuzzysort'
import ProductItem from '../../components/ProductItem'

export default function SearchScreen({ navigation }) {
  const { app } = useSelector((state) => state)
  const { products, shoppingCart } = app

  const [searchKeyWord, setSearchKeyword] = useState('')
  const [foundProducts, setFoundProducts] = useState([])

  useEffect(() => {
    try {
      const foundArray = fuzzysort.go(searchKeyWord, products.slice(0, 100), {
        key: 'name',
        limit: 100,
      })

      const newArr = []

      foundArray.forEach((item) => {
        newArr.push(item.obj)
      })
      setFoundProducts(newArr)
    } catch (error) {
      console.log(error)
    }
  }, [searchKeyWord])

  return (
    <View>
      <Header
        centerComponent={() => (
          <Text
            style={{
              fontSize: fontSizes.big,
              fontWeight: 'bold',
            }}
          >
            SEARCH
          </Text>
        )}
        backgroundColor={colors.white}
      />

      <Input
        placeholder="Search.."
        leftIcon={() => (
          <MaterialIcons name="search" size={24} color={colors.white} />
        )}
        onChangeText={(text) => setSearchKeyword(text)}
        inputContainerStyle={{
          backgroundColor: colors.pink,
          paddingHorizontal: width(1.6),
          borderBottomWidth: 0,
          height: height(6),
          marginTop: height(1),
          borderRadius: width(3),
        }}
        value={searchKeyWord}
        placeholderTextColor={colors.white}
      />

      <FlatList
        initialNumToRender={30}
        data={foundProducts}
        renderItem={({ item }) => {
          return <ProductItem item={item} shoppingCart={shoppingCart} />
        }}
      />

      <TouchableOpacity
        style={{
          width: height(8),
          height: height(8),
          borderRadius: 30,
          backgroundColor: colors.black,
          position: 'absolute',
          bottom: height(20),
          right: 10,
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          alignContent: 'center',
        }}
        activeOpacity={0.8}
        onPress={() => navigation.navigate('CartScreen')}
      >
        <View
          style={{
            backgroundColor: colors.white,
            borderRadius: width(3),
            padding: width(1),
          }}
        >
          <Text
            style={{
              fontSize: fontSizes.normal,
              fontWeight: 'bold',
            }}
          >
            {shoppingCart.length}
          </Text>
        </View>
        <AntDesign name="shoppingcart" size={28} color={colors.white} />
      </TouchableOpacity>
    </View>
  )
}
