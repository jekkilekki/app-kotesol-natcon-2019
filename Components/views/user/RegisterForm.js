import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Input, Button } from 'react-native-elements'
import axios from 'axios'

const ROOT_URL = 'https://us-central1-knc-app-2019.cloudfunctions.net'

class RegisterForm extends Component {
  state = {
    phone: '',
    error: ''
  }

  _handleSubmit = async () => {
    // With Redux? Shove all this inside an action creator
    try {
      await axios.post(`${ROOT_URL}/createUser`, {phone: this.state.phone})
      await axios.post(`${ROOT_URL}/requestOTP`, {phone: this.state.phone})
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
        <Button 
          title='Submit' 
          onPress={this._handleSubmit}
        />
      </View>
    )
  }
}

export default RegisterForm