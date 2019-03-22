import React, { Component } from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'

class AuthScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Auth Screen</Text>
        <Button
          title="Go back"
          onPress={() => this.props.navigation.navigate('Welcome')}
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

export default AuthScreen