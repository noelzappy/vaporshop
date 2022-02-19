import React, { useState, useEffect, useRef } from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import FontIcon from 'react-native-vector-icons/FontAwesome5'
import { useSelector } from 'react-redux'
import { colors, fontSizes } from 'theme'
import { height, width } from 'react-native-dimension'
import DropdownAlert from 'react-native-dropdownalert'
import { Header, Input } from 'react-native-elements'
import fuzzysort from 'fuzzysort'
import ProductItem from '../../components/ProductItem'
import SearchImage from '../../../assets/images/search.svg'
import { fonts } from '../../theme'

export default function SearchScreen({ navigation }) {
  const { app } = useSelector((state) => state)
  const { products, shoppingCart } = app
  const dropDownAlert = useRef(null)

  const [searchKeyWord, setSearchKeyword] = useState('')
  const [foundProducts, setFoundProducts] = useState([])
  const [localProducts, setLocalProducts] = useState(() => {
    const prods = products.filter((obj) => {
      // console.log(obj.pathName.split('/', 1).join())
      if (
        obj.pathName === '01 Одноразові под системи' ||
        obj.pathName.split('/', 1).join() === '01 Одноразові под системи'
      ) {
        return obj
      }
    })
    return prods
  })

  useEffect(() => {
    try {
      const foundArray = fuzzysort.go(searchKeyWord, localProducts, {
        key: 'name',
        limit: 100,
      })

      const newArr = []

      foundArray.forEach((item) => {
        newArr.push(item.obj)
      })
      setFoundProducts(newArr)
    } catch (error) {
      console.log(error)
    }
  }, [searchKeyWord])

  return (
    <View
      style={{
        marginBottom: height(15),
      }}
    >
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
            {`Пошук`.toUpperCase()}
          </Text>
        )}
        backgroundColor={colors.white}
      />

      <Input
        placeholder="Пошук..."
        leftIcon={() => (
          <MaterialIcons name="search" size={24} color={colors.white} />
        )}
        onChangeText={(text) => setSearchKeyword(text)}
        inputContainerStyle={{
          backgroundColor: colors.pink,
          paddingHorizontal: width(1.6),
          borderBottomWidth: 0,
          height: height(6),
          marginTop: height(1),
          borderRadius: width(3),
        }}
        value={searchKeyWord}
        placeholderTextColor={colors.white}
        inputStyle={{
          color: colors.white,
          fontSize: fontSizes.big,
        }}
      />

      <FlatList
        initialNumToRender={30}
        data={foundProducts}
        renderItem={({ item }) => {
          return (
            <ProductItem
              item={item}
              shoppingCart={shoppingCart}
              dropDownAlert={dropDownAlert}
            />
          )
        }}
        ListEmptyComponent={() => (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <SearchImage height={height(35)} width="100%" />
            <Text
              style={{
                fontSize: fontSizes.maxi,
                fontWeight: 'bold',
                textAlign: 'center',
                fontFamily: fonts.mates.regular,
                paddingTop: height(2),
              }}
            >
              Почніть шукати зараз
            </Text>
          </View>
        )}
      />
      <DropdownAlert ref={dropDownAlert} />
    </View>
  )
}
