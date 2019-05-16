import React, { Component } from 'react'
import { View, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import { withNavigation } from 'react-navigation'
// import { LinearGradient } from 'expo'

import H2 from './shared/text/H2'
import AppText from './shared/text/AppText'
import { white, black, purpler, blue, blueDark, blueDarker, purple } from '../utils/colors'
import FriendLikeButton from './FriendLikeButton';
import SpeakerTrackButton from './SpeakerTrackButton';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import EntypoIcon from 'react-native-vector-icons/Entypo'

const { width } = Dimensions.get('window')

class AttendeeCard extends Component {
  // state = {
  //   expanded: true || this.props.expanded
  // }

  _goToPerson = () => {
    const { attendee, navigation } = this.props 
    this.props.me
      ? navigation.navigate( 'Profile', { goBack: 'Attendees' } )
      : navigation.navigate( 'Person', { id: attendee.item.id, attendee: attendee.item })
  }

  render() {
    const { 
      uid, affiliation, email, firstName, img, lastName, mySchedule, myFriends, shortBio
    } = this.props.attendee.item

    return (
      <TouchableOpacity 
        onPress={this._goToPerson}
        style={[styles.cardStyle, {
          borderBottomColor: this.props.me ? 'transparent' : 'rgba(35,35,119,0.5)',
          borderBottomWidth: this.props.me ? 0 : StyleSheet.hairlineWidth
        }]}
      >
        {!this.props.me &&
          <FriendLikeButton id={uid} color1={'lightcoral'} style={{right: 15, bottom: 5}} />
        }
        <View style={[styles.cardBackground]}>
          <View style={[styles.talkMeta, {
            paddingRight: img ? 60 : 0
          }]}>
            <AppText dark style={styles.talkTitle}>{firstName} {lastName}</AppText>
            {affiliation !== '' && affiliation !== undefined && 
              <AppText dark style={styles.talkSpeaker}>{affiliation}</AppText>
            }
          </View>
          {/* <SpeakerLikeButton id={email} /> */}
        </View>
        {img !== '' &&
          <View style={styles.thumbnailStyle}>
            <Image 
              source={{ uri: img }} 
              style={styles.thumbnailImg} 
            />
          </View>
        }
        <EntypoIcon name={'chevron-right'} color={'#00dddd'} size={30} style={{marginRight: 5}} />
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
    // paddingBottom: 10,
    borderRadius: 15,
    // flexDirection: 'row',
    // flexWrap: 'wrap',
    // justifyContent: 'center'
  },
  cardStyle: {
    flexDirection: 'row',
    borderRadius: 15,
    backgroundColor: 'transparent',
    // marginTop: 0,
    // marginBottom: 10,
    // paddingBottom: 15,
    paddingTop: 20,
    paddingBottom: 20,
    // marginLeft: 10,
    // marginRight: 10,
    width: width,
    // shadowColor: black,
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.2,
    // elevation: 1,
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
    marginRight: 5,
    // position: 'absolute',
    // top: 10,
    // right: 20
  },
  thumbnailImg: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  talkMeta: {
    flex: 1,
  },
  talkTime: {
    fontFamily: 'nunito-bold',
    color: '#232377',
    fontSize: 10,
    borderTopWidth: 1,
    borderTopColor: '#232377'
  },
  talkLocation: {
    fontFamily: 'nunito',
    color: '#232377',
    fontSize: 10,
  },
  talkAffiliation: {
    color: '#232377',
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
    fontSize: 15,
    color: '#161637',
  },
  talkSpeaker: {
    fontSize: 12,
    color: 'rgba(35,35,119,0.8)'
  }
})

export default withNavigation(AttendeeCard)