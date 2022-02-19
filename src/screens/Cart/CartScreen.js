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
import { colors, fontSizes, fonts } from '../../theme'
import EmptyCartImage from '../../../assets/images/empty-cart.svg'

export default function CartScreen({ navigation }) {
  const dispatch = useDispatch()
  const { app } = useSelector((state) => state)
  const { shoppingCart } = app

  const [totalCartCost, setTotalCartCost] = useState(0)
  const [cartItems, setCartItems] = useState([])

  const calCartItems = () => {
    const tempArr = []
    const newArr = []
    shoppingCart.forEach((item) => {
      if (!tempArr.includes(item.id)) {
        tempArr.push(item.id)
        newArr.push(item)
      }
    })
    setCartItems(newArr)
  }

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
    if (shoppingCart.length <= 0) {
      setTotalCartCost(0)
      dispatch(clearCart())
      setCartItems([])
    } else {
      calCartItems()
      calcTotalCost()
    }

    return setCartItems([])
  }, [])

  useEffect(() => {
    calCartItems()
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
              fontFamily: fonts.mates.semiBold,
            }}
            numberOfLines={1}
          >
            Корзина
          </Text>
        )}
        backgroundColor={colors.white}
        rightComponent={() => (
          <TouchableOpacity
            style={{
              alignItems: 'center',
            }}
            onPress={() => {
              setTotalCartCost(0)
              dispatch(clearCart())
              setCartItems([])
            }}
          >
            <MaterialCommunityIcons
              name="delete-variant"
              size={36}
              color="black"
            />
            {/*  <Text
              style={{
                fontWeight: 'bold',
                fontFamily: fonts.mates.semiBold,
              }}
            >
              Видалити всі
            </Text> */}
          </TouchableOpacity>
        )}
      />

      {shoppingCart.length > 0 && (
        <FlatList
          data={cartItems}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          renderItem={({ item }) => {
            const cartCount = shoppingCart.reduce(
              (acc, cur) => (cur.id === item.id ? ++acc : acc),
              0,
            )

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
                      fontFamily: fonts.mates.semiBold,
                    }}
                  >
                    {item.name}
                  </Text>
                  <Text
                    style={{
                      fontSize: fontSizes.maxi,
                      marginRight: width(3),
                      fontFamily: fonts.mates.semiBold,
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
                      fontFamily: fonts.mates.semiBold,
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
                      calCartItems()
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
                      calCartItems()
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
                    fontFamily: fonts.mates.semiBold,
                  }}
                >
                  Загальна сума: {totalCartCost} ₴
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
                      fontFamily: fonts.mates.semiBold,
                    }}
                    title="Підтвердити"
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
      )}
      {shoppingCart.length <= 0 && (
        <View
          style={{
            alignItems: 'center',
            paddingHorizontal: width(5),
            justifyContent: 'center',
          }}
        >
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              alignContent: 'center',
              alignSelf: 'center',
              backgroundColor: colors.wwhite,
              marginTop: height(5),
            }}
          >
            <View
              style={{
                marginBottom: height(3),
              }}
            >
              <EmptyCartImage height={height(38)} />
            </View>

            <Text
              style={{
                fontSize: fontSizes.maxi,
                fontWeight: 'bold',
                textAlign: 'center',
                fontFamily: fonts.mates.regular,
              }}
            >
              Ваша корзина пуста, будь ласка додайте продукцію до вашої корзини.
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
                  fontFamily: fonts.mates.semiBold,
                }}
                title="Підтвердити"
                onPress={() => {}}
                disabled
              />
            </View>
          </View>
        </View>
      )}
    </View>
  )
}
