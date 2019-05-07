import React, { Component } from 'react'
import { View, FlatList, ScrollView, Dimensions } from 'react-native'
import AppText from './shared/text/AppText'
import { connect } from 'react-redux'

import AttendeeCard from './AttendeeCard'
import Loader from './shared/Loader'

const { width, height } = Dimensions.get('window')

class AttendeesList extends Component {
  // state = {
  //   attendeesLoaded: false
  // }

  // componentWillReceiveProps(nextProps) {
  //   if ( this.props.attendees !== nextProps.attendees && nextProps.attendees !== [] ) {
  //     this.setState({ attendeesLoaded: true })
  //   }
  // }

  renderList() {
    return (
      <FlatList
        data={this.props.attendees.sort((a,b) => {
          return a.lastName < b.lastName ? -1 : a.lastName > b.lastName ? 1 : 0
        })}
        renderItem={(attendee) => 
          <AttendeeCard attendee={attendee} />
        }
        keyExtractor={(attendee) => String(attendee.email)}
      />
    )
  }

  render() {
    // console.log("Attendees yo", this.props.attendees)
    // if ( !this.state.attendeesLoaded ) return <Loader />
    return (
      <ScrollView style={{flex: 1, width: width, height: height, paddingTop: 10}}>
        { this.renderList() }
        {/* <ScreenBottomPadding size={60} /> */}
      </ScrollView>
    )
  }
}

const mapStateToProps = ({ attendees }) => {
  return { attendees: Object.keys(attendees.data).map(i => attendees.data[i]) }
}

export default connect(mapStateToProps)(AttendeesList)