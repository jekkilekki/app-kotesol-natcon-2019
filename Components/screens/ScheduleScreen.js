import React, { Component } from 'react'
import { View, SafeAreaView, Text, StyleSheet, Button } from 'react-native'

import HeaderGradient from '../shared/HeaderGradient'

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
      <SafeAreaView style={{ flex: 1 }}>
        <HeaderGradient pageName='Schedule' />
        <View style={styles.container}>
          <Text style={{fontFamily: 'nunito'}}>ScheduleScreen</Text>
          <Button
            title="Go back"
            onPress={() => this.props.navigation.navigate('Welcome')}
          />
        </View>
      </SafeAreaView>
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