import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

import AppScreen from '../shared/layout/AppScreen'
import Header from '../shared/layout/AppHeader'

class AboutScreen extends Component {
  render() {
    return (
      <AppScreen>
        <Header 
          pageName='About' 
          pageSub='Sponsors, Team, Fine Print'
        />
        <View style={styles.container}>
          <Text>AboutScreen</Text>
        </View>
      </AppScreen>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default AboutScreen