import React, { Component } from 'react'
import { View, Dimensions, StyleSheet, Image } from 'react-native'
import { LinearGradient } from 'expo'

import AppText from '../shared/text/AppText'
import AppScreenTitle from '../shared/text/AppScreenTitle'
import AppScreenSubtitle from '../shared/text/AppScreenSubtitle'
import H3 from '../shared/text/H3'
import P from '../shared/text/P'
import ScreenContent from '../shared/layout/ScreenContent'
import AppScreen from '../shared/layout/AppScreen'
import HeaderBack from '../shared/layout/HeaderBack'
import ScreenSection from '../shared/layout/ScreenSection';
import FriendLikeButton from '../FriendLikeButton'
import ContentButton from '../shared/buttons/ContentButton'
import ScreenBottomPadding from '../shared/layout/ScreenBottomPadding'
import { purpler } from '../../utils/colors';

const { width, height } = Dimensions.get('window')

class AttendeeSingleScreen extends Component {
  render() {
    const { attendee } = this.props.navigation.state.params

    return (
      <AppScreen color1={'#fff'} color2={'rgba(233,150,255,0.5)'}>
        <HeaderBack
          // pageName={speaker.title}
          // pageSub={speaker.name}
        />
        <ScreenContent style={{height: height, marginTop: -30, backgroundColor: 'white'}}>
          <View style={[styles.speakerImgContainer, 
            // { height: speaker.img !== '' ? width - 130 : 130 }
          ]}>
            {attendee.img !== '' 
              ? <Image 
                  style={styles.speakerImg}
                  source={{ uri: attendee.img }} 
                />
              : <Image 
                  style={styles.speakerImg}
                  source={{ uri: 'https://2019.conference.jnjkotesol.com/img/speakers/knc-2019-default-square.png' }} 
                />
            }
            <LinearGradient 
              style={[styles.speakerImgOverlay]}
              colors={[
                'transparent', 
                purpler
              ]}
              // start={{x: 0.0, y: 0.25}} 
              // end={{x: 0.75, y: 1}}
              // locations={[0,1]}
            >
              <FriendLikeButton large id={attendee.uid} color1={'lightcoral'} style={{right: 15, bottom: 20, zIndex: 20}} />
              <View style={styles.speakerMeta}>
                <AppScreenTitle small>{attendee.firstName} {attendee.lastName}</AppScreenTitle>
                <View style={{flexDirection: 'row'}}>
                  <AppText style={styles.talkSpeaker}>{attendee.affiliation}
                    {/* <AppText style={styles.talkAffiliation}> ({speaker.affiliation})</AppText> */}
                  </AppText>
                </View>
              </View>
            </LinearGradient>
          </View>

          {/* <View style={{flex: 1, opacity: 0.7, flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: 'rgba(35,35,119,0.5)', paddingTop: 10, paddingBottom: 5}}>
            <AppText style={styles.talkTime}>{getTime(speaker.time)}
              <AppText style={styles.talkLocation}> - {speaker.room}</AppText>
            </AppText>
            <AppText style={styles.talkTopic}>{speaker.topic}
              {/* {speaker.subtopic !== '' && <AppText> • {speaker.subtopic}</AppText>}
            </AppText>
          </View> */}
          <View>
            <H3 dark>About {attendee.firstName}</H3>
            <P dark>{attendee.shortBio}</P>
            <ContentButton
              opaque
              style={{marginTop: 25}}
              title="Go back"
              onPress={() => this.props.navigation.goBack()}
            />
          </View>
          <ScreenBottomPadding size={140} />
        </ScreenContent>
      </AppScreen>
    )
  }
}

const styles = StyleSheet.create({
  speakerImgContainer: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: purpler,
    marginLeft: -15,
    marginRight: -15,
    padding: 15,
    paddingTop: 30,
    paddingBottom: 45,
  },
  backgroundCover: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 400,
    backgroundColor: purpler,
  },
  speakerImgOverlay: {
    position: 'absolute',
    bottom: 0,
    marginLeft: -15,
    // marginBottom: -15,
    padding: 15,
    width: width
  },
  speakerImg: {
    width: 200,
    height: 200,
    borderRadius: 100
  },
  content: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'stretch',
    backgroundColor: '#f00'
  },
  talkTime: {
    fontFamily: 'nunito-bold',
    color: '#232377',
    fontSize: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#232377'
  },
  talkLocation: {
    fontFamily: 'nunito',
    color: '#232377',
    fontSize: 12,
  },
  talkAffiliation: {
    color: '#fff',
    fontSize: 10,
    opacity: 0.5
  },
  talkTopic: {
    color: purpler,
    fontSize: 12,
  },
  talkTitle: {
    fontSize: 15,
    color: '#161637',
  },
  talkSpeaker: {
    fontSize: 15,
    marginTop: 5,
    color: 'rgba(255,255,255,0.8)'
  }
})

export default AttendeeSingleScreen