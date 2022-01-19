import React from 'react'
import PropTypes from 'prop-types'
import {
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native'
import { colors, appStyles, images } from 'theme'
import { Header, Image } from 'react-native-elements'
import FontIcon from 'react-native-vector-icons/FontAwesome5'
import { height, width } from 'react-native-dimension'
import { getProducts } from '../../utils/Actions'

const Home = ({ navigation }) => (
  <>
    <Header
      leftComponent={() => (
        <TouchableOpacity
          onPress={() => {
            navigation.openDrawer()
          }}
        >
          <FontIcon name="indent" color={colors.black} size={height(4)} solid />
        </TouchableOpacity>
      )}
      containerStyle={{
        paddingTop: 0,
        // marginTop: 0,
      }}
      backgroundColor={colors.white}
    />

    <FlatList
      data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 77, 8]}
      renderItem={() => (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            getProducts()
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
              <View
                style={{
                  marginTop: height(1),
                }}
              >
                <Image
                  style={{
                    width: height(20),
                    height: '100%',
                  }}
                  source={images.demo}
                  height={height(10)}
                  width={width(50)}
                  PlaceholderContent={<ActivityIndicator />}
                />
              </View>
              <View>
                <Text
                  style={{
                    ...appStyles.textMaxi,
                    paddingTop: height(1),
                  }}
                >
                  Hello World
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      )}
    />

    <StatusBar barStyle="dark-content" />
  </>
)

Home.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
}

Home.defaultProps = {
  navigation: { navigate: () => null },
}

export default Home
