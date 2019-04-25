import React, { Component } from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
import AppText from './shared/text/AppText'

import { purpler } from '../utils/colors'
import { getTrackColor } from '../utils/helpers';

class SpeakerTrackButton extends Component {
  render() {
    const { track } = this.props

    let trackColor = '#fff'
    let trackBGColor = '#232377'

    trackBGColor = getTrackColor(track)

    return (
      <TouchableOpacity onPress={this.props.onPress}
        style={[styles.talkTopicButton, {color: trackColor, backgroundColor: trackBGColor}, this.props.style]}
      >
        <AppText center style={{fontSize: 10}}>{track}</AppText>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  talkTopicButton: {
    // borderWidth: 1,
    // borderColor: 'rgba(21,21,0,0.2)',
    borderRadius: 10,
    // paddingTop: 1,
    // paddingBottom: 1,
    paddingLeft: 8,
    paddingRight: 8, 
    marginTop: 10,
    height: 18
  },
})

export default SpeakerTrackButton