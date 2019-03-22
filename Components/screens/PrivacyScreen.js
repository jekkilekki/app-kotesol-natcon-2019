import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

class PrivacyScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>PrivacyScreen</Text>
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

export default PrivacyScreen