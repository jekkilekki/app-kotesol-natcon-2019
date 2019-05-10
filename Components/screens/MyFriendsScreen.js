import React, { Component } from 'react'
import { View } from 'react-native'

import AppText from '../shared/text/AppText'
import AppScreen from '../shared/layout/AppScreen'
import AppHeader from '../shared/layout/AppHeader'
import ScreenContent from '../shared/layout/ScreenContent'
import ScreenBottomPadding from '../shared/layout/ScreenBottomPadding'
import NoContent from '../NoContent'

class MyFriendsScreen extends Component {
  render() {
    return (
      <AppScreen color1={'#fff'} color2={'rgba(233,150,255,0.5)'}>
        <AppHeader 
          pageName='My Friends' 
          pageSub='Review conference attendees you favorited'
          pageBackButton
        />
        <ScreenContent style={screenStyle}>
          {true
            ? <NoContent name={'friends'} />  
            : <AppText>My Friends</AppText>
          }
          <ScreenBottomPadding size={100} />
        </ScreenContent>
      </AppScreen>
    )
  }
}

const screenStyle = {
  paddingTop: 0,
  paddingBottom: 0,
  paddingLeft: 0,
  paddingRight: 0,
}

export default MyFriendsScreen