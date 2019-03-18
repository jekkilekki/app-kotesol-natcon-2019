import React from 'react'
import { View, ImageBackground, Text, StyleSheet } from 'react-native'
import { H1 } from 'native-base'
import { tealA700, white } from '../../utils/colors'
import Loader from './Loader'

const Splash = () => {
  console.log( 'Splash' )
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/splash.png')}
        style={[{width: '100%', height: '100%'}, styles.container]}
      >
        <View>
          <H1 style={styles.welcome}>2019 KOTESOL National Conference App</H1>
          <Loader />
        </View>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: tealA700
  },
  logo: {

  },
  welcome: {
    paddingTop: '75%',
    marginBottom: '-100%',
    textAlign: 'center',
    color: white
  }
})

export default Splash