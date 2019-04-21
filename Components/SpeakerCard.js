import React, { Component } from 'react'
import { View, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import { withNavigation } from 'react-navigation'
import { LinearGradient } from 'expo'

import H2 from './shared/text/H2'
import AppText from './shared/text/AppText'
import { white, black, purpler } from '../utils/colors'
import SpeakerLike from './SpeakerLike';
import SpeakerTrackButton from './SpeakerTrackButton';

const { width } = Dimensions.get('window')

class SpeakerDetails extends Component {
  _goToSession = () => {
    const { speaker, navigation } = this.props 
    navigation.navigate( 'Session', { id: speaker.item.id, speaker: speaker.item })
  }

  _filter(query) {
    this.props.filter(query)
  }

  renderTrack(track) {
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
        trackBGColor = 'goldenrod'
        break
      case 'Skills':
        trackBGColor = 'olivegreen'
        break
      case 'Technology':
        trackBGColor = 'aquamarine'
        break
      case 'Mixed':
        trackBGColor = 'blue'
        break
      case 'Research':
        trackBGColor = 'purple'
        break
      case 'Poster':
        trackBGColor = 'green'
        break
      default: 
        trackBGColor = '#fff'
        trackColor = '#232377' 
    }

    return (
      <TouchableOpacity onPress={() => this._filter(track)}
        style={[styles.talkTopicButton, {color: trackColor, backgroundColor: trackBGColor}]}
      >
        <AppText center style={{fontSize: 10}}>{track}</AppText>
      </TouchableOpacity>
    )
  }

  render() {
    const { id, title, name, nickname, shortname, 
            affiliation, other, time, room, summary, 
            abstract, bio, img, media, email, phone, track
          } = this.props.speaker.item

    return (
      <LinearGradient 
        style={styles.cardBackground} 
        colors={id === 'plenary' 
                  ? [white, 'rgba(233,150,255,0.5)']
                  : [white, 'rgba(233,150,255,0.1)']
                }
        // start={{x: 0.0, y: 0}} 
        // end={{x: 1, y: 1}}
        // locations={[0,1]}
      >
        <View style={{alignContent: 'center'}}>
          {this.renderTrack(track)}
          {/* <SpeakerTrackButton track={track} /> */}
        </View>
        <TouchableOpacity 
          onPress={this._goToSession}
          style={styles.cardStyle}
        >
          {img !== '' &&
            <View>
              <Image 
                source={{ uri: img }} 
                style={styles.thumbnailStyle} 
              />
            </View>
          }
          <View style={styles.talkMeta}>
            <AppText style={styles.talkLocation}>{time} - {room}</AppText>
            <H2 small dark style={styles.talkTitle}>{title}</H2>
            <AppText style={styles.talkSpeaker}>{name}</AppText>
            <AppText style={styles.talkAffiliation}>{affiliation}</AppText>
            <SpeakerLike />
          </View>
        </TouchableOpacity>
      </LinearGradient>
    )
  }
}

const styles = StyleSheet.create({
  cardBackground: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  cardStyle: {
    flexDirection: 'row',
    borderRadius: 5,
    backgroundColor: 'rgba(255,255,255,1)',
    padding: 10,
    margin: 10,
    width: width - 20,
    shadowColor: black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 1,
  },
  thumbnailStyle: {
    width: 60,
    height: 60,
    borderRadius: 5,
    marginRight: 10
  },
  talkMeta: {
    flex: 1,
  },
  talkLocation: {
    color: '#232377',
    fontSize: 10,
    marginBottom: 5, 
  },
  talkAffiliation: {
    color: '#232377',
    fontSize: 10,
  },
  talkTopicButton: {
    borderWidth: 1,
    borderColor: purpler,
    borderRadius: 10,
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 10,
    paddingRight: 10, 
    marginTop: 10
  },
  talkTopic: {
    color: purpler,
    fontSize: 10,
  },
  talkTitle: {
    fontSize: 16,
    paddingBottom: 5
  },
  talkSpeaker: {
    fontSize: 14,
    color: '#232377'
  }
})

export default withNavigation(SpeakerDetails)