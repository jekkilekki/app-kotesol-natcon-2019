import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'

import AppText from '../shared/text/AppText'
import AppScreen from '../shared/layout/AppScreen'
import AppHeader from '../shared/layout/AppHeader'
import ScreenContent from '../shared/layout/ScreenContent'
import ScreenBottomPadding from '../shared/layout/ScreenBottomPadding'
import NoContent from '../NoContent'
import { purpler } from '../../utils/colors';
import AttendeesList from '../AttendeesList'

class MyFriendsScreen extends Component {
  render() {
    return (
      <AppScreen>
        <AppHeader 
          pageName='My Friends' 
          pageSub='Review conference attendees you favorited'
          pageBackButton
        />
        <ScreenContent style={styles.screenStyle}>
          {this.props.friends.length < 1
            ? <NoContent name={'friends'} />  
            : <AttendeesList pageId={'friends'} />
          }
          {/* <ScreenBottomPadding size={100} /> */}
        </ScreenContent>
      </AppScreen>
    )
  }
}

const styles = StyleSheet.create({
  screenStyle: {
    paddingTop: 0,
    paddingRight: 0,
    paddingLeft: 0,
    paddingBottom: 0
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

const mapStateToProps = ({ profile }) => {
  return { friends: profile.myFriends }
}

export default connect(mapStateToProps)(MyFriendsScreen)