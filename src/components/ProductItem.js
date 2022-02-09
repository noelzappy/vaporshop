import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { useDispatch } from 'react-redux'
import { height, width } from 'react-native-dimension'
import numeral from 'numeral'
import { addToCart, headers, removeFromCart } from '../utils/Actions'
import { colors, fontSizes, images } from '../theme'

export default function ProductItem({ item, shoppingCart }) {
  const dispatch = useDispatch()

  const cartCount = shoppingCart.reduce(
    (acc, cur) => (cur.id === item.id ? ++acc : acc),
    0,
  )

  return (
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
          width: '55%',
          marginRight: '4%',
        }}
      >
        <Text
          style={{
            paddingTop: height(1),
            color: colors.black,
            fontSize: fontSizes.normal,
            fontWeight: 'bold',
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
            }}
          >
            {numeral(item?.salePrices[0].value / 100).format('0.00')} ₴
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            // paddingTop: height(2),
            alignItems: 'center',
          }}
        >
          <View
            style={{
              width: '60%',
            }}
          >
            <Text
              style={{
                paddingTop: height(1),
                fontSize: fontSizes.normal,
                color: item.quantity > 0 ? 'green' : 'red',
              }}
              numberOfLines={2}
            >
              {item.quantity > 0
                ? `Наявність: ${item.quantity}`
                : 'Немає в наявості'}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '40%',
            }}
          >
            <TouchableOpacity
              onPress={() => {
                dispatch(addToCart(item))
              }}
              disabled={item.quantity <= 0 || cartCount === item.quantity}
            >
              <AntDesign name="pluscircle" size={24} color={colors.pink} />
            </TouchableOpacity>
            <View>
              <Text>{cartCount}</Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                dispatch(removeFromCart(item))
              }}
              disabled={cartCount === 0}
            >
              <AntDesign name="minuscircle" size={24} color={colors.pink} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View
        style={{
          width: '40%',
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
          // source={{
          //   uri: item?.images.meta.href,
          //   method: 'GET',
          //   headers,
          // }}
          source={images.demo}
        />
      </View>
    </View>
  )
}
