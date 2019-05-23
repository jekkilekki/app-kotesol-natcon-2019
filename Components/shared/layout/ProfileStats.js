import React, { Component } from 'react'
import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import { withNavigation } from 'react-navigation'

import H2 from '../text/H2'
import P from '../text/P'

import { appPurple, appTeal } from '../../../utils/colors'

const { width } = Dimensions.get('window')

class ProfileStats extends Component {
  render() {
    const { profile } = this.props
    const { uid, img, firstName, lastName, affiliation, shortBio, email, myFriends, mySchedule, myPlaces, displayInfo, secretKey } = profile

    return (
      <View style={styles.profileStats}>
        <View style={{maxWidth: 500, flexDirection: 'row', alignSelf: 'center'}}>
          <TouchableOpacity style={styles.profileStatBox} onPress={() => this.props.navigation.navigate('MySchedule')}>
            <H2 normal center style={{paddingBottom: 0, color: appTeal}}>{mySchedule === [] || mySchedule === undefined ? '0' : mySchedule.length}</H2>
            <P center style={{paddingBottom: 0}}>My Talks</P>
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.profileStatBox} onPress={() => this.props.navigation.navigate('MyFriends')}>
            <H2 normal center style={{paddingBottom: 0, color: appPurple}}>{myFriends === [] || myFriends === undefined ? '0' : myFriends.length}</H2>
            <P dark center style={{paddingBottom: 0}}>Friends</P>
          </TouchableOpacity> */}
          <TouchableOpacity style={styles.profileStatBox} onPress={() => this.props.navigation.navigate('MyPlaces')}>
            <H2 normal center style={{paddingBottom: 0, color: appTeal}}>{myPlaces === [] || myPlaces === undefined ? '0' : myPlaces.length}</H2>
            <P center style={{paddingBottom: 0}}>My Places</P>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  profileStats: {
    backgroundColor: 'rgba(21,21,55,0.3)',
    marginLeft: -15,
    marginRight: -15,
    marginTop: -15,
    paddingRight: 15,
    paddingLeft: 15
    
  },
  profileStatBox: {
    width: width / 3,
    justifyContent: 'center',
    flexWrap: 'wrap',
    paddingTop: 15,
    paddingBottom: 15
  },
})

const mapStateToProps = ({ profile }) => {
  return { profile }
}

export default connect(mapStateToProps)(withNavigation(ProfileStats))