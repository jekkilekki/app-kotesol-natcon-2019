import React, { Component } from 'react'
import { View, Image, StyleSheet } from 'react-native'
import { Card, CardItem, Body, Text } from 'native-base'

class SpeakerDetails extends Component {
  render() {
    const { title, artist, thumbnail_image } = this.props.speaker

    return (
      <Card style={styles.cardStyle}>
        <CardItem>
          <View>
            <Image 
              source={{ uri: thumbnail_image }} 
              style={styles.thumbnailStyle} 
            />
          </View>
          <View style={styles.talkMeta}>
            <Text style={styles.talkTitle}>{title}</Text>
            <Text style={styles.talkSpeaker}>{artist}</Text>
          </View>
        </CardItem>
      </Card>
    )
  }
}

const styles = StyleSheet.create({
  cardStyle: {
    
  },
  thumbnailStyle: {
    width: 60,
    height: 60,
    borderRadius: 5,
    marginRight: 10
  },
  talkMeta: {
    flex: 1,
    justifyContent: 'space-around'
  },
  talkTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#151537'
  },
  talkSpeaker: {

  }
})

export default SpeakerDetails