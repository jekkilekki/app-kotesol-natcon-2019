import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

class ConductScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>ConductScreen</Text>
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

export default ConductScreen