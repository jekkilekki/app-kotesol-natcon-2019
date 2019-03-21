import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Input, Button } from 'react-native-elements'
import axios from 'axios'
import firebase from 'firebase'

const ROOT_URL = 'https://us-central1-knc-app-2019.cloudfunctions.net'

class LoginForm extends Component {
  state = {
    phone: '',
    code: '',
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
        <Input 
          label='Enter phone number'
          placeholder='000-000-0000'
          value={this.state.phone}
          onChangeText={phone => this.setState({ phone })}
        />
        <Input 
          label='Enter code'
          placeholder='XXXX'
          value={this.state.code}
          onChangeText={code => this.setState({ code })}
        />
        <Button 
          title='Submit' 
          onPress={this._handleSubmit}
        />
      </View>
    )
  }
}

export default LoginForm