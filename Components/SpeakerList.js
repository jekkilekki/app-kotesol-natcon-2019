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

  _filterSpeakers = (speaker) => {
    const { speakerList } = this.state
    const newList = speakerList.filter((speaker) => {
      const speakers = `${speaker.title.toString().toLowerCase()}
                        ${speaker.name.toString().toLowerCase()}`
      const search = speaker.toLowerCase()

      return speakers.indexOf(search) > -1
    })
    this.setState({
      speakerList: newList
    })
  }

  renderItem(speaker) {
    return <SpeakerCard speaker={speaker} />
  }

  render() {
    const { speakerList, loading } = this.state

    if ( loading ) {
      return <Loader />
    }

    return (
      <ScrollView style={{flex: 1}}>
        <AppSearch onChangeText={(search) => this._filterSpeakers(search)} />
        <FlatList
          data={speakerList}
          renderItem={(speaker) => <SpeakerCard speaker={speaker} />}
          keyExtractor={(speaker) => String(speaker.id)}
        />
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return { speakers: state.speakers }
}

export default connect(mapStateToProps)(SpeakerList)