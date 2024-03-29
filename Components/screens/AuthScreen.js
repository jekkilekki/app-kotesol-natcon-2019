import React, { Component } from 'react'
import { StyleSheet, Dimensions, AsyncStorage, View } from 'react-native'
import { connect } from 'react-redux'
import { inputEmail, inputPassword, firebaseLoginUser, fbLogin } from '../../actions'

import Loader from '../shared/Loader'
import AppHeader from '../shared/layout/AppHeader'
import LoginForm from '../views/user/LoginForm'
import LoginRedux from '../views/user/LoginRedux'
import AppScreen from '../shared/layout/AppScreen'
import MyButton from '../shared/buttons/MyButton'
import ScreenContent from '../shared/layout/ScreenContent'
import AppText from '../shared/text/AppText'
import { app } from 'firebase';

const { height } = Dimensions.get('window')

class AuthScreen extends Component {
  // componentDidMount() {
  //   // this.props.fbLogin()
  //   // Delete the token that lets us know we're logged in (remove after testing)
  //   AsyncStorage.removeItem('fb_token')
  //   this.onAuthComplete(this.props)

  //   if ( this.props.user || this.props.token ) {
  //     this.props.navigation.navigate( 'Profile' )
  //   }
  // }

  // componentWillReceiveProps(nextProps) {
  //   // this.onAuthComplete(nextProps)
  //   if (this.props !== nextProps && nextProps.profileLoaded) {
  //     this.props.navigation.navigate('Home')
  //   }
  // }

  // onAuthComplete(props) {
  //   if (props.loggedIn) {
  //     this.props.navigation.navigate('Schedule')
  //   }
  // }

  _onEmailInput = (text) => {
    this.props.inputEmail(text)
  }

  _onPasswordInput = (text) => {
    this.props.inputPassword(text)
  }

  _onLogin = () => {
    const { email, password } = this.props
    this.props.firebaseLoginUser({ email, password })
  }

  _onLoginSuccess = () => {
    this.props.navigation.navigate('Profile')
  }

  render() {
    const { email, password, error, loading, user, token, loggedIn, navigation } = this.props

    if ( loggedIn ) {
      navigation.navigate('Profile')
    }

    const { height } = Dimensions

    return (
      <AppScreen image={require('../../assets/img/kotesol-natcon-2019-app-splash-cloud-higher.jpg')}>
        <AppHeader 
          style={{backgroundColor: 'transparent'}}
          pageName='Login'
          pageSub='Unlock the hidden features'
          cancelButton
          transparent
        />
        <ScreenContent>
          <View>
          <LoginRedux 
            email={email}
            password={password}
            error={error}
            loading={loading}
            user={user}
            token={token} 
            _onEmailInput={this._onEmailInput}
            _onPasswordInput={this._onPasswordInput}
            _onLogin={this._onLogin}
            _onLoginSuccess={this._onLoginSuccess}
          />
          <AppText center bold padding>&mdash; OR &mdash;</AppText>
          <MyButton onPress={() => this.props.fbLogin(navigation)}/>
          </View>
        </ScreenContent>
      </AppScreen>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})

const mapStateToProps = ({ auth, profile }) => {
  const { email, password, error, loading, user } = auth
  const { token } = profile
  return { token, email, password, error, loading, user, loggedIn: app.loggedIn, profileLoaded: app.profileLoaded }
}

export default connect(mapStateToProps, {
  inputEmail, inputPassword, firebaseLoginUser, fbLogin
})(AuthScreen)