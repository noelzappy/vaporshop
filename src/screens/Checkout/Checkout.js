import React, { useState, useEffect, useRef } from 'react'
import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import { Button, Header, Input } from 'react-native-elements'
import { colors, fontSizes } from 'theme'
import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome,
} from '@expo/vector-icons'
import PhoneInput from 'react-native-phone-number-input'
import DropdownAlert from 'react-native-dropdownalert'
import numeral from 'numeral'
import { useDispatch, useSelector } from 'react-redux'
import { width, height } from 'react-native-dimension'
import { sendDataToBot, clearOrderErrors, clearCart } from '../../utils/Actions'

export default function Checkout({ navigation, route }) {
  const dispatch = useDispatch()
  const { app } = useSelector((state) => state)
  const { shoppingCart, orderPlacementSuccess, orderPlacementFailed } = app
  const phoneInput = useRef(null)
  const dropDownAlert = useRef(null)
  const { totalCost } = route.params

  const [totalCartCost, setTotalCartCost] = useState(0)
  const [userName, setUserName] = useState('')
  const [userPhoneNumber, setUserPhoneNumber] = useState(null)
  const [userEmail, setUserEmail] = useState(null)
  const [userDeliveryAddress, setUserDeliveryAddress] = useState('')
  const [orderComment, setOrderComment] = useState('')
  const [paymentMethod, settPaymentMethod] = useState('cash')
  const [orderedItems, setOrderedItems] = useState([])

  function calculateCart() {
    const cartItems = []
    const tempOrderedItems = []

    shoppingCart.forEach((item) => {
      const cartCount = shoppingCart.reduce(
        (acc, cur) => (cur.id === item.id ? ++acc : acc),
        0,
      )
      if (cartItems.includes(item.id) === false) {
        cartItems.push(item.id)
        tempOrderedItems.push(
          `\n\n<b>${item.name}</b>\nNumber Ordered: ${cartCount}\nCost: ${
            cartCount * numeral(item.salePrices[0].value / 100).format('0.00')
          } UAH`,
        )
      }
    })
    setOrderedItems(tempOrderedItems)
  }

  useEffect(() => {
    setTotalCartCost(totalCost)
    dispatch(clearOrderErrors())
    calculateCart()
  }, [])

  function resetUserData() {
    setUserDeliveryAddress('')
    setUserEmail('')
    setUserPhoneNumber('')
    setOrderComment('')
    setUserName('')
  }

  useEffect(() => {
    if (orderPlacementSuccess && !orderPlacementFailed) {
      dropDownAlert.current.alertWithType(
        'success',
        'Order',
        'Your Order was places successfuly',
      )
      dispatch(clearCart())
      dispatch(clearOrderErrors())

      resetUserData()
    } else if (!orderPlacementSuccess && orderPlacementFailed) {
      dropDownAlert.current.alertWithType(
        'error',
        'Order',
        'We could not place your order. Pleasetry again',
      )
      dispatch(clearOrderErrors())
    }
  }, [orderPlacementSuccess, orderPlacementFailed])

  function submitData() {
    const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if (userName === '') {
      dropDownAlert.current.alertWithType(
        'error',
        'Order',
        'Please enter enter your name',
      )
    } else if (userEmail === '' || userEmail === null) {
      dropDownAlert.current.alertWithType(
        'error',
        'Order',
        'Please enter an email address',
      )
    } else if (!userEmail.match(regexEmail)) {
      dropDownAlert.current.alertWithType(
        'error',
        'Order',
        'Please enter a valid email address',
      )
    } else if (userPhoneNumber === '' || userPhoneNumber === null) {
      dropDownAlert.current.alertWithType(
        'error',
        'Order',
        'Please enter your phone number',
      )
    } else if (userDeliveryAddress === '' || userDeliveryAddress === null) {
      dropDownAlert.current.alertWithType(
        'error',
        'Order',
        'Please enter your delivery address',
      )
    } else if (phoneInput.current.isValidNumber(userPhoneNumber) === false) {
      dropDownAlert.current.alertWithType(
        'error',
        'Order',
        'Please enter a valid phone number',
      )
    } else {
      dispatch(
        sendDataToBot({
          userDetails: {
            userName,
            userEmail,
            userPhoneNumber,
            userDeliveryAddress,
            orderComment,
            paymentMethod,
          },
          data: orderedItems,
        }),
      )
    }
  }

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
            Checkout
          </Text>
        )}
        backgroundColor={colors.white}
      />
      <Text
        style={{
          fontSize: fontSizes.huge,
          fontWeight: 'bold',
          textAlign: 'center',
          marginTop: height(2),
        }}
      >
        Total: {totalCartCost} ₴
      </Text>
      <ScrollView
        style={{
          marginTop: height(2),
        }}
        keyboardDismissMode="onDrag"
      >
        <View>
          <Input
            placeholder="Your Full Name"
            leftIcon={() => (
              <Ionicons name="person-outline" size={24} color="black" />
            )}
            onChangeText={(text) => setUserName(text)}
            inputContainerStyle={{
              borderWidth: 1,
              borderColor: colors.pink,
              paddingHorizontal: width(1.6),
              backgroundColor: colors.white,
            }}
            value={userName}
          />

          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: height(2),
              paddingHorizontal: width(3),
            }}
          >
            <PhoneInput
              ref={phoneInput}
              defaultCode="UA"
              onChangeFormattedText={(text) => {
                setUserPhoneNumber(text)
              }}
              value={userPhoneNumber}
              containerStyle={{
                width: '100%',
                borderColor: colors.pink,
                borderWidth: 1,
                backgroundColor: colors.white,
              }}
            />
          </View>
          <Input
            placeholder="Your Email Address"
            leftIcon={() => (
              <MaterialCommunityIcons
                name="email-outline"
                size={24}
                color="black"
              />
            )}
            onChangeText={(text) => setUserEmail(text)}
            inputContainerStyle={{
              borderWidth: 1,
              borderColor: colors.pink,
              paddingHorizontal: width(1.6),
              backgroundColor: colors.white,
            }}
            value={userEmail}
            keyboardType="email-address"
          />

          <Input
            placeholder="Delivery Address"
            leftIcon={() => (
              <MaterialCommunityIcons
                name="truck-delivery-outline"
                size={24}
                color="black"
              />
            )}
            onChangeText={(text) => setUserDeliveryAddress(text)}
            inputContainerStyle={{
              borderWidth: 1,
              borderColor: colors.pink,
              paddingHorizontal: width(1.6),
              backgroundColor: colors.white,
            }}
            value={userDeliveryAddress}
          />

          <Input
            placeholder="Comment about your order"
            leftIcon={() => (
              <MaterialCommunityIcons
                name="comment-outline"
                size={24}
                color="black"
              />
            )}
            onChangeText={(text) => setOrderComment(text)}
            inputContainerStyle={{
              borderWidth: 1,
              borderColor: colors.pink,
              paddingHorizontal: width(1.6),
              height: height(10),
              backgroundColor: colors.white,
            }}
            value={orderComment}
            multiline
            numberOfLines={4}
          />
          <View
            style={{
              paddingHorizontal: width(3),
              marginBottom: height(2),
            }}
          >
            <Text
              style={{
                fontSize: fontSizes.maxi,
                fontWeight: 'bold',
                paddingBottom: height(1),
              }}
            >
              Payment Method
            </Text>
            <Button
              containerStyle={{
                // borderRadius: width(5),
                borderWidth: 1,
                borderColor: colors.pink,
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                backgroundColor:
                  paymentMethod === 'card' ? colors.pink : colors.white,
              }}
              buttonStyle={{
                paddingVertical: height(1),
                paddingHorizontal: width(5),
                backgroundColor: 'transparent',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                width: '100%',
              }}
              titleStyle={{
                fontSize: fontSizes.big,
                color: colors.black,
                textAlign: 'left',
                paddingLeft: width(3),
              }}
              title="MASTERCARD/VISA"
              onPress={() => {
                settPaymentMethod('card')
              }}
              iconPosition="left"
              icon={() => (
                <FontAwesome
                  name="credit-card"
                  size={24}
                  color={colors.black}
                />
              )}
            />

            <Button
              containerStyle={{
                // borderRadius: width(5),
                borderWidth: 1,
                borderColor: colors.pink,
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                backgroundColor:
                  paymentMethod === 'cash' ? colors.pink : colors.white,
              }}
              buttonStyle={{
                paddingVertical: height(1),
                paddingHorizontal: width(5),
                backgroundColor: 'transparent',
                width: '100%',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
              }}
              titleStyle={{
                fontSize: fontSizes.big,
                color: colors.black,
                textAlign: 'left',
                paddingLeft: width(3),
              }}
              title="CASH"
              onPress={() => {
                settPaymentMethod('cash')
              }}
              iconPosition="left"
              icon={() => (
                <MaterialCommunityIcons
                  name="cash"
                  size={28}
                  color={colors.black}
                />
              )}
            />
          </View>

          <View
            style={{
              marginTop: height(2),
              paddingHorizontal: width(5),
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
                // width: width(50),
              }}
              titleStyle={{
                fontSize: fontSizes.big,
              }}
              title="SUBMIT"
              onPress={() => {
                submitData()
              }}
            />
          </View>
        </View>
      </ScrollView>
      <DropdownAlert ref={dropDownAlert} />
    </View>
  )
}
