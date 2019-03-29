import React, { Component } from 'react'
import { View, SafeAreaView, Text, StyleSheet, Button } from 'react-native'

import AppHeader from '../shared/layout/AppHeader'
import AppText from '../shared/text/AppText'
import AppScreen from '../shared/layout/AppScreen'

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
      <AppScreen>
        <AppHeader 
          pageName='Schedule' 
          pageSub='Explore the presentation tracks'
        />
        <View style={styles.container}>
          <AppText>ScheduleScreen</AppText>
          <Button
            title="View Welcome Screen"
            onPress={() => this.props.navigation.navigate('Welcome')}
          />
        </View>
      </AppScreen>
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