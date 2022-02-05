import React from 'react'
import PropTypes from 'prop-types'
import { View, SafeAreaView } from 'react-native'
import { Button } from 'react-native-elements'
import { DrawerActions } from '@react-navigation/native'
import FontIcon from 'react-native-vector-icons/FontAwesome5'
import { colors, fontSizes } from 'theme'
import { height } from 'react-native-dimension'

const styles = {
  root: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 10,
  },
  head: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  main: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
}

const DrawerMenu = ({ navigation }) => (
  <SafeAreaView style={styles.root}>
    <View style={styles.head}>
      <FontIcon.Button
        name="times"
        size={20}
        color={colors.gray}
        backgroundColor="white"
        onPress={() => {
          navigation.dispatch(DrawerActions.closeDrawer())
        }}
      />
    </View>
    <View
      style={{
        marginTop: height(2),
      }}
    >
      <View>
        <Button
          title="Disposables"
          buttonStyle={{
            backgroundColor: colors.white,
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            borderBottomWidth: 1,
            borderColor: colors.gray,
          }}
          titleStyle={{
            color: colors.black,
            fontWeight: 'bold',
            fontSize: fontSizes.huge,
            textAlign: 'left',
          }}
        />
      </View>
    </View>
  </SafeAreaView>
)

DrawerMenu.propTypes = {
  navigation: PropTypes.shape({
    dispatch: PropTypes.func,
  }),
}

DrawerMenu.defaultProps = {
  navigation: {
    dispatch: () => null,
  },
}

export default DrawerMenu
