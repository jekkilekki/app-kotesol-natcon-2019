import React, { Component } from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'

class WelcomeScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Welcome Screen</Text>
        <Button
          title="Auth"
          onPress={() => this.props.navigation.navigate('Auth')}
        />
        <Button
          title="Home"
          onPress={() => this.props.navigation.navigate('Home')}
        />
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

export default WelcomeScreen