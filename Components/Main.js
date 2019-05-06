import React, { Component } from 'react'
import { AppLoading, Asset, Font, Icon } from 'expo'
import firebase from 'firebase'
import { AppNavigation } from './navigation/AppNav';
import { connect } from 'react-redux'
import { appReady, loadUser, loginUser } from '../actions'

class Main extends Component {
  componentWillReceiveProps(nextProps) {
    const { user } = this.props
    // firebase.auth().onAuthStateChanged((user) => {
      if (this.props.user !== nextProps.user && nextProps.user !== null) {
        alert('Main Logged in!')
        console.log('Main Logged in!~', user)
        this.props.loginUser(user)
        // this.setState({ loggedIn: true })
      } else {
        alert('Main Logged out!')
        this.props.loginUser(null)
        // this.setState({ loggedIn: false })
      }
    // })
  }

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
    this.props.appReady()
    this.props.loadUser()
  }

  render() {
    if ( !this.props.assetsLoaded ) {
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
  return { assetsLoaded: app.assetsLoaded }
}

export default connect(mapStateToProps, { appReady, loadUser, loginUser })(Main)