import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import { Button, Header } from 'react-native-elements'
import { useDispatch, useSelector } from 'react-redux'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import FontIcon from 'react-native-vector-icons/FontAwesome5'
import numeral from 'numeral'
import { colors, fontSizes } from 'theme'
import { height, width } from 'react-native-dimension'
import { clearCart, numberFormatter } from '../../utils/Actions'

export default function CartScreen({ navigation }) {
  const dispatch = useDispatch()
  const { app } = useSelector((state) => state)
  const { shoppingCart } = app

  const [totalCartCost, setTotalCartCost] = useState(0)
  let cartItems = []
  const eachItemCost = []

  const calcTotalCost = () => {
    let tempCost = 0
    eachItemCost.forEach((cost) => (tempCost += cost))
    // console.log(tempCost)
    setTotalCartCost(tempCost)
  }

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

            eachItemCost.push(
              cartCount *
                numeral(item.salePrices[0].value / 100).format('0.00'),
            )

            return (
              <View
                style={{
                  flexDirection: 'row',
                  marginVertical: width(2),
                  marginHorizontal: width(2),
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  alignContent: 'center',
                  borderBottomColor: colors.pink,
                  borderBottomWidth: 2,
                  paddingBottom: width(1),
                }}
                key={item.id}
              >
                <Text
                  style={{
                    width: '50%',
                    fontSize: fontSizes.maxi,
                    marginRight: width(3),
                  }}
                  numberOfLines={1}
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
                    numeral(item.salePrices[0].value / 100).format('0.00')}{' '}
                  ₴
                </Text>
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
