import React, { Component } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { speakerSearch, speakerFilter, collapseSpeakersList, expandSpeakersList } from '../../actions'

import AppScreen from '../shared/layout/AppScreen'
import AppHeader from '../shared/layout/AppHeader'
import SpeakerList from '../SpeakerList'
import ScreenContent from '../shared/layout/ScreenContent'
import AppSearch from '../shared/layout/AppSearch'
import ScreenBottomPadding from '../shared/layout/ScreenBottomPadding'

class SpeakersScreen extends Component {
  state = {
    speakerList: this.props.speakers,
    expanded: this.props.expanded,
    display: 'row'
  }

  _searchSpeakers = (query) => {
    this.props.speakerSearch(query)

    const { speakers } = this.props
    const filteredList = speakers.filter((speaker) => {
      const speakerData = `${speaker.title.toString().toLowerCase()}
                          ${speaker.name.toString().toLowerCase()}
                          ${speaker.track.toString().toLowerCase()}
                          ${speaker.affiliation.toString().toLowerCase()}
                          ${speaker.room.toString().toLowerCase()}`
      const filterData = query.toLowerCase()

      return speakerData.indexOf(filterData) > -1
    })
    this.setState({
      speakerList: filteredList
    })
  }

  _filterSpeakers = (query) => {
    this.props.speakerFilter(query)

    const { speakers } = this.props
    const filteredList = speakers.filter((speaker) => {
      const speakerData = `${speaker.track.toString().toLowerCase()}`
      const filterData = query.toLowerCase()

      if ( filterData === 'all' ) {
        return speakerData
      }
      return speakerData.indexOf(filterData) > -1
    })
    this.setState({
      speakerList: filteredList
    })
  }

  _expandCollapse = () => {
    if ( this.props.expanded ) {
      this.props.collapseSpeakersList()
    } else {
      this.props.expandSpeakersList()
    }
    this.setState({
      expanded: !this.state.expanded
    })
  }

  _gridRow = () => {
    // if ( this.props.expanded ) {
    //   this.props.collapseSpeakersList()
    // } else {
    //   this.props.expandSpeakersList()
    // }
    this.setState({
      display: this.state.display === 'row' ? 'grid' : 'row'
    })
  }

  render() {
    const { speakerList } = this.state
    console.log('speakers', this.props.expanded)

    return (
      <AppScreen color1={'#fff'} color2={'rgba(233,150,255,0.5)'}>
        <AppHeader 
          pageName='Speakers' 
          pageSub='Big names, Bigger ideas'
        />
        <AppSearch 
          onChangeText={this._searchSpeakers} 
          filter={this._filterSpeakers} 
          expanded={this.props.expanded} 
          expandCollapse={this._expandCollapse}
          gridRow={this._gridRow} 
          // display={this.state.display}
          schedule
        />
        <ScreenContent style={speakerScreenStyle}>
          <SpeakerList 
            screen={'Speakers'} 
            speakers={speakerList} 
            filter={this._filterSpeakers} 
            expanded={this.props.expanded} 
            display={this.state.display}
          />
        </ScreenContent>
        {/* <ScreenBottomPadding size={140} /> */}
      </AppScreen>
    )
  }
}

const speakerScreenStyle = {
  paddingTop: 0,
  paddingBottom: 0,
  paddingLeft: 0,
  paddingRight: 0,
}

const mapStateToProps = ({ speakers, app }) => {
  // const speakerArray = Object.keys(speakers).map(i => speakers[i])
  return { 
    speakers: speakers.data,
    expanded: app.speakersExpanded
  }
}

export default connect(mapStateToProps, {
  speakerSearch, speakerFilter, collapseSpeakersList, expandSpeakersList
})(SpeakersScreen)