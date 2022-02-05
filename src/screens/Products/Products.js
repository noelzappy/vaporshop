import React, { useState, useEffect, useRef } from 'react'
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native'
import { AntDesign, MaterialIcons } from '@expo/vector-icons'
import { useSelector, useDispatch } from 'react-redux'
import { colors, fontSizes, images } from 'theme'
import { height, width } from 'react-native-dimension'
import fuzzysort from 'fuzzysort'
import DropdownAlert from 'react-native-dropdownalert'
import { Header, Input } from 'react-native-elements'
import ProductItem from '../../components/ProductItem'
import {
  clearFilterErrors,
  getProductsFilteredByFolder,
} from '../../utils/Actions'
import { appStyles } from '../../theme/styles'

export default function Products({ navigation, route }) {
  const dispatch = useDispatch()
  const dropDownAlert = useRef(null)
  const { category } = route.params
  const { app } = useSelector((state) => state)
  const {
    folderFilteredProducts,
    shoppingCart,
    folderFilteredProductsError,
    folderFilteredProductsFailed,
    folderFilteredProductsSuccess,
  } = app

  const [searchResult, setSearchResult] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoaded, setIsLoaded] = useState(false)

  function fetchFilteredItems(cat) {
    if (cat.productFolder) {
      dispatch(getProductsFilteredByFolder(cat.productFolder.meta.href))
    } else {
      dispatch(getProductsFilteredByFolder(cat.meta.href))
    }
  }
  // Fetch prducts
  useEffect(() => {
    // console.log(category)

    fetchFilteredItems(category)
  }, [])

  useEffect(() => {
    if (
      folderFilteredProductsSuccess &&
      !folderFilteredProductsFailed &&
      folderFilteredProducts !== null
    ) {
      // console.log(folderFilteredProducts)
      // setIsLoaded(true)
    } else if (folderFilteredProductsFailed && !folderFilteredProductsSuccess) {
      setIsLoaded(false)
      dropDownAlert.current.alertWithType(
        'error',
        'Categories',
        folderFilteredProductsError,
      )
      dispatch(clearFilterErrors())
    }
  }, [
    folderFilteredProducts,
    folderFilteredProductsError,
    folderFilteredProductsFailed,
    folderFilteredProductsSuccess,
  ])

  // Search
  useEffect(() => {
    if (searchTerm !== '') {
      try {
        const foundArray = fuzzysort.go(
          searchTerm,
          folderFilteredProducts.slice(0, 100),
          {
            key: 'name',
            limit: 100,
          },
        )

        const newArr = []

        foundArray.forEach((val) => {
          newArr.push(val.obj)
        })
        setSearchResult(newArr)
      } catch (error) {
        dropDownAlert.current.alertWithType('error', 'Search', error)
      }
    }
  }, [searchTerm])

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
            Products
          </Text>
        )}
        backgroundColor={colors.white}
      />
      {isLoaded ? (
        <>
          <Input
            placeholder="Search.."
            leftIcon={() => (
              <MaterialIcons name="search" size={24} color={colors.white} />
            )}
            onChangeText={(text) => setSearchTerm(text)}
            inputContainerStyle={appStyles.inputContainerStyle}
            value={searchTerm}
            placeholderTextColor={colors.white}
            inputStyle={appStyles.inputStyle}
          />

          <FlatList
            initialNumToRender={30}
            data={
              searchResult.length > 0 ? searchResult : folderFilteredProducts
            }
            renderItem={({ item }) => {
              return <ProductItem item={item} shoppingCart={shoppingCart} />
            }}
            ListEmptyComponent={() => (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: height(5),
                }}
              >
                <Image
                  style={{
                    width: width(70),
                    height: height(20),
                    backgroundColor: colors.pink,
                    borderRadius: width(2),
                  }}
                  source={images.notfound}
                />
                <Text
                  style={{
                    fontSize: fontSizes.maxi,
                    fontWeight: 'bold',
                    marginTop: height(2),
                  }}
                >
                  No Product Found In Category
                </Text>
              </View>
            )}
          />
          {folderFilteredProducts.length > 0 && (
            <>
              <TouchableOpacity
                style={{
                  width: height(8),
                  height: height(8),
                  borderRadius: 30,
                  backgroundColor: colors.black,
                  position: 'absolute',
                  bottom: height(20),
                  right: 10,
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignContent: 'center',
                }}
                activeOpacity={0.8}
                onPress={() => navigation.navigate('CartScreen')}
              >
                <View
                  style={{
                    backgroundColor: colors.white,
                    borderRadius: width(3),
                    padding: width(1),
                  }}
                >
                  <Text
                    style={{
                      fontSize: fontSizes.normal,
                      fontWeight: 'bold',
                    }}
                  >
                    {shoppingCart.length}
                  </Text>
                </View>
                <AntDesign name="shoppingcart" size={28} color={colors.white} />
              </TouchableOpacity>
            </>
          )}
        </>
      ) : null}
      <DropdownAlert ref={dropDownAlert} />
    </View>
  )
}
