import React, { Component } from 'react'
import { View, SafeAreaView, Text, StyleSheet, Button } from 'react-native'

import AppHeader from '../shared/layout/AppHeader'
import AppText from '../shared/text/AppText'
import AppScreen from '../shared/layout/AppScreen'
import ScreenContent from '../shared/layout/ScreenContent'
import ContentButton from '../shared/buttons/ContentButton'

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
        <ScreenContent>
          <ContentButton
            title="View Welcome Screen"
            onPress={() => this.props.navigation.navigate('Welcome')}
          />
        </ScreenContent>
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