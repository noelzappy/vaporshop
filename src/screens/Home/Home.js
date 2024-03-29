import React, { useEffect, useRef, useState } from 'react'
import { AntDesign, MaterialIcons, Entypo } from '@expo/vector-icons'
import PropTypes from 'prop-types'
import {
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  RefreshControl,
} from 'react-native'
import { copilot, walkthroughable, CopilotStep } from 'react-native-copilot'
import { Header, Input } from 'react-native-elements'
import FontIcon from 'react-native-vector-icons/FontAwesome5'
import { useDispatch, useSelector } from 'react-redux'
import { height, width } from 'react-native-dimension'
import DropdownAlert from 'react-native-dropdownalert'
import fuzzysort from 'fuzzysort'
import Modal from 'react-native-modal'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { colors, fontSizes, appStyles, images, fonts } from '../../theme'

import {
  clearCategoryErrors,
  clearFilteredProducts,
  setDefaulStore,
  getWarehouse,
  getProducts,
  getCategories,
} from '../../utils/Actions'

const CopilotText = walkthroughable(TouchableOpacity)

const Home = ({ navigation, start }) => {
  const dispatch = useDispatch()
  const dropDownAlert = useRef(null)
  const { app } = useSelector((state) => state)
  const {
    productCategories,
    getCategoriesFailedError,
    getCategoriesFailed,
    getCategoriesSuccess,
    folderFilteredProducts,
    products,
    wareHouses,
    defaultStore,
  } = app

  const [searchResult, setSearchResult] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [showCityModal, setShowCityModal] = useState(false)
  const [isLoadingQuantity, setIsLoadingQuantity] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('@walkthough', value)
    } catch (e) {
      // saving error
    }
  }

  const getData = async () => {
    let val = null
    try {
      const value = await AsyncStorage.getItem('@walkthough')
      val = value
    } catch (e) {
      // error reading value
    }
    return val
  }

  useEffect(async () => {
    const dt = await getData()
    if (dt === null) {
      start()
      storeData('shown')
    }
  }, [])

  useEffect(() => {
    if (defaultStore === null) {
      dispatch(getWarehouse())
    }
  }, [])

  useEffect(() => {
    if (defaultStore === null) {
      dispatch(setDefaulStore(wareHouses[0]))
    }
  }, [wareHouses])

  useEffect(() => {
    setRefreshing(false)
  }, [products])

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
        centerComponent={() => (
          <View style={{ paddingTop: width(2) }}>
            <Text
              style={{
                fontSize: fontSizes.maxi,
                fontWeight: 'bold',
                fontFamily: fonts.mates.semiBold,
              }}
              numberOfLines={1}
            >
              {defaultStore ? defaultStore.name : ''}
            </Text>
          </View>
        )}
        rightComponent={() => (
          <CopilotStep text="Виберіть магазин" order={1}>
            <CopilotText
              onPress={() => {
                setShowCityModal(true)
              }}
            >
              <Entypo name="shop" color={colors.black} size={height(4)} solid />
            </CopilotText>
          </CopilotStep>
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
                Виберіть магазин:
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
              onPress={() => {
                setIsLoadingQuantity(true)
                dispatch(setDefaulStore(wareHouses[0]))
                setShowCityModal(false)
              }}
            >
              <Text
                style={{
                  color: colors.white,
                  fontSize: fontSizes.maxi,
                  fontFamily: fonts.mates.semiBold,
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
              onPress={() => {
                setIsLoadingQuantity(true)
                dispatch(setDefaulStore(wareHouses[1]))
                setShowCityModal(false)
              }}
            >
              <Text
                style={{
                  color: colors.white,
                  fontSize: fontSizes.maxi,
                  fontFamily: fonts.mates.semiBold,
                }}
              >
                Пр. Чорновола 4
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

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
        refreshing
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true)
              dispatch(getProducts())
              dispatch(getWarehouse())
              dispatch(getCategories())
            }}
            tintColor={colors.pink}
          />
        }
        data={
          searchResult.length > 0
            ? searchResult.sort((a, b) => a.name.localeCompare(b.name))
            : productCategories.sort((a, b) => a.name.localeCompare(b.name))
        }
        renderItem={({ item, index }) => {
          const categoryItems = products.filter((obj) => {
            if (
              obj.pathName === `${item.pathName}/${item.name}` &&
              obj.quantity > 0
            ) {
              return obj
            }
          })

          let bgImage = images.one

          switch (item.name) {
            case 'Adalya 1200':
              bgImage = images.five
              break
            case 'B-more 1600':
              bgImage = images.six
              break
            case 'Elf bar 1500':
              bgImage = images.one
              break
            case 'Elf bar 2000':
              bgImage = images.two
              break
            case 'Joyful 1500':
              bgImage = images.four
              break
            case 'Joyfull 600':
              bgImage = images.three
              break
            case 'Troll bar 1500':
              bgImage = images.seven
              break
            case 'Vaal 1500':
              bgImage = images.eight
              break
            case 'Vaporlax 1800':
              bgImage = images.nine
              break
            case 'Vaporlax mate 800':
              bgImage = images.ten
              break
            default:
              bgImage = images.two
              break
          }

          return (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                dispatch(clearFilteredProducts())
                navigation.navigate('ProductsScreen', {
                  category: item,
                  itemCount: categoryItems.length,
                  fromHome: true,
                })
              }}
            >
              <ImageBackground
                style={appStyles.homeContainer2}
                source={bgImage}
                resizeMode="cover"
                imageStyle={{
                  borderRadius: width(5),
                  width: '100%',
                }}
              >
                <View
                  style={{
                    height: height(19.2),
                  }}
                />
                <View
                  style={{
                    borderRadius: width(5),
                    paddingHorizontal: width(3),
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                  }}
                >
                  <Text
                    style={{
                      paddingTop: height(1),
                      color: colors.black,
                      fontSize: fontSizes.big,
                      fontWeight: 'bold',
                      backgroundColor: colors.white,
                      borderRadius: width(4),
                      paddingHorizontal: width(3),
                      overflow: 'hidden',
                      paddingBottom: width(1.5),
                      fontFamily: fonts.mates.semiBold,
                    }}
                  >
                    {item.name.toUpperCase()}
                  </Text>
                </View>
              </ImageBackground>
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

export default copilot({
  labels: {
    finish: 'OK',
  },
})(Home)
