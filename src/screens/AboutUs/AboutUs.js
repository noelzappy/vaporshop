import React from 'react'
import { Linking, TouchableOpacity } from 'react-native'

import { AntDesign } from '@expo/vector-icons'
import { Text, ListItem, Header } from 'react-native-elements'
import { colors, fonts, fontSizes } from '../../theme'

const AboutUs = ({ navigation }) => {
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
          >
            Про нас
          </Text>
        )}
        backgroundColor={colors.white}
      />

      <TouchableOpacity
        onPress={() => {
          try {
            Linking.openURL('tel:+380630714486')
          } catch (error) {
            console.log(error)
          }
        }}
      >
        <ListItem bottomDivider>
          <ListItem.Content
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <ListItem.Title>Контактний номер: +380630714486</ListItem.Title>
            <ListItem.Title>
              <AntDesign name="right" size={24} color="black" />
            </ListItem.Title>
          </ListItem.Content>
        </ListItem>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          try {
            Linking.openURL('https://t.me/vaporsvapeshop')
          } catch (error) {
            console.log(error)
          }
        }}
      >
        <ListItem bottomDivider>
          <ListItem.Content
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <ListItem.Title>Телеграм канал</ListItem.Title>
            <ListItem.Title>
              <AntDesign name="right" size={24} color="black" />
            </ListItem.Title>
          </ListItem.Content>
        </ListItem>
      </TouchableOpacity>

      <ListItem bottomDivider>
        <ListItem.Content
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <ListItem.Title>Політика і конфеденційність</ListItem.Title>
          <ListItem.Title>
            <AntDesign name="right" size={24} color="black" />
          </ListItem.Title>
        </ListItem.Content>
      </ListItem>
    </>
  )
}

export default AboutUs
