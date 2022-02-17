import React, { useState, useEffect } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { useDispatch } from 'react-redux'
import { height, width } from 'react-native-dimension'
import numeral from 'numeral'
import axios from 'axios'
import { addToCart, headers, removeFromCart } from '../utils/Actions'
import { colors, fontSizes, images, fonts } from '../theme'

export default function ProductItem({ item, shoppingCart, dropDownAlert }) {
  const dispatch = useDispatch()

  const cartCount = shoppingCart.reduce(
    (acc, cur) => (cur.id === item.id ? ++acc : acc),
    0,
  )

  const getProductImage = async (link) => {
    try {
      const response = await axios.get(link, { headers })

      const { rows } = response.data

      if (rows.length) {
        return rows[0].meta.downloadHref
      }
      return null
    } catch (error) {
      console.log(error)
      return null
    }
  }

  const [productImage, setProductImage] = useState(null)

  useEffect(async () => {
    const imageUrl = await getProductImage(item.images.meta.href)
    if (imageUrl) setProductImage(imageUrl)
  }, [])
  return (
    item.quantity > 0 && (
      <View
        style={{
          marginHorizontal: height(3),
          marginVertical: height(1.6),
          backgroundColor: colors.white,
          borderRadius: width(3),
          paddingVertical: height(2),
          paddingHorizontal: width(2),
          marginBottom: height(1),
          flexDirection: 'row',
          justifyContent: 'space-between',
          overflow: 'hidden',
          display: 'flex',
          flex: 1,
        }}
        key={item?.id}
      >
        <View
          style={{
            width: '65%',
            marginRight: '4%',
          }}
        >
          <Text
            style={{
              paddingTop: height(1),
              color: colors.black,
              fontSize: fontSizes.normal,
              fontWeight: 'bold',
              fontFamily: fonts.mates.semiBold,
            }}
            numberOfLines={2}
          >
            {item?.name}
          </Text>
          <View
            style={{
              marginTop: height(3),
            }}
          >
            <Text
              style={{
                fontSize: fontSizes.maxi,
                fontWeight: 'bold',
                color: colors.black,
                fontFamily: fonts.mates.semiBold,
              }}
            >
              {numeral(item?.salePrices[0].value / 100).format('0.00')} ₴
            </Text>
          </View>

          <View
            style={{
              flexDirection: cartCount > 0 ? 'row' : 'column',
              justifyContent: 'space-between',
              alignItems: cartCount > 0 ? 'center' : 'flex-start',
              marginTop: height(1),
            }}
          >
            <TouchableOpacity
              onPress={() => {
                if (item.quantity <= 0 || cartCount === item.quantity) {
                  dropDownAlert.current.alertWithType(
                    'warning',
                    'Зверніть увагу!',
                    'Максимальна кількість товару',
                  )
                } else {
                  dispatch(addToCart(item))
                }
              }}
              // disabled={item.quantity <= 0 || cartCount === item.quantity}
              style={{
                backgroundColor: colors.pink,
                padding: height(1),
                borderRadius: width(1),
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <Text
                style={{
                  color: colors.white,
                  fontSize: 12,
                  fontFamily: fonts.mates.semiBold,
                }}
                numberOfLines={1}
              >
                {cartCount === 0 ? 'Додати до корзини' : 'Додати'}
              </Text>
            </TouchableOpacity>
            {cartCount > 0 && (
              <View
                style={{
                  padding: width(4),
                }}
              >
                <Text
                  style={{
                    fontFamily: fonts.mates.semiBold,
                  }}
                >
                  {cartCount}
                </Text>
              </View>
            )}
            {cartCount > 0 && (
              <TouchableOpacity
                onPress={() => {
                  dispatch(removeFromCart(item))
                }}
                disabled={cartCount === 0}
                style={{
                  backgroundColor: colors.pink,
                  padding: height(1),
                  borderRadius: width(1),
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                }}
              >
                <Text
                  style={{
                    color: colors.white,
                    fontSize: 12,
                    fontFamily: fonts.mates.semiBold,
                  }}
                  numberOfLines={1}
                >
                  Видалити
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View
          style={{
            width: '34%',
          }}
        >
          <Image
            style={{
              // width: height(12),
              // height: height(10),
              backgroundColor: colors.spGray,
              borderRadius: width(2),
              // padding: height(2),
              height: '100%',
            }}
            source={{
              uri: productImage,
              method: 'GET',
              headers,
            }}
            // source={images.demo}
          />
        </View>
      </View>
    )
  )
}
