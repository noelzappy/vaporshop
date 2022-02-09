import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { fontSizes } from '../theme'

const MainScreen = ({ navigation }) => {
  return (
    <View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            fontSize: fontSizes.big,
          }}
        >
          Choose City
        </Text>
      </View>

      <View>
        <View>
          <TouchableOpacity>
            <Text> Accra</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity>
            <Text> Accra</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity>
            <Text> Accra</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default MainScreen
