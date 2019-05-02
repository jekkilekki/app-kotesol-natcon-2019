import React, { Component } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
// import { attendeesFetch } from '../../actions'

import AppScreen from '../shared/layout/AppScreen'
import AppHeader from '../shared/layout/AppHeader'
// import AttendeesList from '../AttendeesList'
import ScreenContent from '../shared/layout/ScreenContent'
import AppText from '../shared/text/AppText';

class AttendeesScreen extends Component {
  render() {
    return (
      <AppScreen>
        <AppHeader 
          pageName='Attendees' 
          pageSub='Find a friend to connect with'
        />
        <ScreenContent>
          <AppText>AttendeesList here</AppText>
          {/* <AttendeesList /> */}
        </ScreenContent>
      </AppScreen>
    )
  }
}

const mapStateToProps = ({ attendees }) => {
  // We'll have an Object, but need to convert it to an array here
  return attendees
}

// export default connect(mapStateToProps, {
//   attendeesFetch
// })(AttendeesScreen)

export default AttendeesScreen