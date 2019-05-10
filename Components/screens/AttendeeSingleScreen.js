import React, { Component } from 'react'
import { View, Dimensions } from 'react-native'

import AppText from '../shared/text/AppText'
import ScreenContent from '../shared/layout/ScreenContent'
import AppScreen from '../shared/layout/AppScreen'
import HeaderBack from '../shared/layout/HeaderBack'
import ScreenSection from '../shared/layout/ScreenSection';

const { width, height } = Dimensions.get('window')

class AttendeeSingleScreen extends Component {
  render() {
    const { attendee } = this.props.navigation.state.params

    return (
      <AppScreen color1={'#fff'} color2={'rgba(233,150,255,0.5)'}>
        <ScreenContent style={{height: height}}>
          <HeaderBack
            // pageName={speaker.title}
            // pageSub={speaker.name}
          />
          <ScreenSection>
            
          </ScreenSection>
        </ScreenContent>
      </AppScreen>
    )
  }
}

export default AttendeeSingleScreen