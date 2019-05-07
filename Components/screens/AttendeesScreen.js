import React, { Component } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { getAttendees } from '../../actions'

import Loader from '../shared/Loader'
import AppScreen from '../shared/layout/AppScreen'
import AppHeader from '../shared/layout/AppHeader'
import AppSearch from '../shared/layout/AppSearch'
import AttendeesList from '../AttendeesList'
import ScreenContent from '../shared/layout/ScreenContent'
import AppText from '../shared/text/AppText'

class AttendeesScreen extends Component {
  state = {
    attendeeList: this.props.attendees || {},
    loaded: false
  }
  
  componentWillMount() {
    this.props.getAttendees()
  }

  componentWillReceiveProps(nextProps) {
    console.log("this props", this.props.attendees)
    console.log("next props", nextProps.attendees)
    if ( !this.state.loaded && this.props.attendees !== nextProps.attendees && nextProps.attendees !== {} ) {
      this.setState({ attendeeList: nextProps.attendees, loaded: true })
    }
  }

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
      <AppScreen color1={'#fff'} color2={'rgba(233,150,255,0.5)'}>
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
        {this.props.attendees === undefined
          ? <Loader />
          : <AttendeesList 
              // screen={'Speakers'} 
              // attendees={this.state.attendeesList} 
              // filter={this._filterSpeakers} 
              // expanded={this.props.expanded} 
              // display={this.state.display}
            />
        }
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
  return { attendees: Object.keys(attendees.data).map(i => attendees.data[i]) }
}

export default connect(mapStateToProps, {
  getAttendees
})(AttendeesScreen)