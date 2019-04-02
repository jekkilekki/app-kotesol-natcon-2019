import React, { Component } from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'

import AppScreen from '../shared/layout/AppScreen'
import AppHeader from '../shared/layout/AppHeader'
import AppText from '../shared/text/AppText'

class MoreScreen extends Component {
  render() {
    return (
      <AppScreen>
        <AppHeader 
          pageName='Sitemap' 
          pageSub='Navigate to any page in this app'
        />
        <AppText>MoreScreen</AppText>
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