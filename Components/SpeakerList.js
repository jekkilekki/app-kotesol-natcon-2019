import React, { Component } from 'react'
import { ScrollView, Text, FlatList } from 'react-native'
import { connect } from 'react-redux'

import SpeakerCard from './SpeakerCard'
import AppSearch from '../Components/shared/layout/AppSearch'
import Loader from '../Components/shared/Loader'

class SpeakerList extends Component {
  state = {
    searchValue: '',
    speakerList: [],
    loading: true
  }

  componentWillMount() {
    this.setState({ speakerList: this.props.speakers, loading: false })
  }

  renderItem(speaker) {
    return <SpeakerCard speaker={speaker} />
  }

  render() {
    const { speakerList, loading } = this.state
    const { speakers } = this.props

    if ( loading ) {
      return <Loader />
    }

    return (
      <ScrollView style={{flex: 1}}>
        <FlatList
          data={speakers}
          renderItem={(speaker) => <SpeakerCard speaker={speaker} filter={this.props.filter} />}
          keyExtractor={(speaker) => String(speaker.id)}
        />
      </ScrollView>
    )
  }
}

export default SpeakerList