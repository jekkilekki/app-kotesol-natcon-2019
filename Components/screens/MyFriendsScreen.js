import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'

import AppText from '../shared/text/AppText'
import AppScreen from '../shared/layout/AppScreen'
import AppHeader from '../shared/layout/AppHeader'
import ScreenContent from '../shared/layout/ScreenContent'
import ScreenBottomPadding from '../shared/layout/ScreenBottomPadding'
import NoContent from '../NoContent'
import { purpler } from '../../utils/colors';

class MyFriendsScreen extends Component {
  render() {
    return (
      <AppScreen color1={'#fff'} color2={'rgba(233,150,255,0.5)'}>
        <AppHeader 
          pageName='My Friends' 
          pageSub='Review conference attendees you favorited'
          pageBackButton
        />
        <ScreenContent style={styles.screenStyle}>
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

const styles = StyleSheet.create({
  screenStyle: {
    padding: 0,
  },
  userImg: {
    backgroundColor: 'white',
    height: 100,
    width: 100,
    borderRadius: 50
  },
  profileTop: {
    backgroundColor: purpler,
    alignItems: 'center',
    margin: -15,
    marginBottom: 15,
    paddingTop: 15,
  },
  infoBox: {
    marginTop: 10,
    marginBottom: 15
  },
  profileInput: {
    borderWidth: 0,
    backgroundColor: 'transparent',
    color: '#151537'
  }
})

export default MyFriendsScreen