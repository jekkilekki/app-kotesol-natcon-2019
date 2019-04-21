import React, { Component } from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
import AppText from './shared/text/AppText'

import { purpler } from '../utils/colors'

class SpeakerTrackButton extends Component {


  render() {
    const { track } = this.props

    let trackColor = '#fff'
    let trackBGColor = '#232377'

    switch (track) {
      case 'plenary':
        trackBGColor = '#232377'
      case 'Highlighted':
        trackBGColor = '#232377'
      case 'Motivation':
        trackBGColor = 'goldenrod'
      case 'Skills':
        trackBGColor = 'olivegreen'
      case 'Technology':
        trackBGColor = 'aquamarine'
      case 'Mixed':
        trackBGColor = 'blue'
      case 'Research':
        trackBGColor = 'purple'
      case 'Poster':
        trackBGColor = 'green'
      default: 
        trackBGColor = '#fff'
        trackColor = '#232377' 
    }

    return (
      <TouchableOpacity onPress={() => this.props.onPress(track)}
        style={[styles.talkTopic]}
      >
        <AppText center>{track}</AppText>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  talkTopic: {
    color: purpler,
    borderWidth: 1,
    borderColor: purpler,
    borderRadius: 10,
    fontSize: 10,
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 10,
    paddingRight: 10, 
    marginTop: 10
  },
})

export default SpeakerTrackButton