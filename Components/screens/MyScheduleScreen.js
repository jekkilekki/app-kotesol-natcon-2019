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
import ScreenBottomPadding from '../shared/layout/ScreenBottomPadding'
import BubbleTab from '../shared/layout/BubbleTab'
import AppText from '../shared/text/AppText';
import NoContent from '../NoContent';

class MyScheduleScreen extends Component {
  state = {
    speakerList: this.props.likedSpeakers,
    expanded: false, 
    input: ''
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log("this time", this.props.likedSpeakers)
  //   console.log("next time", nextProps.likedSpeakers)
  //   return this.props.likedSpeakers !== nextProps.likedSpeakers
  // }

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
    const { likedSpeakers } = this.props

    return (
      <AppScreen color1={'#fff'} color2={'rgba(233,150,255,0.5)'}>
        <AppHeader 
          pageName='My Schedule' 
          pageSub='Review the presentations you favorited'
        />
        <ScreenContent style={styles.speakerScreenStyle}>
          {likedSpeakers.length === 0 
            ? <NoContent name={'presentations'} />  
            : <SpeakerList schedule speakers={likedSpeakers} filter={this._filterSpeakers} expanded={this.state.expanded} />
          }
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

const mapStateToProps = ({ speakers, app, profile }) => {
  
  // console.log("do we have a profile?", profile)
  // console.log("who do we like then?", profile.mySchedule)
  // console.log("speakers data", speakers.data)
  const findSpeakers = speakers.data.filter(speaker => profile.mySchedule.includes(speaker.id))
  // console.log("do we have liked speakers?", findSpeakers)

  const sortedData = findSpeakers
    .sort((a,b) => {
      if ( a.time === b.time ) {
        return a.room < b.room ? -1 : a.room > b.room ? 1 : 0
      }
      return (a.time < b.time) ? -1 : (a.time > b.time) ? 1 : 0
    })
  return { 
    likedSpeakers: sortedData,
    expanded: app.scheduleExpanded,
    liked: profile.mySchedule
  }
}

export default connect(mapStateToProps, {
  speakerSearch, speakerFilter, expandScheduleList, collapseScheduleList
})(MyScheduleScreen)