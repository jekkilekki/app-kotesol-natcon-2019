import React, { Component } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { getAttendees } from '../../actions'

import AppScreen from '../shared/layout/AppScreen'
import AppHeader from '../shared/layout/AppHeader'
import AppSearch from '../shared/layout/AppSearch'
import AttendeesList from '../AttendeesList'
import ScreenContent from '../shared/layout/ScreenContent'
import AppText from '../shared/text/AppText';

class AttendeesScreen extends Component {
  componentWillMount() {
    this.props.getAttendees()
  }
  // state = {
  //   attendeeList: this.props.attendees,
  // }

  // _searchAttendees = (query) => {
  //   this.props.attendeeSearch(query)

  //   const { attendees } = this.props
  //   const filteredList = attendees.filter((attendee) => {
  //     const attendeeData = `${attendee.firstName.toString().toLowerCase()}
  //                           ${attendee.lastName.toString().toLowerCase()}`
  //     const filterData = query.toLowerCase()

  //     return attendeeData.indexOf(filterData) > -1
  //   })
  //   this.setState({
  //     attendeeList: filteredList
  //   })
  // }

  render() {
    return (
      <AppScreen>
        <AppHeader 
          pageName='Attendees' 
          pageSub='Find a friend to connect with'
        />
        <AppSearch 
          // onChangeText={this._searchAttendees} 
          // filter={this._filterSpeakers} 
          // expanded={this.props.expanded} 
          // expandCollapse={this._expandCollapse}
          // gridRow={this._gridRow} 
          // display={this.state.display}
        />
        <ScreenContent style={attendeesScreenStyle}>
          <AttendeesList 
            // screen={'Speakers'} 
            // attendees={attendeesList} 
            // filter={this._filterSpeakers} 
            // expanded={this.props.expanded} 
            // display={this.state.display}
          />
        </ScreenContent>
      </AppScreen>
    )
  }
}

const attendeesScreenStyle = {
  paddingTop: 0,
  paddingBottom: 0,
  paddingLeft: 0,
  paddingRight: 0,
}

const mapStateToProps = ({ attendees }) => {
  // We'll have an Object, but need to convert it to an array here
  return attendees
}

export default connect(mapStateToProps, {
  getAttendees
})(AttendeesScreen)

// export default AttendeesScreen