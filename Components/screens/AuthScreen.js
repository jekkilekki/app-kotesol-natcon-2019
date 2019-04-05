import React, { Component } from 'react'
import { View, SafeAreaView, Text, StyleSheet, Button, AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
import * as actions from '../../actions'

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
    // AsyncStorage.removeItem('fb_token')
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

  render() {
    return (
      <AppScreen image={require('../../assets/img/kotesol-natcon-2019-app-splash-cloud-higher.jpg')}>
        <AppHeader 
          pageName='Login'
          pageSub='Unlock the hidden features'
          cancelButton
        />
        <ScreenContent>
          <LoginRedux />
          <AppText center bold padding>&mdash; OR &mdash;</AppText>
          <MyButton onPress={() => this.props.fbLogin()}/>
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

function mapStateToProps({ auth }) {
  return { token: auth.token }
}

export default connect(mapStateToProps, actions)(AuthScreen)