import React, { Component } from 'react'
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native'

import H1 from './shared/text/H1'
import H2 from './shared/text/H2'
import H3 from './shared/text/H3'
import P from './shared/text/P'
import AppText from './shared/text/AppText'

class SpeakerDetails extends Component {
  render() {
    const { id, title, name, nickname, shortname, 
            affiliation, other, time, room, summary, 
            abstract, bio, img, media, email, phone 
          } = this.props.speaker

    return (
      <TouchableOpacity>
        <View style={styles.cardStyle}>
          <View>
            <Image 
              source={{ uri: img }} 
              style={styles.thumbnailStyle} 
            />
          </View>
          <View style={styles.talkMeta}>
            <H2 small dark style={styles.talkTitle}>{title}</H2>
            <AppText color={'#232377'} style={styles.talkSpeaker}>{name}</AppText>
          </View>

        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  cardStyle: {
    flexDirection: 'row',
    borderRadius: 5,
    backgroundColor: 'rgba(255,255,255,0.9)',
    // borderColor: 'rgba(0,221,221,0.3)',
    // borderWidth: 1,
    padding: 10,
    marginBottom: 10
  },
  thumbnailStyle: {
    width: 60,
    height: 60,
    borderRadius: 5,
    marginRight: 10
  },
  talkMeta: {
    flex: 1,
    justifyContent: 'space-around'
  },
  talkTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#151537'
  },
  talkSpeaker: {

  }
})

export default SpeakerDetails