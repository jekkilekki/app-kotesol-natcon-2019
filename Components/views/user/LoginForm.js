import React, { Component } from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import { Input, Button } from 'react-native-elements'
import { withNavigation } from 'react-navigation'
import axios from 'axios'
import firebase from 'firebase'

import AppText from '../../shared/text/AppText'
import AppInput from '../../shared/AppInput'
import MyButton from '../../shared/buttons/MyButton'
import Loader from '../../shared/Loader'

const ROOT_URL = 'https://us-central1-knc-app-2019.cloudfunctions.net'

class LoginForm extends Component {
  state = {
    email: '',
    password: '',
    error: '',
    loading: false
  }

  renderButton() {
    if (this.state.loading) {
      return <Loader />
    }

    return (
      <MyButton 
        title='Login' 
        // onPress={this._handleSubmit}
        onPress={this._onLogin}
      />
    )
  }

  _handleSubmit = async () => {
    // With Redux? Shove all this inside an action creator
    const { phone, code } = this.state
    try {
      let { data } = await axios.post(`${ROOT_URL}/verifyOTP`, {phone, code})
      firebase.auth().signInWithCustomToken(data.token)
    } catch (err) {
      this.setState({ error: 'Something went wrong. Please try again.' })
      console.log(err)
    }
  }

  _onLogin = async () => {
    const { email, password } = this.state

    this.setState({ error: '', loading: true })

    try {
      const user = await firebase.auth().signInWithEmailAndPassword(email, password)
      if ( user ) {
        this._onLoginSuccess()
      } else {
        try {
          const newUser = await firebase.auth().createUserWithEmailAndPassword(email, password)
          if ( newUser ) {
            this._onLoginSuccess()
          } 
        } catch(e) {
          this._onLoginFail(e)
        }
      } 
    } catch(e) {
      this._onLoginFail(e)
    }
  }

  _onLoginSuccess = () => {
    this.setState({
      email: '',
      password: '',
      error: '',
      loading: false
    })
    this.props.navigation.navigate('Profile')
  }

  _onLoginFail = (e) => {
    this.setState({
      error: 'Authentication Failed. Please try again.',
      loading: false
    })
    alert(JSON.stringify(e))
  }

  render() {
    return (
      <View>
        <AppText style={styles.error}>{this.state.error}</AppText>
        <AppInput 
          label='Email'
          placeholder='user@email.com'
          value={this.state.email}
          onChangeText={email => this.setState({ email })}
        />
        <AppInput 
          label='Password'
          placeholder='password'
          value={this.state.password}
          onChangeText={password => this.setState({ password })}
          secureTextEntry
        />
        {this.renderButton()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  error: {
    color: 'red',
    fontSize: 20
  }
})

export default withNavigation(LoginForm)