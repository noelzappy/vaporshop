import React, { useEffect, useRef, useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import PropTypes from 'prop-types'
import {
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native'
import { colors, fontSizes } from 'theme'
import { Header, Input, Dialog } from 'react-native-elements'
import FontIcon from 'react-native-vector-icons/FontAwesome5'
import { useDispatch, useSelector } from 'react-redux'
import { height, width } from 'react-native-dimension'
import DropdownAlert from 'react-native-dropdownalert'
import fuzzysort from 'fuzzysort'

import {
  clearCategoryErrors,
  clearFilteredProducts,
  clearFilterErrors,
  getProductsFilteredByFolder,
} from '../../utils/Actions'

const Home = ({ navigation }) => {
  const dispatch = useDispatch()
  const dropDownAlert = useRef(null)
  const { app } = useSelector((state) => state)
  const {
    productCategories,
    getCategoriesFailedError,
    getCategoriesFailed,
    getCategoriesSuccess,

    folderFilteredProducts,
    folderFilteredProductsError,
    folderFilteredProductsFailed,
    folderFilteredProductsSuccess,
  } = app

  const [searchResult, setSearchResult] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingMessage, setIsLoadingMessage] = useState(null)

  const resetLoader = () => {
    setIsLoading(false)
    setIsLoadingMessage(null)
  }

  useEffect(() => {
    dispatch(clearFilteredProducts())
  }, [])

  useEffect(() => {
    if (
      folderFilteredProductsSuccess &&
      !folderFilteredProductsFailed &&
      getCategoriesFailedError === null &&
      folderFilteredProducts !== null
    ) {
      resetLoader()
      navigation.navigate('ProductsScreen')
    } else if (folderFilteredProductsFailed && !folderFilteredProductsSuccess) {
      dropDownAlert.current.alertWithType(
        'error',
        'Categories',
        folderFilteredProductsError,
      )
      dispatch(clearFilterErrors())
      resetLoader()
    }
  }, [
    folderFilteredProducts,
    folderFilteredProductsError,
    folderFilteredProductsFailed,
    folderFilteredProductsSuccess,
  ])

  useEffect(() => {
    if (
      getCategoriesFailed === true &&
      getCategoriesSuccess === false &&
      folderFilteredProducts &&
      folderFilteredProducts.length
    ) {
      dropDownAlert.current.alertWithType(
        'error',
        'Categories',
        getCategoriesFailedError,
      )
      dispatch(clearCategoryErrors())
    }
  }, [getCategoriesFailed, getCategoriesSuccess])

  useEffect(() => {
    try {
      const foundArray = fuzzysort.go(
        searchTerm,
        productCategories.slice(0, 100),
        {
          key: 'name',
          limit: 100,
        },
      )

      const newArr = []

      foundArray.forEach((item) => {
        newArr.push(item.obj)
      })
      setSearchResult(newArr)
    } catch (error) {
      console.log(error)
    }
  }, [searchTerm])

  return (
    <>
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
        containerStyle={{
          paddingTop: 0,
          // marginTop: 0,
        }}
        backgroundColor={colors.white}
      />

      <Dialog isVisible={isLoading} onBackdropPress={() => {}}>
        <ActivityIndicator size="large" color={colors.pink} />

        <Text
          style={{
            fontSize: fontSizes.big,
            textAlign: 'center',
          }}
        >
          {isLoadingMessage}
        </Text>
      </Dialog>

      <Input
        placeholder="Search.."
        leftIcon={() => (
          <MaterialIcons name="search" size={24} color={colors.white} />
        )}
        onChangeText={(text) => setSearchTerm(text)}
        inputContainerStyle={{
          backgroundColor: colors.gray,
          paddingHorizontal: width(1.6),
          borderBottomWidth: 0,
          height: height(6),
          marginTop: height(1),
          borderRadius: width(3),
        }}
        value={searchTerm}
        placeholderTextColor={colors.white}
        inputStyle={{
          color: colors.white,
          fontSize: fontSizes.big,
        }}
      />

      <FlatList
        data={searchResult.length > 0 ? searchResult : productCategories}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                setIsLoading(true)
                setIsLoading('Fetching Products...')
                item.productFolder
                  ? dispatch(
                      getProductsFilteredByFolder(item.productFolder.meta.href),
                    )
                  : dispatch(getProductsFilteredByFolder(item.meta.href))
              }}
            >
              <View
                style={{
                  marginHorizontal: height(3),
                  marginVertical: height(1.6),
                  backgroundColor: colors.pink,
                  borderRadius: width(3),
                }}
              >
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingVertical: height(2),
                    height: height(25),
                    marginBottom: height(1),
                  }}
                >
                  {/* <View
                    style={{
                      marginTop: height(1),
                    }}
                  > */}
                  {/* <Image
                      style={{
                        width: height(20),
                        height: '100%',
                      }}
                      source={{
                        uri: item.meta.href,
                        method: 'POST',
                        headers: {
                          Authorization:
                            'Basic YWRtaW5AeXVyYWx5c3lzaGFrOjU5MDhmNjFkZDE',
                        },
                      }}
                      height={height(10)}
                      width={width(50)}
                      PlaceholderContent={<ActivityIndicator />}
                    /> */}

                  <View>
                    <Text
                      style={{
                        paddingTop: height(1),
                        color: colors.white,
                        fontSize: fontSizes.big,
                        fontWeight: 'bold',
                      }}
                    >
                      {item.name.toUpperCase()}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )
        }}
      />

      <StatusBar barStyle="dark-content" />

      <DropdownAlert ref={dropDownAlert} />
    </>
  )
}

Home.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
}

Home.defaultProps = {
  navigation: { navigate: () => null },
}

export default Home
