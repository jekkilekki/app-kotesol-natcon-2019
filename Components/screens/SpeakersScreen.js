import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

import Header from '../shared/Header'
import SpeakerList from '../views/speaker/SpeakerList'

class SpeakersScreen extends Component {
  render() {
    return (
      <View>
        <Header 
          pageName='Speakers' 
          background='#151537' 
          color='#ffffff'
        />
        <SpeakerList />
      </View>
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

export default SpeakersScreen