import React from 'react'
import { DrawerItems, SafeAreaView } from 'react-navigation'
import { ScrollView, StyleSheet, ImageBackground } from 'react-native'

const DrawerComponent = props => {
  return (
    <ScrollView>
      <SafeAreaView style={styles.container} forceInset={{top: 'always', horizontal: 'never'}}>
        <ImageBackground source={require('../../assets/img/splash.png')} style={{flex: 1, width: 280, height: 100, overflow: 'hidden', justifyContent: 'center'}} />
        <DrawerItems {...props} />
      </SafeAreaView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default DrawerComponent