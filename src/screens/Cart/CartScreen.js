import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import { Button, Header } from 'react-native-elements'
import { useDispatch, useSelector } from 'react-redux'
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'
import FontIcon from 'react-native-vector-icons/FontAwesome5'
import numeral from 'numeral'
import { height, width } from 'react-native-dimension'
import _ from 'lodash'
import {
  addToCart,
  clearCart,
  numberFormatter,
  removeFromCart,
} from '../../utils/Actions'
import { colors, fontSizes } from '../../theme'

export default function CartScreen({ navigation }) {
  const dispatch = useDispatch()
  const { app } = useSelector((state) => state)
  const { shoppingCart } = app

  const [totalCartCost, setTotalCartCost] = useState(0)
  let cartItems = []

  const getPriceFromCart = (itemId) => {
    let price = 0
    shoppingCart.forEach((item) => {
      if (item.id === itemId) {
        price = numeral(item.salePrices[0].value / 100).format('0.00')
      }
    })

    return price
  }

  const getNumberInCart = () => {
    return shoppingCart.reduce((obj, b) => {
      obj[b.id] = ++obj[b.id] || 1
      return obj
    }, {})
  }

  const calcTotalCost = () => {
    const inCart = getNumberInCart()
    let tempTotal = 0
    Object.entries(inCart).forEach((item) => {
      const [key, value] = item
      const unitPrice = getPriceFromCart(key)

      tempTotal += unitPrice * value
    })

    setTotalCartCost(tempTotal)
  }

  useEffect(() => {
    calcTotalCost()
  }, [])

  useEffect(() => {
    cartItems = []
    calcTotalCost()
  }, [shoppingCart])

  return (
    <View>
      <Header
        leftComponent={() => (
          <TouchableOpacity
            onPress={() => {
              navigation.openDrawer()
            }}
          >
            <FontIcon
              name="indent"
              color={colors.black}
              size={height(4)}
              solid
            />
          </TouchableOpacity>
        )}
        centerComponent={() => (
          <Text
            style={{
              fontSize: fontSizes.big,
              fontWeight: 'bold',
            }}
          >
            Cart
          </Text>
        )}
        backgroundColor={colors.white}
        rightComponent={() => (
          <TouchableOpacity
            style={{
              alignItems: 'center',
            }}
            onPress={() => {
              cartItems = []
              setTotalCartCost(0)
              dispatch(clearCart())
            }}
          >
            <MaterialCommunityIcons
              name="delete-variant"
              size={24}
              color="black"
            />
            <Text
              style={{
                fontWeight: 'bold',
              }}
            >
              Clear Cart
            </Text>
          </TouchableOpacity>
        )}
      />
      <FlatList
        data={shoppingCart}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={({ item }) => {
          const cartCount = shoppingCart.reduce(
            (acc, cur) => (cur.id === item.id ? ++acc : acc),
            0,
          )

          if (cartItems.includes(item.id) === false) {
            cartItems.push(item.id)

            // eachItemCost.push(
            //   cartCount *
            //     numeral(item.salePrices[0].value / 100).format('0.00'),
            // )

            return (
              <View
                style={{
                  backgroundColor: colors.white,
                  marginVertical: height(1),
                  marginHorizontal: width(2),
                  borderRadius: width(2),
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    marginVertical: width(2),
                    marginHorizontal: width(2),
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    alignContent: 'center',
                    paddingBottom: width(1),
                    marginTop: height(2),
                  }}
                  key={item.id}
                >
                  <Text
                    style={{
                      maxWidth: '50%',
                      fontSize: fontSizes.maxi,
                      marginRight: width(3),
                    }}
                  >
                    {item.name}
                  </Text>
                  <Text
                    style={{
                      fontSize: fontSizes.maxi,
                      marginRight: width(3),
                    }}
                  >
                    {cartCount} X{' '}
                    {numberFormatter(
                      numeral(item.salePrices[0].value / 100).format('0.00'),
                      2,
                      true,
                    )}
                  </Text>
                  <Text
                    style={{
                      fontSize: fontSizes.maxi,
                      marginRight: width(3),
                      fontWeight: 'bold',
                    }}
                  >
                    {cartCount *
                      numeral(item.salePrices[0].value / 100).format(
                        '0.00',
                      )}{' '}
                    ₴
                  </Text>
                </View>

                <View
                  style={{
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    marginHorizontal: width(5),
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      dispatch(removeFromCart(item))
                      calcTotalCost()
                    }}
                    style={{
                      backgroundColor: colors.pink,
                      borderRadius: width(12),
                      padding: width(1),
                    }}
                  >
                    <AntDesign name="minus" size={24} color={colors.white} />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      dispatch(addToCart(item))
                      calcTotalCost()
                    }}
                    style={{
                      backgroundColor: colors.pink,
                      borderRadius: width(12),
                      padding: width(1),
                    }}
                  >
                    <AntDesign name="plus" size={24} color={colors.white} />
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    borderBottomColor: colors.pink,
                    borderBottomWidth: 2,
                    marginTop: height(1),
                  }}
                />
              </View>
            )
          }
        }}
        ListFooterComponent={() => {
          return (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                alignContent: 'center',
                alignSelf: 'center',
                backgroundColor: colors.wwhite,
                marginTop: height(2),
              }}
            >
              <Text
                style={{
                  fontSize: fontSizes.huge,
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}
              >
                Total: {totalCartCost} ₴
              </Text>

              <View
                style={{
                  marginTop: height(2),
                }}
              >
                <Button
                  containerStyle={{
                    borderRadius: width(5),
                  }}
                  buttonStyle={{
                    backgroundColor: colors.pink,
                    paddingVertical: height(1),
                    paddingHorizontal: width(5),
                    width: width(50),
                  }}
                  titleStyle={{
                    fontSize: fontSizes.big,
                  }}
                  title="Checkout"
                  onPress={() => {
                    navigation.navigate('CheckoutScreen', {
                      totalCost: totalCartCost,
                    })
                  }}
                  disabled={shoppingCart.length <= 0}
                />
              </View>
            </View>
          )
        }}
        contentContainerStyle={{
          paddingBottom: height(10),
        }}
      />
    </View>
  )
}
