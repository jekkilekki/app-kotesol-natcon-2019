import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, Image } from 'react-native'

class Profile extends Component {
  state = {

  }

  render() {
    return (
      <Text>User Profile</Text>
    )
  }
}

export default connect()(Profile)