import React, { Component } from 'react'
import { View } from 'react-native'
import { Card, CardItem, Body, Text } from 'native-base'

class SpeakerDetails extends Component {
  render() {
    return (
      <Card>
        <CardItem>
          <Body>
            <Text>{this.props.speaker.title}</Text>
          </Body>
        </CardItem>
        <CardItem>
          <Body>
            <Text></Text>
          </Body>
        </CardItem>
        <CardItem>
          <Body>
            <Text></Text>
          </Body>
        </CardItem>
      </Card>
    )
  }
}

export default SpeakerDetails