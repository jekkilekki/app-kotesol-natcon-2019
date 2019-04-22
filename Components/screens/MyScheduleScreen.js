import React, { Component } from 'react'
import { View, Text } from 'react-native'

class MyScheduleScreen extends Component {
  render() {
    return (
      <View style={container}>
        <Text>MyScheduleScreen</Text>
      </View>
    )
  }
}

const container = {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center'
}

export default MyScheduleScreen