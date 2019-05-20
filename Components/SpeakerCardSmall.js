import React, { Component } from 'react'
import { View, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import { withNavigation } from 'react-navigation'
import { LinearGradient } from 'expo'

import H2 from './shared/text/H2'
import P from './shared/text/P'
import AppText from './shared/text/AppText'
import { white, black, purpler, blue, blueDark } from '../utils/colors'
import SpeakerLikeButton from './SpeakerLikeButton';
import SpeakerTrackButton from './SpeakerTrackButton';
import PlenaryCard from './PlenaryCard'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import { getTrackColor, getTime } from '../utils/helpers';

const { width } = Dimensions.get('window')

class SpeakerCardSmall extends Component {
  state = {
    expanded: this.props.expanded
  }

  _goToSession = () => {
    const { speaker, navigation } = this.props 
    navigation.navigate( 'Session', { id: speaker.item.id, speaker: speaker.item })
  }

  _filter(query) {
    this.props.filter(query)
  }

  renderImg() {
    if ( this.state.expanded && this.props.speaker.item.img !== '' ) {
      if ( this.props.speaker.item.img.charAt(0) === 'h' ) {
        return (
          <View style={styles.thumbnailStyle}>
            <Image source={{ uri: this.props.speaker.item.img }} style={styles.thumbnailImg} />
          </View>
        )
      } else {
        return null
        (
          <View style={styles.thumbnailStyle}>
            <Image source={this.props.speaker.item.img} style={styles.thumbnailImg} />
          </View>
        )
      }
    }
  }

  updateList() {
    console.log('SpeakerCardSmall')
    this.props.updateList()
    console.log('SpeakerCardSmall after')
  }

  render() {
    const { id, title, name, nickname, shortname, 
            affiliation, other, time, room, summary, 
            abstract, bio, img, media, email, phone, track, 
            coPresenter, coPresenterAff, status
          } = this.props.speaker.item

    if ( this.props.screen === 'Speakers' && 
      (id === 'lunch' || id === 'after' || id === 'closing' || id === 'registration')
      || id === 'plenary-old' ) 
      return null 

    if ( id === 'lunch' || id === 'after' || id === 'closing' || id === 'registration' ) {
      return (
        <TouchableOpacity style={[styles.cardBackground]} onPress={() => this.props.navigation.navigate('Map', {referer: id})}>
          <LinearGradient 
            style={[styles.cardStyleNormal, {paddingTop: 15}]} 
            // colors={[white, white]}
            colors={[blueDark, blue]}
            start={{x: 0.0, y: 0}} 
            end={{x: 1, y: 1}}
            locations={[0,1]}
          >
            <View style={{flexDirection: 'row', alignItems: 'center', width: width - 30}}>
              <H2 small normal>{title}</H2>
              <P note style={{marginTop: 0}}> ({room})</P>
              <EntypoIcon name={'chevron-right'} color={'#00dddd'} size={30} style={{position: 'absolute', right: 10, top: -3}} />
            </View>
          </LinearGradient>
        </TouchableOpacity>
      )
    }

    if ( id === 'plenary' ) {
      return <PlenaryCard speaker={this.props.speaker.item} navigation={this.props.navigation} expanded={this.state.expanded} updateList={this.updateList} />
    }

    return (
      <TouchableOpacity 
        onPress={this._goToSession}
        style={styles.cardBackground}
      >
        <LinearGradient 
          style={[styles.cardStyle, {paddingTop: 15}]} 
          // colors={[white, white]}
          colors={id === 'plenary' 
                    ? ['rgba(233,150,255,0.5)', 'rgba(233,150,255,1)']
                    : [white, white]
                  }
          start={{x: 0.0, y: 0}} 
          end={{x: 1, y: 1}}
          locations={[0,1]}
        >
          {!this.state.expanded && 
            <TouchableOpacity 
              style={[styles.trackColor, {backgroundColor: getTrackColor(track)}]} 
              onPress={() => this._filter(track)}
            />
          }
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
            {name !== '' && 
              <AppText style={styles.talkSpeaker}>{name}
              {affiliation !== '' &&
                <AppText style={styles.talkAffiliation}> ({affiliation})</AppText>
              }
              </AppText>
            }
            {coPresenter !== '' && 
              <AppText style={styles.talkSpeaker}>+ {coPresenter}
              {coPresenterAff !== '' &&
                <AppText style={styles.talkAffiliation}> ({coPresenterAff})</AppText>
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
              <AppText style={styles.talkTime}>{getTime(time)}
                <AppText style={styles.talkLocation}> - {room}</AppText>
              </AppText>
              <SpeakerTrackButton track={track} style={{marginTop: -2, marginLeft: 7, padding: 2}} onPress={() => this._filter(track)} />
            </View>
            }
            <SpeakerLikeButton id={id} updateList={() => this.updateList()} />
          </View>
          {this.renderImg()}
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
    height: '100%',
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    width: 7,
    height: 200,
    left: 0,
    top: 0, 
    opacity: 0.7
  },
  cardStyle: {
    flex: 1,
    paddingRight: 20,
    paddingLeft: 20,
    paddingBottom: 10,
    borderRadius: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'transparent',
    overflow: 'hidden',
    zIndex: -1
    // flexDirection: 'row',
    // flexWrap: 'wrap',
    // justifyContent: 'center'
  },
  cardBackground: {
    flexDirection: 'row',
    borderRadius: 15,
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
    borderRadius: 15,
    backgroundColor: 'rgba(255,255,255,1)',
    marginTop: 0,
    paddingBottom: 8,
    paddingLeft: 15,
    paddingRight: 15,
    width: width - 20,
  },
  thumbnailStyle: {
    // marginRight: 10,
    position: 'absolute',
    top: 20,
    right: 20
  },
  thumbnailImg: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  talkMeta: {
    flex: 1,
  },
  talkTime: {
    fontFamily: 'nunito-bold',
    color: '#232377',
    fontSize: 10,
    // borderTopWidth: 1,
    // borderTopColor: '#232377'
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

export default withNavigation(SpeakerCardSmall)