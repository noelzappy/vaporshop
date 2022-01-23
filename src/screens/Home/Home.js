import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { Text, View, StatusBar, TouchableOpacity, FlatList } from 'react-native'
import { colors, fontSizes } from 'theme'
import { Header } from 'react-native-elements'
import FontIcon from 'react-native-vector-icons/FontAwesome5'
import { useDispatch, useSelector } from 'react-redux'
import { height, width } from 'react-native-dimension'
import DropdownAlert from 'react-native-dropdownalert'
import { clearCategoryErrors } from '../../utils/Actions'

const Home = ({ navigation }) => {
  const dispatch = useDispatch()
  const dropDownAlert = useRef(null)
  const { app } = useSelector((state) => state)
  const {
    productCategories,
    getCategoriesFailedError,
    getCategoriesFailed,
    getCategoriesSuccess,
  } = app

  useEffect(() => {
    if (getCategoriesFailed === true && getCategoriesSuccess === false) {
      dropDownAlert.current.alertWithType(
        'error',
        'Categories',
        getCategoriesFailedError,
      )
      dispatch(clearCategoryErrors())
    }
  }, [getCategoriesFailed, getCategoriesSuccess])

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

      <FlatList
        data={productCategories}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                navigation.navigate('ProductsScreen')
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
                    height: height(10),
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

                  {/* <FastImage
                      source={{
                        uri: 'https://unsplash.it/400/400?image=1',
                        headers: { Authorization: 'someAuthToken' },
                        priority: FastImage.priority.normal,
                      }}
                      resizeMode={FastImage.resizeMode.contain}
                      style={{
                        width: height(20),
                        height: '100%',
                      }}
                    /> */}
                  {/* </View> */}
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
