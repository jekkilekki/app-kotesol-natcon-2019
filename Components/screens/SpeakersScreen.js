import React, { Component } from 'react'
import { View } from 'react-native'

import AppScreen from '../shared/layout/AppScreen'
import AppHeader from '../shared/layout/AppHeader'
import SpeakerList from '../SpeakerList'
import AppSearch from '../shared/layout/AppSearch';
import ScreenContent from '../shared/layout/ScreenContent';

class SpeakersScreen extends Component {
  render() {
    return (
      <AppScreen>
        <AppHeader 
          pageName='Speakers' 
          pageSub='Big names, Bigger ideas'
        />
        <ScreenContent>
          <AppSearch />
          <SpeakerList />
        </ScreenContent>
      </AppScreen>
    )
  }
}

export default SpeakersScreen