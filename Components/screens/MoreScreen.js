import React, { Component } from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'

import AppScreen from '../shared/layout/AppScreen'
import AppHeader from '../shared/layout/AppHeader'
import AppText from '../shared/text/AppText'
import ScreenContent from '../shared/layout/ScreenContent'
import ContentButton from '../shared/buttons/ContentButton'

class MoreScreen extends Component {
  render() {
    return (
      <AppScreen>
        <AppHeader 
          pageName='Sitemap' 
          pageSub='Navigate to any page in this app'
        />
        <ScreenContent>
          <ContentButton
            title="View Welcome Screen"
            onPress={() => this.props.navigation.navigate('Welcome', { overrideRedirect: true })}
          />
          <ContentButton
            title="Attendees"
            onPress={() => this.props.navigation.navigate('Attendees')}
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
    alignItems: 'center'
  }
})

export default MoreScreen