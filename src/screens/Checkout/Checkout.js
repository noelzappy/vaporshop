import React, { useState, useEffect, useRef } from 'react'
import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import { Button, Header, Input } from 'react-native-elements'
import { colors, fontSizes, fonts } from 'theme'
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
  const {
    shoppingCart,
    orderPlacementSuccess,
    orderPlacementFailed,
    defaultStore,
  } = app
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
  const [isSubmitting, setIsSubmitting] = useState(false)

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
      setIsSubmitting(false)
      dropDownAlert.current.alertWithType(
        'success',
        'Order',
        'Your Order was places successfuly',
      )
      dispatch(clearCart())
      dispatch(clearOrderErrors())
      resetUserData()

      setTimeout(() => {
        navigation.navigate('Home')
      }, 2000)
    } else if (!orderPlacementSuccess && orderPlacementFailed) {
      setIsSubmitting(false)
      dropDownAlert.current.alertWithType(
        'error',
        'Order',
        'We could not place your order. Pleasetry again',
      )
      dispatch(clearOrderErrors())
    }
  }, [orderPlacementSuccess, orderPlacementFailed])

  function submitData() {
    setIsSubmitting(true)
    const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if (userName === '') {
      dropDownAlert.current.alertWithType(
        'error',
        'Order',
        'Please enter enter your name',
      )
      setIsSubmitting(false)
    } else if (userEmail === '' || userEmail === null) {
      dropDownAlert.current.alertWithType(
        'error',
        'Order',
        'Please enter an email address',
      )
      setIsSubmitting(false)
    } else if (!userEmail.match(regexEmail)) {
      dropDownAlert.current.alertWithType(
        'error',
        'Order',
        'Please enter a valid email address',
      )
      setIsSubmitting(false)
    } else if (userPhoneNumber === '' || userPhoneNumber === null) {
      dropDownAlert.current.alertWithType(
        'error',
        'Order',
        'Please enter your phone number',
      )
      setIsSubmitting(false)
    } else if (userDeliveryAddress === '' || userDeliveryAddress === null) {
      dropDownAlert.current.alertWithType(
        'error',
        'Order',
        'Please enter your delivery address',
      )
      setIsSubmitting(false)
    } else if (phoneInput.current.isValidNumber(userPhoneNumber) === false) {
      dropDownAlert.current.alertWithType(
        'error',
        'Order',
        'Please enter a valid phone number',
      )
      setIsSubmitting(false)
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
            defaultStore,
            totalCost,
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
              fontFamily: fonts.mates.semiBold,
            }}
          >
            Ваша інформація
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
          fontFamily: fonts.mates.semiBold,
        }}
      >
        Загальна сума: {totalCartCost} ₴
      </Text>
      <ScrollView
        style={{
          marginTop: height(2),
        }}
        keyboardDismissMode="onDrag"
      >
        <View>
          <Input
            placeholder="Iм`я та прізвище"
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
            inputStyle={{ fontFamily: fonts.mates.semiBold }}
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
              flagButtonStyle={{
                display: 'none',
              }}
              placeholder="Hомер телефону"
            />
          </View>
          <Input
            placeholder="Eлектронна пошта "
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
            inputStyle={{ fontFamily: fonts.mates.semiBold }}
            keyboardType="email-address"
          />

          <Input
            placeholder="Адрес доставки"
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
            inputStyle={{ fontFamily: fonts.mates.semiBold }}
            errorMessage="Вкажіть вулицю, будинок, квартиру, при замовлені в інше місто вкажіть дані нової пошти"
            containerStyle={{
              marginBottom: height(2),
            }}
            errorStyle={{
              color: colors.black,
              fontFamily: fonts.mates.regular,
            }}
          />

          <Input
            placeholder="Коментарій замовлення"
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
            inputStyle={{ fontFamily: fonts.mates.semiBold }}
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
                fontFamily: fonts.mates.semiBold,
              }}
            >
              Метод оплати:
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
                fontFamily: fonts.mates.semiBold,
              }}
              title={`Картою`.toUpperCase()}
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
                fontFamily: fonts.mates.semiBold,
              }}
              title={`Готівкою`.toLocaleUpperCase()}
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
                fontFamily: fonts.mates.semiBold,
              }}
              title={`Підтвердити`.toUpperCase()}
              onPress={() => {
                submitData()
              }}
              loading={isSubmitting}
            />
          </View>
        </View>
      </ScrollView>
      <DropdownAlert ref={dropDownAlert} />
    </View>
  )
}
