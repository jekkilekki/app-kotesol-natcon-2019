import React, { Component } from 'react'
import { View, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import { withNavigation } from 'react-navigation'
import { LinearGradient } from 'expo'

import H2 from './shared/text/H2'
import AppText from './shared/text/AppText'
import { white, black, purpler, blue, blueDark, blueDarker, purple } from '../utils/colors'
import SpeakerLikeButton from './SpeakerLikeButton';
import SpeakerTrackButton from './SpeakerTrackButton';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { getTrackColor } from '../utils/helpers';

const { width } = Dimensions.get('window')

class PlenaryCard extends Component {
  state = {
    expanded: true || this.props.expanded
  }

  _goToSession = () => {
    const { speaker, navigation } = this.props 
    navigation.navigate( 'Session', { id: speaker.id, speaker: speaker })
  }

  _filter(query) {
    this.props.filter(query)
  }

  _getTime(time) {
    switch(time) {
      case '10:00': return '10:00am'
      case '11:00': return '11:00am'
      case '12:00': return '12:00pm'
      case '13:00': return '1:00pm'
      case '14:00': return '2:00pm'
      case '15:00': return '3:00pm'
      case '16:00': return '4:00pm'
      case '17:00': return '5:00pm'
      default: return time
    }
  }

  render() {
    const { id, title, name, nickname, shortname, 
      affiliation, other, time, room, summary, 
      abstract, bio, img, media, email, phone, track, coPresenter
    } = this.props.speaker

    return (
      <TouchableOpacity 
        onPress={this._goToSession}
        style={styles.cardStyle}
      >
        <LinearGradient 
          style={[styles.cardBackground, {paddingTop: 15}]} 
          // colors={[white, white]}
          colors={id === 'plenary' 
                    ? [purpler, purple]
                    : [white, white]
                  }
          start={{x: 0.0, y: 0}} 
          end={{x: 1, y: 1}}
          locations={[0,1]}
        >
          {!this.state.expanded && <View style={[styles.trackColor, {backgroundColor: getTrackColor(track)}]} />}
          {this.state.expanded 
            ? <TouchableOpacity style={styles.expandButton} onPress={() => this.setState({expanded: false})}>
                <MaterialCommunityIcon name={'arrow-expand-up'} />
              </TouchableOpacity>
            : <TouchableOpacity style={styles.expandButton} onPress={() => this.setState({expanded: true})}>
                <MaterialCommunityIcon name={'arrow-expand-down'} />
              </TouchableOpacity>
          }
          <View style={[styles.talkMeta, {
            paddingRight: this.state.expanded && img ? 60 : 0
          }]}>
            {name !== '' && <AppText style={styles.talkSpeaker}>{name}
              {affiliation !== '' &&
                <AppText style={styles.talkAffiliation}> ({affiliation})</AppText>
              }
            </AppText>
            }
            <H2 small dark normal style={[styles.talkTitle, 
              {
                paddingRight: this.state.expanded && img ? 10 : 0,
                paddingTop: 5,
                paddingBottom: 10,
              }
            ]}>{title}</H2>
            {this.state.expanded && 
            <View style={{flex: 1, opacity: 0.7, flexDirection: 'row', alignContent: 'flex-start', borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: 'rgba(35,35,119,0.5)', paddingTop: 10}}>
              {/* {this.renderTrack(track)} */}
              {coPresenter !== '' &&
                <AppText style={styles.talkLocation}>Co-presenter</AppText>
              }
              <AppText style={styles.talkTime}>{this._getTime(time)}
                <AppText style={styles.talkLocation}> - {room}</AppText>
              </AppText>
              <SpeakerTrackButton track={track} style={{marginTop: -2, marginLeft: 7, padding: 2}} onPress={() => this._filter(track)} />
            </View>
            }
            <SpeakerLikeButton id={id} />
          </View>
          {this.state.expanded && img !== '' &&
            <View style={styles.thumbnailStyle}>
              <Image 
                source={{ uri: img }} 
                style={styles.thumbnailImg} 
              />
            </View>
          }
        </LinearGradient>
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

export default PlenaryCard