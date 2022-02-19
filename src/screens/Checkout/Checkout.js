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
import Modal from 'react-native-modal'
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
  const [orderModal, setOrderModal] = useState(false)
  const [orderNumber, setOrderNumber] = useState(null)
  const [deliveryComment, setDeliveryComment] = useState('')

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

  function generateOrderNumber(min, max) {
    setOrderNumber(Math.floor(Math.random() * (max - min + 1) + min))
  }

  useEffect(() => {
    setTotalCartCost(totalCost)
    dispatch(clearOrderErrors())
    calculateCart()
    generateOrderNumber(0, 100000)
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
        'Замовлення',
        'Ваше замовлення було успішно розміщено',
      )
      setOrderModal(true)
      dispatch(clearCart())
      dispatch(clearOrderErrors())
      resetUserData()
    } else if (!orderPlacementSuccess && orderPlacementFailed) {
      setIsSubmitting(false)
      dropDownAlert.current.alertWithType(
        'error',
        'Замовлення',
        'Ми не змогли розмістити ваше замовлення. Будь ласка спробуйте ще раз',
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
        'Замолення',
        'Будь ласка, введіть ваше ім`я та прізвище',
      )
      setIsSubmitting(false)
    } else if (userEmail === '' || userEmail === null) {
      dropDownAlert.current.alertWithType(
        'error',
        'Замовлення',
        'Будь ласка, введіть вашу електронну пошту',
      )
      setIsSubmitting(false)
    } else if (!userEmail.match(regexEmail)) {
      dropDownAlert.current.alertWithType(
        'error',
        'Замовлення',
        'Будь ласка, введіть правильну електронну пошту',
      )
      setIsSubmitting(false)
    } else if (userPhoneNumber === '' || userPhoneNumber === null) {
      dropDownAlert.current.alertWithType(
        'error',
        'Замовлення',
        'Будь ласка, введіть ваш номер телефону',
      )
      setIsSubmitting(false)
    } else if (userDeliveryAddress === '' || userDeliveryAddress === null) {
      dropDownAlert.current.alertWithType(
        'error',
        'Замовлення',
        'Будь ласка, введіть ваш адрес доставки',
      )
      setIsSubmitting(false)
    } else if (
      phoneInput.current.isValidNumber(`+380${userPhoneNumber}`) === false
    ) {
      dropDownAlert.current.alertWithType(
        'error',
        'Замовлення',
        'Будь ласка, введіть ваш правильний номер телефону',
      )
      setIsSubmitting(false)
    } else {
      dispatch(
        sendDataToBot({
          userDetails: {
            userName,
            userEmail,
            userPhoneNumber: `+380${userPhoneNumber}`,
            userDeliveryAddress,
            orderComment,
            paymentMethod,
            defaultStore,
            totalCost,
            orderNumber,
            deliveryComment,
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
        Загальна сума: {totalCartCost}₴
      </Text>

      <Modal isVisible={orderModal}>
        <View
          style={{
            backgroundColor: colors.white,
            paddingVertical: height(2),
            borderRadius: width(2),
            paddingHorizontal: width(3),
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderBottomColor: colors.pink,
              borderBottomWidth: 2,
              paddingBottom: height(1),
            }}
          >
            <TouchableOpacity
              onPress={() => setOrderModal(false)}
              style={{
                padding: height(1),
                backgroundColor: colors.spGray,
                borderRadius: width(12),
              }}
            >
              <AntDesign name="close" size={23} color={colors.pink} />
            </TouchableOpacity>

            <View
              style={{
                width: '100%',
                alignItems: 'center',
                marginLeft: -width(5),
              }}
            >
              <Text
                style={{
                  fontSize: fontSizes.big,
                  fontFamily: fonts.mates.semiBold,
                  textAlign: 'center',
                }}
              >
                #{orderNumber}
              </Text>
              <Text> {defaultStore.name}</Text>
            </View>
          </View>

          <View
            style={{
              padding: width(2),
            }}
          >
            <Text
              style={{
                fontSize: fontSizes.maxi,
                fontFamily: fonts.mates.regularItalic,
              }}
            >
              Дякуємо вам за замовлення! Ваш номер замовлення: #{orderNumber}.{' '}
              Доставка по місту триває 30-90хв але ми робимо все можливе щоб ви
              отримали її найближчим часом, ваш V-SHOP.” для запитань або
              уточнень телефонуйте нам 0630714486.
            </Text>
          </View>
        </View>
      </Modal>

      <ScrollView
        style={{
          marginTop: height(2),
        }}
        keyboardDismissMode="onDrag"
      >
        <View>
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
              borderRadius: width(5),
            }}
            value={orderComment}
            multiline
            numberOfLines={4}
            inputStyle={{
              fontFamily: fonts.mates.semiBold,
            }}
          />

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
              borderRadius: width(5),
            }}
            value={userName}
            inputStyle={{
              fontFamily: fonts.mates.semiBold,
            }}
          />

          <PhoneInput
            ref={phoneInput}
            value={userPhoneNumber}
            containerStyle={{
              display: 'none',
            }}
          />

          <Input
            placeholder="Номер телефону"
            leftIcon={() => (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <MaterialCommunityIcons
                  name="phone-outline"
                  size={24}
                  color="black"
                />
                <Text
                  style={{
                    marginLeft: width(2),
                    fontFamily: fonts.mates.semiBold,
                    fontSize: fontSizes.maxi,
                  }}
                >
                  +38
                </Text>
              </View>
            )}
            onChangeText={(text) => {
              setUserPhoneNumber(text)
            }}
            inputContainerStyle={{
              borderWidth: 1,
              borderColor: colors.pink,
              paddingHorizontal: width(1.6),
              backgroundColor: colors.white,
              borderRadius: width(5),
            }}
            value={userPhoneNumber}
            inputStyle={{
              fontFamily: fonts.mates.semiBold,
            }}
            keyboardType="phone-pad"
            maxLength={10}
          />

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
              borderRadius: width(5),
            }}
            value={userEmail}
            inputStyle={{
              fontFamily: fonts.mates.semiBold,
            }}
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
              borderRadius: width(5),
            }}
            value={userDeliveryAddress}
            inputStyle={{
              fontFamily: fonts.mates.semiBold,
            }}
            errorMessage={`Вкажіть вулицю, будинок, квартиру, при замовлені в інше місто вкажіть дані нової пошти.\nДоставка по місту: 30-90хв`}
            containerStyle={{
              marginBottom: height(2),
            }}
            errorStyle={{
              color: colors.black,
              fontFamily: fonts.mates.bold,
            }}
          />
          <Input
            placeholder="Коментарій доставки"
            leftIcon={() => (
              <MaterialCommunityIcons
                name="comment-outline"
                size={24}
                color="black"
              />
            )}
            onChangeText={(text) => setDeliveryComment(text)}
            inputContainerStyle={{
              borderWidth: 1,
              borderColor: colors.pink,
              paddingHorizontal: width(1.6),
              height: height(10),
              backgroundColor: colors.white,
              borderRadius: width(5),
            }}
            value={deliveryComment}
            multiline
            numberOfLines={4}
            inputStyle={{
              fontFamily: fonts.mates.semiBold,
            }}
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
                borderRadius: width(5),
                marginBottom: 5,
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

                borderRadius: width(5),
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
        <View
          style={{
            height: height(20),
          }}
        />
      </ScrollView>

      <DropdownAlert ref={dropDownAlert} />
    </View>
  )
}
