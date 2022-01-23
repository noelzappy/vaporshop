import React, { useState, useEffect, useRef } from 'react'
import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import { Button, Header, Input } from 'react-native-elements'
import { colors, fontSizes } from 'theme'
import { AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import PhoneInput from 'react-native-phone-number-input'
import { useDispatch, useSelector } from 'react-redux'
import { width, height } from 'react-native-dimension'
import { numberFormatter } from '../../utils/Actions'

export default function Checkout({ navigation }) {
  const dispatch = useDispatch()
  const { app } = useSelector((state) => state)
  const { shoppingCart } = app
  const phoneInput = useRef(null)

  const [totalCartCost, setTotalCartCost] = useState(0)
  const [userName, setUserName] = useState('')
  const [userPhoneNumber, setUserPhoneNumber] = useState(null)
  const [userEmail, setUserEmail] = useState(null)
  const [userDeliveryAddress, setUserDeliveryAddress] = useState('')
  const [orderComment, setOrderComment] = useState('')

  const calcTotalCost = () => {
    let tempCost = 0
    shoppingCart.forEach((item) => {
      const cartCount = shoppingCart.reduce(
        (acc, cur) => (cur.id === item.id ? ++acc : acc),
        0,
      )
      tempCost += cartCount * item.buyPrice.value
    })
    setTotalCartCost(tempCost)
  }

  useEffect(() => {
    calcTotalCost()
  }, [])
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
        Total: {numberFormatter(totalCartCost, 3, true)} ₴
      </Text>
      <ScrollView
        style={{
          marginTop: height(2),
        }}
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
                console.log('Formatted', text)
              }}
              value={userPhoneNumber}
              containerStyle={{
                width: '100%',
                borderColor: colors.pink,
                borderWidth: 1,
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
            }}
            value={orderComment}
            multiline
            numberOfLines={4}
          />

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
              onPress={() => {}}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  )
}
