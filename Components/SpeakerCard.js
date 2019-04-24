import React, { Component } from 'react'
import { View, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import { withNavigation } from 'react-navigation'
import { LinearGradient } from 'expo'

import H2 from './shared/text/H2'
import AppText from './shared/text/AppText'
import { white, black, purpler } from '../utils/colors'
import SpeakerLikeButton from './SpeakerLikeButton'
import SpeakerTrackButton from './SpeakerTrackButton'

const { width } = Dimensions.get('window')

class SpeakerCard extends Component {
  _goToSession = () => {
    const { speaker, navigation } = this.props 
    navigation.navigate( 'Session', { id: speaker.item.id, speaker: speaker.item })
  }

  _filter(query) {
    this.props.filter(query)
  }

  render() {
    const { id, title, name, nickname, shortname, 
            affiliation, other, time, room, summary, 
            abstract, bio, img, media, email, phone, track
          } = this.props.speaker.item

    const lunch = 'knc2019-lunch'

    if ( id === lunch ) return null
    
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
        {id !== lunch &&
          <View style={{alignContent: 'center'}}>
            {/* {this.renderTrack(track)} */}
            <SpeakerTrackButton track={track} onPress={() => this._filter(track)} />
          </View>
        }
        <TouchableOpacity 
          onPress={id === lunch ? () => this.props.navigation.navigate('Map') : this._goToSession}
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
            {id !== lunch && 
              <AppText style={styles.talkLocation}>{time} - {room}</AppText>
            }
            <H2 small dark style={styles.talkTitle}>{title}</H2>
            {id !== lunch &&
              <View>
                <AppText style={styles.talkSpeaker}>{name}</AppText>
                <AppText style={styles.talkAffiliation}>{affiliation}</AppText>
                <SpeakerLikeButton />
              </View>
            }
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
    justifyContent: 'center',
    // left: 0,
    // right: 0,
    // bottom: 0,
    // height: 50
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
    borderColor: 'rgba(21,21,0,0.3)',
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

export default withNavigation(SpeakerCard)