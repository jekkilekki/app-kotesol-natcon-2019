import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet, WebView } from 'react-native'

import AppScreen from '../shared/layout/AppScreen'
import HeaderBack from '../shared/layout/HeaderBack'
import ScreenContent from '../shared/layout/ScreenContent'
import ContentButton from '../shared/buttons/ContentButton'
import H3 from '../shared/text/H3'
import P from '../shared/text/P'

class SessionSingleScreen extends Component {
  render() {
    const { speaker } = this.props.navigation.state.params

    return (
      <AppScreen background>
        <HeaderBack
          pageName={speaker.title}
          pageSub={speaker.name}
        />
        <ScreenContent>
          {speaker.img !== '' &&
            <Image 
              style={styles.speakerImg}
              source={{ uri: speaker.img }} 
            />
          }
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
          <ContentButton
            title="Check Screen Props"
            onPress={() => alert(JSON.stringify(speaker))}
          />
          <ContentButton
            title="Go back"
            onPress={() => this.props.navigation.goBack()}
          />
        </ScreenContent>
      </AppScreen>
    )
  }
}

const styles = StyleSheet.create({
  speakerImg: {
    width: 100,
    height: 100,
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