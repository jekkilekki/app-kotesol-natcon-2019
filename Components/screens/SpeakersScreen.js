import React, { Component } from 'react'
import { View } from 'react-native'

import AppScreen from '../shared/layout/AppScreen'
import Header from '../shared/layout/AppHeader'
import SpeakerList from '../views/speaker/SpeakerList'

class SpeakersScreen extends Component {
  render() {
    return (
      <AppScreen>
        <Header 
          pageName='Speakers' 
          pageSub='Big names, Bigger ideas'
        />
        <SpeakerList />
      </AppScreen>
    )
  }
}

export default SpeakersScreen