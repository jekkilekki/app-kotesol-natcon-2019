import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

import Header from '../shared/Header'

class AboutScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header pageName='About' />
        <View style={styles.container}>
          <Text>AboutScreen</Text>
        </View>
      </View>
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