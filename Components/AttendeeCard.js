import React, { Component } from 'react'
import { View, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
// import { withNavigation } from 'react-navigation'
// import { LinearGradient } from 'expo'

import H2 from './shared/text/H2'
import AppText from './shared/text/AppText'
import { white, black, purpler, blue, blueDark, blueDarker, purple } from '../utils/colors'
import SpeakerLikeButton from './SpeakerLikeButton';
import SpeakerTrackButton from './SpeakerTrackButton';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'

const { width } = Dimensions.get('window')

class AttendeeCard extends Component {
  state = {
    expanded: true || this.props.expanded
  }

  render() {
    const { 
      affiliation, email, firstName, img, lastName, mySchedule, myFriends, shortBio
    } = this.props.attendee.item

    console.log("this attendee", this.props.attendee)
    console.log("first name", firstName)

    return (
      <TouchableOpacity 
        // onPress={this._goToSession}
        style={styles.cardStyle}
      >
        <View style={styles.cardBackground}>
          <AppText style={styles.talkSpeaker}>{firstName} 
            <AppText> {lastName}</AppText>
            <AppText style={styles.talkAffiliation}> ({affiliation})</AppText>
          </AppText>
          <SpeakerLikeButton id={email} />
        </View>
        {this.state.expanded && img !== '' &&
          <View style={styles.thumbnailStyle}>
            <Image 
              source={{ uri: img }} 
              style={styles.thumbnailImg} 
            />
          </View>
        }
      </TouchableOpacity>
    )
  }
}


const styles = StyleSheet.create({
  expandButton: {
    position: 'absolute',
    top: 10,
    right: 20,
    opacity: 0.5,
    zIndex: 10
  },
  trackColor: {
    position: 'absolute',
    width: 7,
    height: 200,
    left: 0,
    top: 0, 
    opacity: 0.7
  },
  cardBackground: {
    flex: 1,
    paddingRight: 20,
    paddingLeft: 20,
    paddingBottom: 10,
    borderRadius: 20,
    // flexDirection: 'row',
    // flexWrap: 'wrap',
    // justifyContent: 'center'
  },
  cardStyle: {
    flexDirection: 'row',
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,1)',
    marginTop: 0,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    width: width - 20,
    shadowColor: black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 1,
  },
  cardStyleNormal: {
    flexDirection: 'row',
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,1)',
    marginTop: 0,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    width: width - 20,
  },
  thumbnailStyle: {
    // marginRight: 10,
    position: 'absolute',
    top: 20,
    right: 20
  },
  thumbnailImg: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  talkMeta: {
    flex: 1,
  },
  talkTime: {
    fontFamily: 'nunito-bold',
    color: '#fff',
    fontSize: 10,
    borderTopWidth: 1,
    borderTopColor: '#fff'
  },
  talkLocation: {
    fontFamily: 'nunito',
    color: '#fff',
    fontSize: 10,
  },
  talkAffiliation: {
    color: '#fff',
    fontSize: 10,
    opacity: 0.5
  },
  // talkTopicButton: {
  //   borderWidth: 1,
  //   borderColor: 'rgba(21,21,0,0.3)',
  //   borderRadius: 10,
  //   // paddingTop: 3,
  //   // paddingBottom: 3,
  //   paddingLeft: 10,
  //   paddingRight: 10, 
  //   marginTop: 13
  // },
  talkTopic: {
    color: purpler,
    fontSize: 10,
  },
  talkTitle: {
    fontSize: 18,
    color: '#fff',
  },
  talkSpeaker: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)'
  }
})

export default AttendeeCard