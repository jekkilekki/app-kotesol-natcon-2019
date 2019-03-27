import React, { Component } from 'react'
import { View, Text } from 'react-native'
import axios from 'axios'

import Loader from '../../shared/Loader'
import SpeakerDetails from './SpeakerDetails'

class SpeakerList extends Component {
  state = {
    speakers: []
  }

  async componentWillMount() {
    let response = await axios.get('https://rallycoding.herokuapp.com/api/music_albums')
    this.setState({ speakers: response.data })
  }

  render() {
    if ( this.state.speakers === undefined || this.state.speakers.length < 1 ) {
      return <Loader />
    }
    return (
      <View>
        {this.state.speakers.map((speaker, i) => (
          <SpeakerDetails 
            key={i}
            speaker={speaker}
          />
        ))}
      </View>
    )
  }
}

export default SpeakerList