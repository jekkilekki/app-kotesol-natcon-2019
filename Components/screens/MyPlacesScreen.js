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
import PlacesList from '../PlacesList';

class MyPlacesScreen extends Component {
  render() {
    return (
      <AppScreen>
        <AppHeader 
          pageName='My Places' 
          pageSub='Review Jeonju locations you favorited'
          pageBackButton
        />
        <ScreenContent style={styles.screenStyle}>
          {this.props.likedPlaces.length < 1
            ? <NoContent name={'places'} />  
            : <PlacesList />
          }
          <ScreenBottomPadding size={100} />
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
  return { likedPlaces: profile.myPlaces }
}

export default connect(mapStateToProps)(MyPlacesScreen)