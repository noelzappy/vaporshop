import React, { useEffect, useRef, useState } from 'react'
import { AntDesign, MaterialIcons, Ionicons } from '@expo/vector-icons'
import PropTypes from 'prop-types'
import { Text, View, StatusBar, TouchableOpacity, FlatList } from 'react-native'
import { Header, Input } from 'react-native-elements'
import FontIcon from 'react-native-vector-icons/FontAwesome5'
import { useDispatch, useSelector } from 'react-redux'
import { height, width } from 'react-native-dimension'
import DropdownAlert from 'react-native-dropdownalert'
import fuzzysort from 'fuzzysort'
import Modal from 'react-native-modal'
import { colors, fontSizes, appStyles } from '../../theme'

import {
  clearCategoryErrors,
  clearFilteredProducts,
  getProducts,
  getWarehouse,
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

    wareHouses,
    getWareHousesError,
    getWareHouseFail,
    getWareHouseSuccess,
  } = app

  const [searchResult, setSearchResult] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [showCityModal, setShowCityModal] = useState(false)

  useEffect(() => {
    dispatch(getProducts())
    dispatch(getWarehouse())
    dispatch(clearFilteredProducts())
    console.log(wareHouses)
  }, [])

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
      dropDownAlert.current.alertWithType('error', 'Search', error)
    }
  }, [searchTerm])

  return (
    <>
      <Header
        rightComponent={() => (
          <TouchableOpacity
            onPress={() => {
              setShowCityModal(true)
            }}
          >
            <Ionicons
              name="location"
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
        centerComponent={() => (
          <Text
            style={{
              fontSize: fontSizes.maxi,
              fontWeight: 'bold',
              paddingTop: width(2),
            }}
            numberOfLines={1}
          >
            Одноразові под системи
          </Text>
        )}
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
      />

      <Modal isVisible={showCityModal}>
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
              onPress={() => setShowCityModal(false)}
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
              }}
            >
              <Text
                style={{
                  fontSize: fontSizes.big,
                }}
              >
                Виберіть магазин
              </Text>
            </View>
          </View>

          <View>
            <TouchableOpacity
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginHorizontal: width(3),
                marginVertical: height(2),
                backgroundColor: colors.pink,
                padding: height(1.6),
                borderRadius: width(2),
              }}
            >
              <Text
                style={{
                  color: colors.white,
                  fontSize: fontSizes.maxi,
                }}
              >
                Вул. торгова 15
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginHorizontal: width(3),
                marginVertical: height(2),
                backgroundColor: colors.pink,
                padding: height(1.6),
                borderRadius: width(2),
              }}
            >
              <Text
                style={{
                  color: colors.white,
                  fontSize: fontSizes.maxi,
                }}
              >
                Пр. Чорновола 4
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

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
        data={searchResult.length > 0 ? searchResult : productCategories}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                dispatch(clearFilteredProducts())
                navigation.navigate('ProductsScreen', {
                  category: item,
                })
              }}
            >
              <View style={appStyles.homeContainer2}>
                <View style={appStyles.homeContainer1}>
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
