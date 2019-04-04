import React, { Component } from 'react'
import { ScrollView, Text } from 'react-native'
import { connect } from 'react-redux'

import SpeakerCard from './SpeakerCard'
import Loader from '../Components/shared/Loader'

class SpeakerList extends Component {
  render() {
    const { speakers } = this.props

    if ( speakers === undefined || speakers.length < 1 ) {
      return <Loader />
    }

    return (
      <ScrollView style={{flex: 1}}>
        {speakers.map((speaker, i) => (
          <SpeakerCard key={i} speaker={speaker} />
        ))}
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return { speakers: state.speakers }
}

export default connect(mapStateToProps)(SpeakerList)