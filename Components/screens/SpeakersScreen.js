import React, { Component } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { speakerSearch, speakerFilter } from '../../actions'

import AppScreen from '../shared/layout/AppScreen'
import AppHeader from '../shared/layout/AppHeader'
import SpeakerList from '../SpeakerList'
import ScreenContent from '../shared/layout/ScreenContent'
import AppSearch from '../shared/layout/AppSearch'

class SpeakersScreen extends Component {
  state = {
    speakerList: this.props.speakers.data
  }

  _searchSpeakers = (query) => {
    this.props.speakerSearch(query)

    const { speakers } = this.props
    const filteredList = speakers.data.filter((speaker) => {
      const speakerData = `${speaker.title.toString().toLowerCase()}
                          ${speaker.name.toString().toLowerCase()}`
      const filterData = query.toLowerCase()

      return speakerData.indexOf(filterData) > -1
    })
    this.setState({
      speakerList: filteredList
    })
  }

  render() {
    const { speakerList } = this.state

    return (
      <AppScreen>
        <AppHeader 
          pageName='Speakers' 
          pageSub='Big names, Bigger ideas'
        />
        <AppSearch onChangeText={this._searchSpeakers} />
        <ScreenContent>
          <SpeakerList speakers={speakerList} />
        </ScreenContent>
      </AppScreen>
    )
  }
}

const mapStateToProps = ({ speakers }) => {
  // const speakerArray = Object.keys(speakers).map(i => speakers[i])
  return { 
    speakers
  }
}

export default connect(mapStateToProps, {
  speakerSearch, speakerFilter
})(SpeakersScreen)