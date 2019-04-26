import React, { Component } from 'react'
import { View, SafeAreaView, Text, StyleSheet, Button } from 'react-native'
import { connect } from 'react-redux'
import { speakerSearch, speakerFilter, expandScheduleList, collapseScheduleList } from '../../actions'

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
    speakerList: this.props.scheduledSpeakers,
    expanded: false, 
    input: ''
  }

  _searchSpeakers = (query) => {
    this.props.speakerSearch(query)

    const { scheduledSpeakers } = this.props
    const filteredList = scheduledSpeakers.filter((speaker) => {
      const speakerData = `${speaker.title.toString().toLowerCase()}
                          ${speaker.name.toString().toLowerCase()}`
      const filterData = query.toLowerCase()

      return speakerData.indexOf(filterData) > -1
    })
    this.setState({
      speakerList: filteredList,
      input: query
    })
  }

  _filterSpeakers = (query) => {
    this.props.speakerFilter(query)

    const { scheduledSpeakers } = this.props
    const filteredList = scheduledSpeakers.filter((speaker) => {
      const speakerData = `${speaker.track.toString().toLowerCase()}`
      const filterData = query.toLowerCase()

      if ( filterData === 'all' ) {
        return speakerData
      }
      return speakerData.indexOf(filterData) > -1
    })
    console.log('filtering in the schedule screen yo: ', filteredList)
    this.setState({
      speakerList: filteredList,
      input: ''
    })
  }

  _expandCollapse = () => {
    if ( this.props.expanded ) {
      this.props.collapseScheduleList()
    } else {
      this.props.expandScheduleList()
    }
    this.setState({
      expanded: !this.state.expanded
    })
  }

  render() {
    const { speakerList } = this.state

    return (
      <AppScreen color1={'#fff'} color2={'rgba(233,150,255,0.5)'}>
        <AppHeader 
          pageName='Schedule' 
          pageSub='Explore the presentation tracks'
        />
        {/* Maybe we don't put Search on the ScheduleScreen - or we have to rewrite / modify the search / filter functions. */}
        <AppSearch 
          onChangeText={this._searchSpeakers} 
          filter={this._filterSpeakers} 
          inputValue={this.state.input}
          expanded={this.state.expanded} 
          expandCollapse={this._expandCollapse} 
        />
        <BubbleTab tabs={['Schedule', 'My Schedule']} />
        {/* <MyTabBar routes={['Schedule', 'My Schedule']} /> */}
        <ScreenContent style={styles.speakerScreenStyle}>
          <SpeakerList schedule speakers={speakerList} filter={this._filterSpeakers} expanded={this.state.expanded} />
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

const mapStateToProps = ({ speakers, app }) => {
  const sortedData = speakers.data
  .sort((a,b) => {
    if ( a.time === b.time ) {
      return a.room < b.room ? -1 : a.room > b.room ? 1 : 0
    }
    return (a.time < b.time) ? -1 : (a.time > b.time) ? 1 : 0
  })
  return { 
    scheduledSpeakers: sortedData,
    expanded: app.scheduleExpanded
  }
}

export default connect(mapStateToProps, {
  speakerSearch, speakerFilter, expandScheduleList, collapseScheduleList
})(ScheduleScreen)