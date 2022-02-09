import React, { useState, useEffect, useRef } from 'react'
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native'
import { AntDesign, MaterialIcons } from '@expo/vector-icons'
import { useSelector, useDispatch } from 'react-redux'
import { colors, fontSizes, images } from 'theme'
import { height, width } from 'react-native-dimension'
import fuzzysort from 'fuzzysort'
import SkeletonLoader from 'expo-skeleton-loader'
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
    const filtObj = `${cat.pathName}/${cat.name}`
    dispatch(getProductsFilteredByFolder(filtObj))
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
    <View
      style={{
        marginBottom: height(15),
      }}
    >
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
            {category.name}
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
          {folderFilteredProducts && folderFilteredProducts.length > 0 && (
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
                    style={{ width: width(15), height: 20 }}
                  />
                  <SkeletonLoader.Container
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <SkeletonLoader.Item
                      style={{
                        width: width(3),
                        height: 20,

                        borderRadius: width(10),
                      }}
                    />
                    <SkeletonLoader.Item
                      style={{
                        width: width(3),
                        height: 20,

                        marginLeft: 5,
                        borderRadius: width(10),
                      }}
                    />
                  </SkeletonLoader.Container>
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
                    style={{ width: width(15), height: 20 }}
                  />
                  <SkeletonLoader.Container
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <SkeletonLoader.Item
                      style={{
                        width: width(3),
                        height: 20,

                        borderRadius: width(10),
                      }}
                    />
                    <SkeletonLoader.Item
                      style={{
                        width: width(3),
                        height: 20,

                        marginLeft: 5,
                        borderRadius: width(10),
                      }}
                    />
                  </SkeletonLoader.Container>
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
                    style={{ width: width(15), height: 20 }}
                  />
                  <SkeletonLoader.Container
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <SkeletonLoader.Item
                      style={{
                        width: width(3),
                        height: 20,

                        borderRadius: width(10),
                      }}
                    />
                    <SkeletonLoader.Item
                      style={{
                        width: width(3),
                        height: 20,

                        marginLeft: 5,
                        borderRadius: width(10),
                      }}
                    />
                  </SkeletonLoader.Container>
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
                    style={{ width: width(15), height: 20 }}
                  />
                  <SkeletonLoader.Container
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <SkeletonLoader.Item
                      style={{
                        width: width(3),
                        height: 20,

                        borderRadius: width(10),
                      }}
                    />
                    <SkeletonLoader.Item
                      style={{
                        width: width(3),
                        height: 20,

                        marginLeft: 5,
                        borderRadius: width(10),
                      }}
                    />
                  </SkeletonLoader.Container>
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
    </View>
  )
}
