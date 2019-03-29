import React, { Component } from 'react'
import { View } from 'react-native'

import AppScreen from '../shared/layout/AppScreen'
import Header from '../shared/layout/AppHeader'
import SpeakerList from '../views/speaker/SpeakerList'
import AppSearch from '../shared/layout/AppSearch';

class SpeakersScreen extends Component {
  render() {
    return (
      <AppScreen>
        <Header 
          pageName='Speakers' 
          pageSub='Big names, Bigger ideas'
        />
        <AppSearch />
        <SpeakerList />
      </AppScreen>
    )
  }
}

export default SpeakersScreen