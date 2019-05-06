import React, { Component } from 'react'
import { AppLoading, Asset, Font, Icon } from 'expo'
import { AppNavigation } from './navigation/AppNav';
import { connect } from 'react-redux'
import { appReady, loadUser, loginUser } from '../actions'

class Main extends Component {
  // componentWillReceiveProps(nextProps) {
  //   const { user, loginUser } = this.props

  //   if (user !== nextProps.user && nextProps.user !== null) {
  //     loginUser(user)
  //   } else {
  //     loginUser(null)
  //   }
  // }

  _loadAssetsAsync = async () => {
    return Promise.all([
      Asset.loadAsync([

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

  _appLoaded = () => {
    // dispatch appReady action
    this.props.appReady()
    // dispatch loginUser action
    this.props.loginUser()
  }

  render() {
    if ( this.props.loggedIn === null ) {
      return (
        <AppLoading
          startAsync={this._loadAssetsAsync}
          onFinish={() => this._appLoaded()}
          onError={console.warn}
        />
      )
    }

    return <AppNavigation loggedIn={this.props.loggedIn} />
  }
}

const mapStateToProps = ({ app }) => {
  return { assetsLoaded: app.assetsLoaded, loggedIn: app.loggedIn }
}

export default connect(mapStateToProps, { appReady, loadUser, loginUser })(Main)