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
import H3 from '../shared/text/H3'
import P from '../shared/text/P'
import SpeakerLikeButton from '../SpeakerLikeButton'

import { purpler } from '../../utils/colors'

const { width, height } = Dimensions.get('window')

class SessionSingleScreen extends Component {
  render() {
    const { speaker } = this.props.navigation.state.params

    return (
      <AppScreen background>
        <ScreenContent style={{height: height}}>
          <HeaderBack
            // pageName={speaker.title}
            // pageSub={speaker.name}
          />
        

          <View style={[styles.speakerImgContainer, 
            { height: speaker.img !== '' ? width - 130 : 130 }
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
              <SpeakerLikeButton large color1={'lightcoral'} style={{right: 15, bottom: 20, zIndex: 20}} />
              <View style={styles.speakerMeta}>
                <AppScreenTitle small>{speaker.title}</AppScreenTitle>
                <AppScreenSubtitle>{speaker.name}</AppScreenSubtitle>
              </View>
            </LinearGradient>
          </View>

          <H3>Talk Abstract</H3>
          <P>{speaker.abstract}</P>
          <H3>About {speaker.nickname}</H3>
          <P>{speaker.bio}</P>
          {/* <WebView
            style={styles.content}
            originWhitelist={['*']}
            source={{html: speaker.abstract}}
            useWebKit
          /> */}
          {/* <ContentButton
            title="Check Screen Props"
            onPress={() => alert(JSON.stringify(speaker))}
          /> */}
          <ContentButton
            title="Go back"
            onPress={() => this.props.navigation.goBack()}
          />

          <ScreenBottomPadding size={40} />
        </ScreenContent>
      </AppScreen>
    )
  }
}

const styles = StyleSheet.create({
  speakerImgContainer: {
    flex: 1,
  },
  speakerImgOverlay: {
    position: 'absolute',
    bottom: -15,
    marginLeft: -15,
    // marginBottom: -15,
    padding: 15,
    width: width
  },
  speakerImg: {
    width: width - 150,
    height: width - 150,
    borderRadius: 10
  },
  content: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'stretch',
    backgroundColor: '#f00'
  }
})

export default SessionSingleScreen