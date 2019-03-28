import React, { Component } from 'react'
import { View, Text, StyleSheet, Button, AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
import * as actions from '../../actions'

import Loader from '../shared/Loader'
import Header from '../shared/Header'
import LoginForm from '../views/user/LoginForm'

class AuthScreen extends Component {
  static navigationOptions = {
    title: 'Register or Login'
  }

  componentDidMount() {
    this.props.fbLogin()
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
      <View style={{ flex: 1 }}>
        <Header pageName='Login' />
        <LoginForm />
        <Button
          title="Go back"
          onPress={() => this.props.navigation.navigate('Welcome')}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

function mapStateToProps({ auth }) {
  return { token: auth.token }
}

export default connect(mapStateToProps, actions)(AuthScreen)