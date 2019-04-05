import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'

import AppScreen from '../shared/layout/AppScreen'
import HeaderBack from '../shared/layout/HeaderBack'
import ScreenContent from '../shared/layout/ScreenContent'
import ContentButton from '../shared/buttons/ContentButton'
import P from '../shared/text/P'

class SessionSingleScreen extends Component {
  render() {
    const { speaker } = this.props.navigation.state.params

    return (
      <AppScreen>
        <HeaderBack
          pageName={speaker.title}
          pageSub={speaker.name}
        />
        <ScreenContent>
          <Image 
            style={styles.speakerImg}
            source={{ uri: speaker.img }} 
          />
          <P>{speaker.abstract}</P>
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
  }
})

export default SessionSingleScreen