import React from 'react'
import PropTypes from 'prop-types'
import {
  Text, View, StatusBar, TouchableOpacity,
} from 'react-native'
import { colors } from 'theme'
import { Header } from 'react-native-elements'
import { SafeAreaView } from 'react-native-safe-area-context'
import FontIcon from 'react-native-vector-icons/FontAwesome5'
import { height } from 'react-native-dimension'

const Home = ({ navigation }) => (
  <SafeAreaView>
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
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          // flex: 1,
        }}
      >
        <Text
          style={{
            transform: [{ rotate: '-90deg' }],
            fontSize: height(3.5),
            // marginTop: height(5),
          }}
        >
          VAPORS VAPE SHOP
        </Text>

        <View
          style={
            {
              // width: width(70),
            }
          }
        >
          <Text>Hello World</Text>
        </View>
      </View>
    </View>
    <StatusBar barStyle="dark-content" />
  </SafeAreaView>
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
