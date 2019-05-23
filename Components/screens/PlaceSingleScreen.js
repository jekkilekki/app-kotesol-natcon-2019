import React, { Component } from 'react'
import { View, Dimensions, StyleSheet, Image, Platform } from 'react-native'
import { LinearGradient, MapView } from 'expo'

import AppText from '../shared/text/AppText'
import AppScreenTitle from '../shared/text/AppScreenTitle'
import H3 from '../shared/text/H3'
import P from '../shared/text/P'
import ScreenContent from '../shared/layout/ScreenContent'
import AppScreen from '../shared/layout/AppScreen'
import HeaderBack from '../shared/layout/HeaderBack'
import PlaceLikeButton from '../PlaceLikeButton'
import ContentButton from '../shared/buttons/ContentButton'
import ScreenBottomPadding from '../shared/layout/ScreenBottomPadding'
import { purpler } from '../../utils/colors'

import EntypoIcon from 'react-native-vector-icons/Entypo'
import { NavigationEvents } from 'react-navigation';

const { width, height } = Dimensions.get('window')
const Marker = MapView.Marker
const Callout = MapView.Callout

class PlaceSingleScreen extends Component {
  state = {
    mapRegion: {
      latitude: this.props.navigation.state.params.place.coordinate.latitude,
      longitude: this.props.navigation.state.params.place.coordinate.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }, 
    mapLoaded: false
  }

  _onRegionChange = (region) => {
    this.setState({ mapRegion: region })
  }

  renderMap() {
    if ( !this.state.mapLoaded ) return null
    if (Platform.OS === 'ios') {
      return (
        <MapView 
          style={{ alignSelf: 'stretch', height: 400, marginLeft: -15, marginRight: -15 }} 
          region={this.state.mapRegion} 
          minZoomLevel={17}
          provider={MapView.PROVIDER_GOOGLE}
          ref={ref => this.map = ref}
          onPanDrag={() => this._onRegionChange()}
        >
          {this.renderMarker()}
        </MapView>
      )
    } else {
      return (
        <MapView 
          style={{ alignSelf: 'stretch', height: 400, marginLeft: -15, marginRight: -15 }} 
          region={this.state.mapRegion} 
          minZoomLevel={17}
          provider={MapView.PROVIDER_GOOGLE}
          ref={ref => this.map = ref}
          onRegionChangeComplete={() => this._onRegionChange()}
        >
          {this.renderMarker()}
        </MapView>
      )
    }
  }

  renderMarker() {
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
        <Callout>
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
    console.log('Navigation', this.props.navigation.state)

    return (
      <AppScreen color1={'#fff'} color2={'rgba(233,150,255,0.5)'}>
        <HeaderBack
          backPage={'Map'}
        />

        <NavigationEvents
          // This SHOULD tell the app to load MapView when it comes to this screen, 
          // and NOT to when leaving this screen.
          // Should (hopefully) fix a memory leak in iOS - that might have caused this to crash
          onWillBlur={payload => { this.setState({ mapLoaded: false })}}
          onWillFocus={payload => { this.setState({ mapLoaded: true })}}
        />

        <ScreenContent noPadding style={{height: height, marginTop: -30, backgroundColor: 'white'}}>
          <View style={[styles.speakerImgContainer, 
            // { height: speaker.img !== '' ? width - 130 : 130 }
          ]}>
            {place.img !== '' 
              ? <Image 
                  style={styles.speakerImg}
                  source={{ uri: place.img || 'https://2019.conference.jnjkotesol.com/img/speakers/knc-2019-default-square.png' }} 
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

          {/* <View style={[{paddingLeft: 15, paddingRight: 15}, styles.ipadStyle]}>
            <H3 dark>{place.title} Location</H3>
            <P dark>{place.description}</P>
          </View> */}
          
          {this.renderMap()}

          <View style={[{paddingLeft: 15, paddingRight: 15}, styles.ipadStyle]}>
            <ContentButton
              opaque
              style={{marginTop: 25}}
              title="Go back"
              onPress={() => this.props.navigation.goBack()}
            />
          </View>

          <ScreenBottomPadding size={140} />
        </ScreenContent>
      </AppScreen>
    )
  }
}

const styles = StyleSheet.create({
  ipadStyle: {
    width: width,
    maxWidth: 500,
    alignSelf: 'center'
  },
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