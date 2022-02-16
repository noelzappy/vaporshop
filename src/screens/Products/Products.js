import React, { useState, useEffect, useRef } from 'react'
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native'
import { AntDesign, MaterialIcons } from '@expo/vector-icons'
import { useSelector, useDispatch } from 'react-redux'
import { colors, fontSizes, images, fonts } from 'theme'
import { height, width } from 'react-native-dimension'
import fuzzysort from 'fuzzysort'
import SkeletonLoader from 'expo-skeleton-loader'
import DropdownAlert from 'react-native-dropdownalert'
import { FAB, Header, Input } from 'react-native-elements'
import ProductItem from '../../components/ProductItem'
import {
  clearFilterErrors,
  getProductsFilteredByFolder,
} from '../../utils/Actions'
import { appStyles } from '../../theme/styles'

export default function Products({ navigation, route }) {
  const dispatch = useDispatch()
  const dropDownAlert = useRef(null)
  const { category, itemCount, fromHome, itemName, titleName } = route.params
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
  const [isAllEmpty, setIsAllEmpty] = useState(false)

  function fetchFilteredItems(cat) {
    const filtObj = fromHome ? `${cat.pathName}/${cat.name}` : cat
    dispatch(getProductsFilteredByFolder(filtObj))
  }

  // Fetch prducts
  useEffect(() => {
    if (fromHome) {
      if (itemCount <= 0) {
        setIsAllEmpty(true)
        setIsLoaded(true)
      } else {
        fetchFilteredItems(category)
      }
    } else {
      fetchFilteredItems(itemName)
    }
  }, [])

  useEffect(() => {
    if (
      folderFilteredProductsSuccess &&
      !folderFilteredProductsFailed &&
      folderFilteredProducts !== null
    ) {
      setIsLoaded(true)
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
    <>
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
            numberOfLines={1}
          >
            {fromHome ? category.name : titleName}
          </Text>
        )}
        backgroundColor={colors.white}
      />
      {isLoaded ? (
        <>
          <Input
            placeholder="Пошук..."
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
              isAllEmpty
                ? []
                : searchResult.length > 0
                ? searchResult.sort((a, b) => a.name.localeCompare(b.name))
                : folderFilteredProducts.sort((a, b) =>
                    a.name.localeCompare(b.name),
                  )
            }
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
                    fontFamily: fonts.mates.semiBold,
                  }}
                >
                  No Product Found In Category
                </Text>
              </View>
            )}
          />
        </>
      ) : (
        <View
          style={{
            marginHorizontal: width(2),
          }}
        >
          <SkeletonLoader
            style={{ marginVertical: 10 }}
            boneColor="dimgray"
            highlightColor="darkgray"
            duration={1500}
          >
            <SkeletonLoader.Item
              style={{
                width: '100%',
                height: height(5),
                marginVertical: 10,
                borderRadius: width(1),
              }}
              // boneColor={colors.gray
              // highlightColor="white"
            />

            <SkeletonLoader.Container
              style={{
                paddingVertical: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <SkeletonLoader.Container>
                <SkeletonLoader.Item
                  style={{ width: width(45), height: 20, marginBottom: 5 }}
                />
                <SkeletonLoader.Item style={{ width: width(20), height: 20 }} />
                <SkeletonLoader.Container
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: height(2),
                  }}
                >
                  <SkeletonLoader.Item
                    style={{ width: width(30), height: 30 }}
                  />
                </SkeletonLoader.Container>
              </SkeletonLoader.Container>

              <SkeletonLoader.Container>
                <SkeletonLoader.Item
                  style={{
                    width: width(40),
                    height: height(15),
                    marginVertical: 10,
                    borderRadius: width(5),
                  }}
                  // boneColor={colors.gray
                  // highlightColor="white"
                />
              </SkeletonLoader.Container>
            </SkeletonLoader.Container>
            <SkeletonLoader.Container
              style={{
                paddingVertical: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <SkeletonLoader.Container>
                <SkeletonLoader.Item
                  style={{ width: width(45), height: 20, marginBottom: 5 }}
                />
                <SkeletonLoader.Item style={{ width: width(20), height: 20 }} />
                <SkeletonLoader.Container
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: height(2),
                  }}
                >
                  <SkeletonLoader.Item
                    style={{ width: width(30), height: 30 }}
                  />
                </SkeletonLoader.Container>
              </SkeletonLoader.Container>

              <SkeletonLoader.Container>
                <SkeletonLoader.Item
                  style={{
                    width: width(40),
                    height: height(15),
                    marginVertical: 10,
                    borderRadius: width(5),
                  }}
                  // boneColor={colors.gray
                  // highlightColor="white"
                />
              </SkeletonLoader.Container>
            </SkeletonLoader.Container>
            <SkeletonLoader.Container
              style={{
                paddingVertical: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <SkeletonLoader.Container>
                <SkeletonLoader.Item
                  style={{ width: width(45), height: 20, marginBottom: 5 }}
                />
                <SkeletonLoader.Item style={{ width: width(20), height: 20 }} />
                <SkeletonLoader.Container
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: height(2),
                  }}
                >
                  <SkeletonLoader.Item
                    style={{ width: width(30), height: 30 }}
                  />
                </SkeletonLoader.Container>
              </SkeletonLoader.Container>

              <SkeletonLoader.Container>
                <SkeletonLoader.Item
                  style={{
                    width: width(40),
                    height: height(15),
                    marginVertical: 10,
                    borderRadius: width(5),
                  }}
                  // boneColor={colors.gray
                  // highlightColor="white"
                />
              </SkeletonLoader.Container>
            </SkeletonLoader.Container>
            <SkeletonLoader.Container
              style={{
                paddingVertical: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <SkeletonLoader.Container>
                <SkeletonLoader.Item
                  style={{ width: width(45), height: 20, marginBottom: 5 }}
                />
                <SkeletonLoader.Item style={{ width: width(20), height: 20 }} />
                <SkeletonLoader.Container
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: height(2),
                  }}
                >
                  <SkeletonLoader.Item
                    style={{ width: width(30), height: 30 }}
                  />
                </SkeletonLoader.Container>
              </SkeletonLoader.Container>

              <SkeletonLoader.Container>
                <SkeletonLoader.Item
                  style={{
                    width: width(40),
                    height: height(15),
                    marginVertical: 10,
                    borderRadius: width(5),
                  }}
                  // boneColor={colors.gray
                  // highlightColor="white"
                />
              </SkeletonLoader.Container>
            </SkeletonLoader.Container>
          </SkeletonLoader>
        </View>
      )}
      <DropdownAlert ref={dropDownAlert} />

      {folderFilteredProducts && folderFilteredProducts.length > 0 && (
        <FAB
          placement="right"
          icon={() => (
            <AntDesign name="shoppingcart" size={28} color={colors.white} />
          )}
          title={shoppingCart.length}
          color={colors.black}
          onPress={() => navigation.navigate('CartScreen')}
        />
      )}
    </>
  )
}
