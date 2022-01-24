import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native'
import { AntDesign, MaterialIcons } from '@expo/vector-icons'
import { useSelector } from 'react-redux'
import { colors, fontSizes, images } from 'theme'
import { height, width } from 'react-native-dimension'
import fuzzysort from 'fuzzysort'
import { Header, Input } from 'react-native-elements'
import ProductItem from '../../components/ProductItem'

export default function Products({ navigation }) {
  const { app } = useSelector((state) => state)
  const { folderFilteredProducts, shoppingCart } = app

  const [searchResult, setSearchResult] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    try {
      const foundArray = fuzzysort.go(
        searchTerm,
        folderFilteredProducts.slice(0, 100),
        {
          key: 'name',
          limit: 100,
        },
      )

      const newArr = []

      foundArray.forEach((item) => {
        newArr.push(item.obj)
      })
      setSearchResult(newArr)
    } catch (error) {
      console.log(error)
    }
  }, [searchTerm])

  return (
    <View>
      <Header
        leftComponent={() => (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="arrowleft" size={24} color="black" />
          </TouchableOpacity>
        )}
        centerComponent={() => (
          <Text
            style={{
              fontSize: fontSizes.big,
              fontWeight: 'bold',
            }}
          >
            Products
          </Text>
        )}
        backgroundColor={colors.white}
      />
      <Input
        placeholder="Search.."
        leftIcon={() => (
          <MaterialIcons name="search" size={24} color={colors.white} />
        )}
        onChangeText={(text) => setSearchTerm(text)}
        inputContainerStyle={{
          backgroundColor: colors.pink,
          paddingHorizontal: width(1.6),
          borderBottomWidth: 0,
          height: height(6),
          marginTop: height(1),
          borderRadius: width(3),
        }}
        value={searchTerm}
        placeholderTextColor={colors.white}
        inputStyle={{
          color: colors.white,
          fontSize: fontSizes.big,
        }}
      />

      <FlatList
        initialNumToRender={30}
        data={searchResult.length > 0 ? searchResult : folderFilteredProducts}
        renderItem={({ item }) => {
          return <ProductItem item={item} shoppingCart={shoppingCart} />
        }}
        ListEmptyComponent={() => (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: height(5),
            }}
          >
            <Image
              style={{
                width: width(70),
                height: height(20),
                backgroundColor: colors.pink,
                borderRadius: width(2),
              }}
              source={images.notfound}
            />
            <Text
              style={{
                fontSize: fontSizes.huge,
                fontWeight: 'bold',
              }}
            >
              No Product Found In Category
            </Text>
          </View>
        )}
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
