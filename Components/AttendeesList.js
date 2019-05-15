import React, { Component } from 'react'
import { View, FlatList, ScrollView, Dimensions, StyleSheet } from 'react-native'
import AppText from './shared/text/AppText'
import { connect } from 'react-redux'

import AttendeeCard from './AttendeeCard'
import H3 from './shared/text/H3'
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
    const { profile, attendees, pageId } = this.props
    let listData = pageId === 'friends'
      ? attendees.filter(i => profile.myFriends.includes(i.uid))
      : attendees

    return (
      <FlatList
        data={listData.filter(i => i.uid !== profile.uid).sort((a,b) => {
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
    const { profile, pageId } = this.props
    let thisUser = { "item": profile }
    // console.log( 'this user', profile )
    // console.log("Attendees yo", this.props.attendees)
    // if ( !this.state.attendeesLoaded ) return <Loader />
    return (
      <ScrollView style={{flex: 1, width: width, height: height, paddingTop: 10}}>
        {pageId !== 'friends' && profile.uid !== undefined && profile.uid !== '' &&
          <View>
            <H3 small dark style={{marginTop: 0, marginLeft: 15, paddingTop: 0}}>Me</H3>
            <View style={{borderTopColor: 'rgba(35,35,119,0.5)', borderTopWidth: StyleSheet.hairlineWidth }} />
            <AttendeeCard me attendee={thisUser} />
            <View style={{borderTopColor: 'rgba(35,35,119,0.5)', borderTopWidth: StyleSheet.hairlineWidth, height: 20 }} />
          </View>
        }
        <H3 small dark style={{marginTop: 0, marginLeft: 15, paddingTop: 0}}>Attendees ({this.props.profile.myFriends.length})</H3>
        <View style={{borderTopColor: 'rgba(35,35,119,0.5)', borderTopWidth: StyleSheet.hairlineWidth }} />
        { this.renderList(thisUser) }
        <ScreenBottomPadding size={250} />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  listLine: {
    borderTopColor: 'rgba(35,35,119,0.5)',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(35,35,119,0.5)',
    borderBottomWidth: StyleSheet.hairlineWidth
  }
})

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