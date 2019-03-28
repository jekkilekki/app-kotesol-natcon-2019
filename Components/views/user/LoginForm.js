import React, { Component } from 'react'
import { View, Text, TextInput } from 'react-native'
import { Input, Button } from 'react-native-elements'
import axios from 'axios'
import firebase from 'firebase'

const ROOT_URL = 'https://us-central1-knc-app-2019.cloudfunctions.net'

class LoginForm extends Component {
  state = {
    email: '',
    password: '',
    error: ''
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

  render() {
    return (
      <View>
        <Text>Email</Text>
        <TextInput 
          placeholder='Email'
          value={this.state.email}
          onChangeText={email => this.setState({ email })}
        />
        <Text>Password</Text>
        <TextInput 
          placeholder='Password'
          value={this.state.password}
          onChangeText={password => this.setState({ password })}
        />
        <Button 
          title='Login' 
          onPress={this._handleSubmit}
        />
      </View>
    )
  }
}

export default LoginForm