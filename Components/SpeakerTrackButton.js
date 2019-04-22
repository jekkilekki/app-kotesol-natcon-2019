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
        break
      case 'Highlighted':
        trackBGColor = '#232377'
        break
      case 'Motivation':
        trackBGColor = '#F597A8'
        break
      case 'Skills':
        trackBGColor = '#00b9f1'
        break
      case 'Technology':
        trackBGColor = '#ed0972'
        break
      case 'Mixed':
        trackBGColor = '#d63aff'
        break
      case 'Research':
        trackBGColor = '#60f'
        break
      case 'Poster':
        trackBGColor = '#00dddd'
        break
      default: 
        trackBGColor = '#fff'
        trackColor = '#232377' 
    }

    return (
      <TouchableOpacity onPress={this.props.onPress}
        style={[styles.talkTopicButton, {color: trackColor, backgroundColor: trackBGColor}]}
      >
        <AppText center style={{fontSize: 10}}>{track}</AppText>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  talkTopicButton: {
    borderWidth: 1,
    borderColor: 'rgba(21,21,0,0.2)',
    borderRadius: 10,
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 10,
    paddingRight: 10, 
    marginTop: 10
  },
})

export default SpeakerTrackButton