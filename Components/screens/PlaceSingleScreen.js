import React, { Component } from 'react'
import { View, Dimensions, StyleSheet, Image } from 'react-native'
import { LinearGradient, MapView } from 'expo'

import AppText from '../shared/text/AppText'
import AppScreenTitle from '../shared/text/AppScreenTitle'
import AppScreenSubtitle from '../shared/text/AppScreenSubtitle'
import H3 from '../shared/text/H3'
import P from '../shared/text/P'
import ScreenContent from '../shared/layout/ScreenContent'
import AppScreen from '../shared/layout/AppScreen'
import HeaderBack from '../shared/layout/HeaderBack'
import ScreenSection from '../shared/layout/ScreenSection';
import PlaceLikeButton from '../PlaceLikeButton'
import ContentButton from '../shared/buttons/ContentButton'
import ScreenBottomPadding from '../shared/layout/ScreenBottomPadding'
import { purpler } from '../../utils/colors';

import EntypoIcon from 'react-native-vector-icons/Entypo'

const { width, height } = Dimensions.get('window')
const Marker = MapView.Marker
const Callout = MapView.Callout

const jjuStarCenterCoords = {
  latitude: 35.814088,
  longitude: 127.088927,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
}
// const jjuMarker = {
//   title: 'Star Center',
//   description: 'KOTESOL 2019 National Conference',
//   address: '전라북도 전주시 완산구 천잠로 303'
// }
const shinsikajiCoords = {
  latitude: 35.817314,
  longitude: 127.109360,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
}
// const shinsikajiMarker = {
//   title: 'Shinsikaji',
//   description: 'The New Downtown',
//   address: ''
// }
const gaeksaCoords = {
  latitude: 35.817700,
  longitude: 127.143968,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
}
// const gaeksaMarker = {
//   title: 'Gaeksa',
//   description: 'The Old Downtown',
//   address: ''
// }
const hanokVillageCoords = {
  latitude: 35.814269,
  longitude: 127.151225,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
}
// const hanokMarker = {
//   title: 'Hanok Village',
//   description: 'Tourism District',
//   address: ''
// }

class PlaceSingleScreen extends Component {
  state = {
    map: {
      latitude: this.props.navigation.state.params.place.coordinate.latitude,
      longitude: this.props.navigation.state.params.place.coordinate.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }
  }

  // getMap = () => {
  //   switch(this.props.navigation.state.params.place.location)
  // }

  _onRegionChange = (region) => {
    this.setState({ region })
  }

  renderMarker() {
    const { map } = this.state
    const { place } = this.props.navigation.state.params

    console.log( 'area', this.props.navigation.state.params.place.area )

    return (
      <Marker
        identifier={place.title}
        coordinate={place.coordinate}
        anchor={{ x: 0.5, y: 0.5 }}
        title={place.title}
        description={place.description}
        pinColor={'#d63aff'}
        ref={ref => this.marker = ref}
      >
        <Callout
          // onPress={() => this._goToPlace(place)}
        >
          <PlaceLikeButton style={[styles.likeMe, {top: 3}]} id={place.id} />
          <P dark>{place.title}</P>
          <P dark note>{place.description}</P>
          <P dark note style={{marginBottom: 0, paddingBottom: 0}}>{place.address[0]}</P>
        </Callout>
      </Marker>
    )
  }

  render() {
    const { place } = this.props.navigation.state.params

    return (
      <AppScreen color1={'#fff'} color2={'rgba(233,150,255,0.5)'}>
        <HeaderBack
          // pageName={speaker.title}
          // pageSub={speaker.name}
          backPage={'Map'}
        />
        <ScreenContent style={{height: height, marginTop: -30, backgroundColor: 'white'}}>
          <View style={[styles.speakerImgContainer, 
            // { height: speaker.img !== '' ? width - 130 : 130 }
          ]}>
            {place.img !== '' 
              ? <Image 
                  style={styles.speakerImg}
                  source={{ uri: place.img }} 
                />
              : <Image 
                  style={styles.speakerImg}
                  source={{ uri: 'https://2019.conference.jnjkotesol.com/img/speakers/knc-2019-default-square.png' }} 
                />
            }
            <LinearGradient 
              style={[styles.speakerImgOverlay]}
              colors={[
                'transparent', 
                purpler
              ]}
              // start={{x: 0.0, y: 0.25}} 
              // end={{x: 0.75, y: 1}}
              // locations={[0,1]}
            >
              <PlaceLikeButton large id={place.id} color1={'lightcoral'} style={{right: 15, bottom: 20, zIndex: 20}} />
              <View style={styles.speakerMeta}>
                <AppScreenTitle small>{place.title}</AppScreenTitle>
                <View style={{flexDirection: 'row'}}>
                  <AppText style={styles.talkSpeaker}>{place.address[0]}</AppText>
                </View>
                {place.phone !== '' && 
                  <View style={{flexDirection: 'row', marginTop: 3}}>
                    <EntypoIcon name={'old-phone'} size={14} color={'rgba(255,255,255,0.5)'} />
                    <AppText style={styles.talkAffiliation}> ({place.phone})</AppText>
                  </View>    
                }
              </View>
            </LinearGradient>
          </View>

          {/* <View style={{flex: 1, opacity: 0.7, flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: 'rgba(35,35,119,0.5)', paddingTop: 10, paddingBottom: 5}}>
            <AppText style={styles.talkTime}>{getTime(speaker.time)}
              <AppText style={styles.talkLocation}> - {speaker.room}</AppText>
            </AppText>
            <AppText style={styles.talkTopic}>{speaker.topic}
              {/* {speaker.subtopic !== '' && <AppText> • {speaker.subtopic}</AppText>}
            </AppText>
          </View> */}
          <View>
            <H3 dark>About {place.title}</H3>
            <P dark>{place.description}</P>
            <ContentButton
              opaque
              style={{marginTop: 25}}
              title="Go back"
              onPress={() => this.props.navigation.goBack()}
            />
          </View>
          <MapView 
            style={{ alignSelf: 'stretch', height: 300, marginLeft: -15, marginRight: -15, marginTop: 30 }} 
            region={this.state.map} 
            // initialCamera={this.state.camera}
            minZoomLevel={17}
            provider={MapView.PROVIDER_GOOGLE}
            ref={ref => this.map = ref}
            onPanDrag={this._onRegionChange}
          >
            {this.renderMarker()}
          </MapView>
          <ScreenBottomPadding size={140} />
        </ScreenContent>
      </AppScreen>
    )
  }
}

const styles = StyleSheet.create({
  speakerImgContainer: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: purpler,
    marginLeft: -15,
    marginRight: -15,
    padding: 15,
    paddingTop: 30,
    paddingBottom: 45,
  },
  backgroundCover: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 400,
    backgroundColor: purpler,
  },
  speakerImgOverlay: {
    position: 'absolute',
    bottom: 0,
    marginLeft: -15,
    // marginBottom: -15,
    padding: 15,
    width: width
  },
  speakerImg: {
    width: 200,
    height: 200,
    borderRadius: 100
  },
  content: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'stretch',
    backgroundColor: '#f00'
  },
  talkTime: {
    fontFamily: 'nunito-bold',
    color: '#232377',
    fontSize: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#232377'
  },
  talkLocation: {
    fontFamily: 'nunito',
    color: '#232377',
    fontSize: 12,
  },
  talkAffiliation: {
    color: '#fff',
    fontSize: 12,
    opacity: 0.7,
    marginLeft: 5
  },
  talkTopic: {
    color: purpler,
    fontSize: 12,
  },
  talkTitle: {
    fontSize: 15,
    color: '#161637',
  },
  talkSpeaker: {
    fontSize: 15,
    marginTop: 5,
    color: 'rgba(255,255,255,0.8)'
  }
})

export default PlaceSingleScreen