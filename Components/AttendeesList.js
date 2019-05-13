import React, { Component } from 'react'
import { View, FlatList, ScrollView, Dimensions } from 'react-native'
import AppText from './shared/text/AppText'
import { connect } from 'react-redux'

import AttendeeCard from './AttendeeCard'
import Loader from './shared/Loader'
import ScreenBottomPadding from './shared/layout/ScreenBottomPadding'

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
    const { profile } = this.props
    return (
      <FlatList
        data={this.props.attendees.sort((a,b) => {
          return a.lastName < b.lastName ? -1 : a.lastName > b.lastName ? 1 : 0
        })}
        renderItem={(attendee) => 
          profile.uid !== attendee.uid && <AttendeeCard attendee={attendee} />
        }
        keyExtractor={(attendee) => String(attendee.email)}
      />
    )
  }

  render() {
    const { profile } = this.props
    let thisUser = { "item": profile }
    // console.log( 'this user', profile )
    // console.log("Attendees yo", this.props.attendees)
    // if ( !this.state.attendeesLoaded ) return <Loader />
    return (
      <ScrollView style={{flex: 1, width: width, height: height, paddingTop: 10}}>
        {profile.uid !== undefined && profile.uid !== '' &&
          <AttendeeCard attendee={thisUser} />
        }
        { this.renderList() }
        <ScreenBottomPadding size={250} />
      </ScrollView>
    )
  }
}

const mapStateToProps = ({ attendees, profile }) => {
  // const { uid } = profile.uid
  const attendeeArray = Object.keys(attendees.data).map(i => attendees.data[i])
  // console.log( 'attendee array', attendeeArray )

  return { 
    attendees: attendeeArray, 
    profile
  }
}

export default connect(mapStateToProps)(AttendeesList)