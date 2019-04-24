import React, { Component } from 'react'
import { View, SafeAreaView, Text, StyleSheet, Button } from 'react-native'
import { connect } from 'react-redux'
import { speakerSearch, speakerFilter } from '../../actions'

import AppHeader from '../shared/layout/AppHeader'
import AppScreen from '../shared/layout/AppScreen'
import ScreenContent from '../shared/layout/ScreenContent'
import ContentButton from '../shared/buttons/ContentButton'
import SpeakerList from '../SpeakerList'
import AppSearch from '../shared/layout/AppSearch'
import MyTabBar from '../navigation/MyTabBar'
import ScreenBottomPadding from '../shared/layout/ScreenBottomPadding';
import BubbleTab from '../shared/layout/BubbleTab';

class ScheduleScreen extends Component {
  state = {
    speakerList: this.props.speakers
  }

  _searchSpeakers = (query) => {
    this.props.speakerSearch(query)

    const { speakers } = this.props
    const filteredList = speakers.filter((speaker) => {
      const speakerData = `${speaker.title.toString().toLowerCase()}
                          ${speaker.name.toString().toLowerCase()}`
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

  render() {
    const { speakerList } = this.state

    console.log(this.props.speakers)

    return (
      <AppScreen color1={'#fff'} color2={'rgba(233,150,255,0.5)'}>
        <AppHeader 
          pageName='Schedule' 
          pageSub='Explore the presentation tracks'
        />
        {/* Maybe we don't put Search on the ScheduleScreen - or we have to rewrite / modify the search / filter functions. */}
        <AppSearch onChangeText={this._searchSpeakers} filter={this._filterSpeakers} />
        <BubbleTab tabs={['Schedule', 'My Schedule']} />
        {/* <MyTabBar routes={['Schedule', 'My Schedule']} /> */}
        <ScreenContent style={styles.speakerScreenStyle}>
          <SpeakerList schedule speakers={speakerList} filter={this._filterSpeakers} />
          <ScreenBottomPadding size={100} />
        </ScreenContent>
      </AppScreen>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  },
  speakerScreenStyle: {
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
  }
})

const mapStateToProps = ({ speakers }) => {
  return { 
    speakers: speakers.data
      .sort((a,b) => {
        if ( a.time === b.time ) {
          return a.room < b.room ? -1 : a.room > b.room ? 1 : 0
        }
        return (a.time < b.time) ? -1 : (a.time > b.time) ? 1 : 0
      })
  }
}

export default connect(mapStateToProps, {
  speakerSearch, speakerFilter
})(ScheduleScreen)