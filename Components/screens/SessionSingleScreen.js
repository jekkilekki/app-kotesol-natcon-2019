import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet, WebView, Dimensions } from 'react-native'
import { LinearGradient } from 'expo'

import AppScreen from '../shared/layout/AppScreen'
import HeaderBack from '../shared/layout/HeaderBack'
import ScreenContent from '../shared/layout/ScreenContent'
import ScreenBottomPadding from '../shared/layout/ScreenBottomPadding'
import ContentButton from '../shared/buttons/ContentButton'
import AppScreenTitle from '../shared/text/AppScreenTitle'
import AppScreenSubtitle from '../shared/text/AppScreenSubtitle'
import AppText from '../shared/text/AppText'
import H3 from '../shared/text/H3'
import P from '../shared/text/P'
import SpeakerLikeButton from '../SpeakerLikeButton'

import { purpler } from '../../utils/colors'
import SpeakerTrackButton from '../SpeakerTrackButton';
import { getTrackColor, getTime } from '../../utils/helpers';
import ScreenSection from '../shared/layout/ScreenSection';

const { width, height } = Dimensions.get('window')

class SessionSingleScreen extends Component {
  render() {
    const { speaker } = this.props.navigation.state.params

    return (
      <AppScreen color1={'#fff'} color2={'rgba(233,150,255,0.5)'}>
        <HeaderBack
          // pageName={speaker.title}
          // pageSub={speaker.name}
        />
        {/* <View style={styles.backgroundCover}></View> */}
        <ScreenContent 
          noPadding
          style={{height: height, marginTop: -30, backgroundColor: 'white'}}>
          <View style={[styles.speakerImgContainer, 
            // { height: speaker.img !== '' ? width - 130 : 130 }
          ]}>
            {speaker.img !== '' &&
              <Image 
                style={styles.speakerImg}
                source={{ uri: speaker.img }} 
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
              <SpeakerLikeButton large id={speaker.id} color1={'lightcoral'} style={{right: 15, bottom: 20, zIndex: 20}} />
              <View style={styles.speakerMeta}>
                <View style={{flexDirection: 'row'}}>
                  <SpeakerTrackButton track={speaker.track} style={{marginTop: -2, marginBottom: 5, padding: 2}} />
                </View>
                <AppScreenTitle small>{speaker.title}</AppScreenTitle>
                <View style={{flexDirection: 'row'}}>
                  <AppText style={styles.talkSpeaker}>{speaker.name}
                    {speaker.affiliation !== '' &&
                      <AppText style={styles.talkAffiliation}> ({speaker.affiliation})</AppText>
                    }
                  </AppText>
                </View>
                {speaker.coPresenter !== '' &&
                  <View style={{flexDirection: 'row', marginTop: -5}}>
                  <AppText style={styles.talkSpeaker}>+ {speaker.coPresenter}
                    <AppText style={styles.talkAffiliation}> ({speaker.coPresenterAff})</AppText>
                  </AppText>
                </View>
                }
              </View>
            </LinearGradient>
          </View>

          <View style={styles.speakerMetaContent}>
            <AppText style={styles.talkTime}>{getTime(speaker.time)}
              <AppText style={styles.talkLocation}> - {speaker.room}</AppText>
            </AppText>
            <AppText style={styles.talkTopic}>{speaker.topic}
              {/* {speaker.subtopic !== '' && <AppText> • {speaker.subtopic}</AppText>} */}
            </AppText>
          </View>
          <View style={styles.speakerContent}>
            <H3 dark>Talk Abstract</H3>
            <P dark>{speaker.abstract}</P>
            <H3 dark>About {speaker.nickname}</H3>
            <P dark>{speaker.bio}</P>
            {speaker.coPresenter !== '' &&
              <View>
                <H3 dark>Co-Presenter: {speaker.coPresenter}</H3>
                {speaker.coPresenterBio !== '' &&
                  <P dark>{speaker.coPresenterBio}</P>
                }
              </View>
            } 
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
    // flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: purpler,
    marginLeft: -15,
    marginRight: -15,
    // padding: 15,
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
  speakerMetaContent: {
    // flex: 1, 
    opacity: 0.7, 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    borderBottomWidth: StyleSheet.hairlineWidth, 
    borderBottomColor: 'rgba(35,35,119,0.5)', 
    paddingTop: 10, 
    paddingBottom: 5,
    paddingRight: 15,
    paddingLeft: 15
  },
  speakerContent: {
    paddingRight: 15,
    paddingLeft: 15
  },
  talkTime: {
    fontFamily: 'nunito-bold',
    color: '#232377',
    fontSize: 12,
    // borderBottomWidth: 1,
    // borderBottomColor: '#232377'
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

export default SessionSingleScreen