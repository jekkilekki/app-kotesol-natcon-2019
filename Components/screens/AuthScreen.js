import React, { Component } from 'react'
import { View, SafeAreaView, Text, StyleSheet, Button, AsyncStorage } from 'react-native'
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

class AuthScreen extends Component {
  componentDidMount() {
    // this.props.fbLogin()
    // Delete the token that lets us know we're logged in (remove after testing)
    AsyncStorage.removeItem('fb_token')
    this.onAuthComplete(this.props)
  }

  componentWillReceiveProps(nextProps) {
    this.onAuthComplete(nextProps)
  }

  onAuthComplete(props) {
    if (props.token) {
      this.props.navigation.navigate('Schedule')
    }
  }

  _onLoggedIn = () => {
    this.props.navigation.navigate('Speakers')
  }

  _onEmailInput = (text) => {
    this.props.inputEmail(text)
  }

  _onPasswordInput = (text) => {
    this.props.inputPassword(text)
  }

  _onLogin = () => {
    const { email, password, navigation } = this.props
    this.props.firebaseLoginUser({ email, password, navigation })
  }

  render() {
    const { email, password, error, loading, user, token, loggedIn, navigation } = this.props

    if ( loggedIn ) {
      navigation.navigate('Profile')
    }

    return (
      <AppScreen image={require('../../assets/img/kotesol-natcon-2019-app-splash-cloud-higher.jpg')}>
        <AppHeader 
          pageName='Login'
          pageSub='Unlock the hidden features'
          cancelButton
        />
        <ScreenContent>
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
          />
          <AppText center bold padding>&mdash; OR &mdash;</AppText>
          <MyButton onPress={() => this.props.fbLogin(navigation)}/>
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

const mapStateToProps = ({ auth }) => {
  const { email, password, error, loading, user } = auth
  return { email, password, error, loading, user }
}

export default connect(mapStateToProps, {
  inputEmail, inputPassword, firebaseLoginUser, fbLogin
})(AuthScreen)