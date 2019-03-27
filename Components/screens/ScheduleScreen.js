import React, { Component } from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'

import Header from '../shared/Header'

class ScheduleScreen extends Component {
  static navigationOptions = {
    title: 'Schedule',
    headerStyle: {
      backgroundColor: '#151537',
      color: '#ffffff'
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header pageName='Schedule' />
        <View style={styles.container}>
          <Text>ScheduleScreen</Text>
          <Button
            title="Go back"
            onPress={() => this.props.navigation.navigate('Welcome')}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  }
})

export default ScheduleScreen