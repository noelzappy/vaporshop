import React from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { useSelector } from 'react-redux'
import { colors, fontSizes } from 'theme'
import { height, width } from 'react-native-dimension'
import { Header } from 'react-native-elements'
import ProductItem from '../../components/ProductItem'

export default function Products({ navigation }) {
  const { app } = useSelector((state) => state)
  const { products, shoppingCart } = app
 


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
      <FlatList
        initialNumToRender={30}
        data={products}
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
          bottom: height(10),
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
