import React, { Component } from 'react'
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { withNavigation } from 'react-navigation'
import { LinearGradient } from 'expo'

import H1 from './shared/text/H1'
import H2 from './shared/text/H2'
import H3 from './shared/text/H3'
import P from './shared/text/P'
import AppText from './shared/text/AppText'
import { blueGray200, blueGray100, white, black, purpler } from '../utils/colors'

class SpeakerDetails extends Component {
  _goToSession = () => {
    const { speaker, navigation } = this.props 
    navigation.navigate( 'Session', { id: speaker.item.id, speaker: speaker.item })
  }

  render() {
    const { id, title, name, nickname, shortname, 
            affiliation, other, time, room, summary, 
            abstract, bio, img, media, email, phone, topic
          } = this.props.speaker.item

    return (
      <LinearGradient 
        style={styles.cardBackground} 
        colors={[white, 'rgba(233,150,255,0.1)']}
        // start={{x: 0, y: 0.75}}
        // end={{x: 0, y: 1}}
      >
        {/* <AppText style={styles.talkLocation}>{time} - {room}</AppText> */}
        <TouchableOpacity 
          onPress={this._goToSession}
          style={styles.cardStyle}
        >
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
        </TouchableOpacity>
      </LinearGradient>
    )
  }
}

const styles = StyleSheet.create({
  cardBackground: {
    flex: 1,
  },
  cardStyle: {
    flexDirection: 'row',
    borderRadius: 5,
    backgroundColor: 'rgba(255,255,255,0.9)',
    // borderColor: 'rgba(0,221,221,0.3)',
    // borderWidth: 1,
    padding: 10,
    margin: 10,
    shadowColor: black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
  },
  thumbnailStyle: {
    width: 60,
    height: 60,
    borderRadius: 5,
    marginRight: 10
  },
  talkMeta: {
    flex: 1,
    // justifyContent: 'space-around',
  },
  talkLocation: {
    // backgroundColor: blueGray100,
    paddingTop: 20,
    paddingBottom: 2,
    paddingLeft: 5,
    paddingRight: 5,
    // width: 100,
    fontSize: 10,
    borderRadius: 5,
    // shadowColor: black,
    // shadowOffset: { width: 0, height: 1 },
    // shadowOpacity: 0.1,
    // elevation: 1,
    marginBottom: 5, 
    textAlign: 'center',
    color: purpler,
  },
  talkTitle: {
    fontSize: 16,
    // fontWeight: 'bold',
    // color: '#151537',
    paddingBottom: 5
  },
  talkSpeaker: {
    fontSize: 14
  }
})

export default withNavigation(SpeakerDetails)