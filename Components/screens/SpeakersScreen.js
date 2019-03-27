import React, { Component } from 'react'
import { View } from 'react-native'

import Header from '../shared/Header'
import SpeakerList from '../views/speaker/SpeakerList'

class SpeakersScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header pageName='Speakers' />
        <SpeakerList />
      </View>
    )
  }
}

export default SpeakersScreen