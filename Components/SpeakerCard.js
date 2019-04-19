import React, { Component } from 'react'
import { View, Image, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import { withNavigation } from 'react-navigation'
import { LinearGradient } from 'expo'

import H1 from './shared/text/H1'
import H2 from './shared/text/H2'
import H3 from './shared/text/H3'
import P from './shared/text/P'
import AppText from './shared/text/AppText'
import { blueGray200, blueGray100, white, black, purpler } from '../utils/colors'

const { width } = Dimensions.get('window')

class SpeakerDetails extends Component {
  _goToSession = () => {
    const { speaker, navigation } = this.props 
    navigation.navigate( 'Session', { id: speaker.item.id, speaker: speaker.item })
  }

  renderTrack(track) {
    switch (track) {
      case 'Plenary':
        return (
          <TouchableOpacity onPress={this.props.filter}>
            <AppText center style={[styles.talkTopic, {color: '#fff', borderRadius: 30, backgroundColor: purpler}]}>{track}</AppText>
          </TouchableOpacity>
        )
      default: 
        return (
          <TouchableOpacity onPress={this.props.filter}>
            <AppText center style={styles.talkTopic}>{track}</AppText>
          </TouchableOpacity>
        )
    }
  }

  renderPlenary() {
    const { id, title, name, nickname, shortname, 
      affiliation, other, time, room, summary, 
      abstract, bio, img, media, email, phone, track
    } = this.props.speaker.item

    return (
      <LinearGradient 
        style={styles.cardBackground} 
        colors={[white, 'rgba(233,150,255,0.5)']}
        // start={{x: 0.0, y: 0}} 
        // end={{x: 1, y: 1}}
        // locations={[0,1]}
      >
        <View style={{alignContent: 'center'}}>
          {this.renderTrack(track)}
        </View>
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

  render() {
    const { id, title, name, nickname, shortname, 
            affiliation, other, time, room, summary, 
            abstract, bio, img, media, email, phone, track
          } = this.props.speaker.item
    
    if ( id === 'plenary' ) {
      return this.renderPlenary()
    }

    return (
      <LinearGradient 
        style={styles.cardBackground} 
        colors={[white, 'rgba(233,150,255,0.1)']}
        // start={{x: 0.0, y: 0}} 
        // end={{x: 1, y: 1}}
        // locations={[0,1]}
      >
        <View style={{alignContent: 'center'}}>
          {this.renderTrack(track)}
        </View>
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  cardStyle: {
    flexDirection: 'row',
    borderRadius: 5,
    backgroundColor: 'rgba(255,255,255,1)',
    // borderColor: 'rgba(0,221,221,0.3)',
    // borderWidth: 1,
    padding: 10,
    margin: 10,
    width: width - 20,
    shadowColor: black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    // shadowRadius: 5,
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