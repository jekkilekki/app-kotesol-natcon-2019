import React, { Component } from 'react'
import { AppLoading, Asset, Font, Icon } from 'expo'
import { AppNavigation } from './navigation/AppNav';
import { connect } from 'react-redux'
import { appReady, checkAuthStatus, getProfile, getAttendees } from '../actions'

import Loader from './shared/Loader'

class Main extends Component {
  // componentWillReceiveProps(nextProps) {
  //   const { loggedIn } = this.props

  //   if (this.props.loggedIn !== nextProps.loggedIn && nextProps.loggedIn && !this.props.profileLoaded) {
  //     this.props.getProfile()
  //   } 
  // }

  _loadAssetsAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('../assets/img/star-center-logo.jpg'),
        require('../assets/img/star-center-floors.png'),
        require('../assets/img/star-center-map.png')
      ]),
      Font.loadAsync({
        ...Icon.Entypo.font,
        ...Icon.Foundation.font,
        ...Icon.FontAwesome.font,
        ...Icon.MaterialIcons.font,
        ...Icon.MaterialCommunityIcons.font,
        'nunito': require('../assets/fonts/Nunito/Nunito-Regular.ttf'),
        'nunito-bold': require('../assets/fonts/Nunito/Nunito-Bold.ttf'),
        'nunito-black': require('../assets/fonts/Nunito/Nunito-Black.ttf'),
        'futura': require('../assets/fonts/Futura/Futura-Condensed-Medium.otf'),
        'futura-bold': require('../assets/fonts/Futura/Futura-Condensed-Bold.otf')
      })
    ])
  }

  _appLoaded = async () => {
    // dispatch appReady action
    this.props.appReady()
    // dispatch loginUser action
    // this.props.checkAuthStatus()
    // get list of attendees
    // this.props.getAttendees() // not quite yet
  }

  render() {
    if ( this.props.loggedIn === null ) {
      return (
        <AppLoading
          startAsync={this._loadAssetsAsync}
          onFinish={() => this._appLoaded()}
          onError={console.warn}
        >
          <Loader />
        </AppLoading>
      )
    }

    return <AppNavigation loggedIn={this.props.loggedIn} />
  }
}

const mapStateToProps = ({ app }) => {
  return { assetsLoaded: app.assetsLoaded, loggedIn: app.loggedIn, profileLoaded: app.profileLoaded }
}

export default connect(mapStateToProps, { appReady, checkAuthStatus, getProfile, getAttendees })(Main)