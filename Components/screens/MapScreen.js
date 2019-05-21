import React, { Component } from 'react'
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity, Button, Platform } from 'react-native'
import { MapView } from 'expo'
import { connect } from 'react-redux'

import AppHeader from '../shared/layout/AppHeader'
import Loader from '../shared/Loader'
import AppScreen from '../shared/layout/AppScreen'
import ScreenContent from '../shared/layout/ScreenContent'
import AppText from '../shared/text/AppText'
import H2 from '../shared/text/H2'
import P from '../shared/text/P'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import Dropdown from '../shared/layout/Dropdown'
import SmallButton from '../shared/buttons/SmallButton'
import ContentButton from '../shared/buttons/ContentButton'
import ScreenBottomPadding from '../shared/layout/ScreenBottomPadding'
import AppList from '../shared/layout/AppList'
import PlaceLikeButton from '../PlaceLikeButton'

import { getPinColor } from '../../utils/helpers'
import { 
  appBlack, appDarkBlue, appOrange, appBlue, appPink, appPurple, appDarkPurple, appTeal,
  appBlack70, appDarkBlue70, appOrange70, appBlue70, appPink70, appPurple70, appDarkPurple70, appTeal70,
  appGrey50, appGrey30, appGrey70, black, purpler, white, appTeal30
} from '../../utils/colors'
import ScreenSection from '../shared/layout/ScreenSection';
import SpeakerLikeButton from '../SpeakerLikeButton';

import { likePlace, dislikePlace } from '../../actions'

const { width } = Dimensions.get('window')
const Marker = MapView.Marker
const Circle = MapView.Circle
const Callout = MapView.Callout

const jjuStarCenterCoords = {
  latitude: 35.814088,
  longitude: 127.088927,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
}
const jjuMarker = {
  title: 'Star Center',
  description: 'KOTESOL 2019 National Conference',
  address: '전라북도 전주시 완산구 천잠로 303'
}
const shinsikajiCoords = {
  latitude: 35.817314,
  longitude: 127.109360,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
}
const shinsikajiMarker = {
  title: 'Shinsikaji',
  description: 'The New Downtown',
  address: ''
}
const gaeksaCoords = {
  latitude: 35.817700,
  longitude: 127.143968,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
}
const gaeksaMarker = {
  title: 'Gaeksa',
  description: 'The Old Downtown',
  address: ''
}
const hanokVillageCoords = {
  latitude: 35.814269,
  longitude: 127.151225,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
}
const hanokMarker = {
  title: 'Hanok Village',
  description: 'Tourism District',
  address: ''
}

class MapScreen extends Component {
  state = {
    topMapRegion: jjuStarCenterCoords,
    map: jjuStarCenterCoords,
    mapLoaded: false,
    markerArea: 'Campus',
    markerType: 'all',
    region: jjuStarCenterCoords,
    mainMarker: jjuMarker,
    camera: {
      center: {
        latitude: 35.813805,
        longitude: 127.089688,
      },
      // pitch: Number,
      // heading: Number,
      altitude: 3,
      zoom: 3
    }
  }

  componentDidMount() {
    this.setState({ mapLoaded: true })
    // this.refs.starCenterMarker.showCallout()
  }

  _goToPlace = (place) => {
    this.props.navigation.navigate( 'Place', { id: place.id, place })
  }

  _changeHeart = (id, title, callout) => {
    const { likePlace, dislikePlace } = this.props 

    if ( this.props.likedPlaces.includes(id) ) {
      dislikePlace(id)
    } else {
      likePlace(id)
    }

    alert(`Added ${title} to your Favorite places!`)

    // callout.hideCallout()
  }

  _onTopRegionChange = (region) => {
    this.setState({ topMapRegion: region })
  }

  _onRegionChange = (region) => {
    this.setState({ region })
  }

  async getCamera() {
    const camera = await this.map.getCamera()
    alert('Current camera' + JSON.stringify(camera), [{text: 'OK'}], {cancelable: true})
  }

  async setCamera(location) {
    const camera = await this.map.getCamera()
    // This is similar to setState, just pass the properties to change
    this.map.setCamera({
      center: location
    })
  }

  async animateCamera(location) {
    const camera = await this.map.getCamera()
    camera.center = location
    this.map.animateCamera(camera, { duration: 1000 })
  }

  _centerMap = () => {
    this.setState({
      region: jjuStarCenterCoords
    })
    this.map.animateToRegion({ jjuStarCenterCoords }, 1000)
  }

  renderTopMap() {
    if (Platform.OS === 'ios') {
      return (
        <MapView 
          style={{ alignSelf: 'stretch', height: 200, backgroundColor: '#232377', marginTop: -10}} 
          region={jjuStarCenterCoords}
          // initialCamera={this.state.camera}
          minZoomLevel={17}
          provider={MapView.PROVIDER_GOOGLE}
          onPanDrag={this._onRegionChange}
        >
          <Circle 
            center={jjuStarCenterCoords}
            radius={40}
            fillColor={'rgba(0,221,221,0.2)'}
            strokeColor={'rgba(0,0,0,0.2)'}
          />
          {this.renderMainMarker(true)}
        </MapView>
      )
    } else {
      return (
        <MapView 
          style={{ alignSelf: 'stretch', height: 200, backgroundColor: '#232377', marginTop: -10}} 
          initialRegion={jjuStarCenterCoords}
          region={this.state.topMapRegion}
          // initialCamera={this.state.camera}
          minZoomLevel={17}
          provider={MapView.PROVIDER_GOOGLE}
          onRegionChangeComplete={this._onRegionChange}
        >
          <Circle 
            center={jjuStarCenterCoords}
            radius={40}
            fillColor={'rgba(0,221,221,0.2)'}
            strokeColor={'rgba(0,0,0,0.2)'}
          />
          {this.renderMainMarker(true)}
        </MapView>
      )
    }
  }

  renderMap() {
    const { map } = this.state

    if (Platform.OS === 'ios') {
      return (
        <MapView 
          style={{ alignSelf: 'stretch', height: 400, backgroundColor: '#232377', marginLeft: -15, marginRight: -15 }} 
          region={map} 
          // initialCamera={this.state.camera}
          minZoomLevel={15}
          provider={MapView.PROVIDER_GOOGLE}
          ref={ref => this.map = ref}
          onPanDrag={this._onRegionChange}
        >
          {this.renderMainMarker()}
          {this.renderMarkers()}
        </MapView>
      )
    } else {
      return (
        <MapView 
          style={{ alignSelf: 'stretch', height: 400, backgroundColor: '#232377', marginLeft: -15, marginRight: -15 }} 
          initialRegion={map} 
          // initialCamera={this.state.camera}
          minZoomLevel={15}
          provider={MapView.PROVIDER_GOOGLE}
          ref={ref => this.map = ref}
          // onPanDrag={this._onRegionChange}
        >
          {this.renderMainMarker()}
          {this.renderMarkers()}
        </MapView>
      )
    }
  }

  renderMainMarker(starCenter = false) {
    const { map, mainMarker } = this.state
    return (
      <Marker
        identifier={starCenter ? jjuMarker.title : mainMarker.title}
        coordinate={starCenter ? jjuStarCenterCoords : map}
        anchor={{ x: 0.5, y: 0.5 }}
        title={starCenter ? jjuMarker.title : mainMarker.title}
        description={starCenter ? jjuMarker.description : mainMarker.description}
        pinColor={'#d63aff'}
        ref={ref => this.starCenterMarker = ref}
      >
        <Callout
          // onPress={() => this._goToPlace(place)}
        >
          <P dark>{starCenter ? jjuMarker.title : mainMarker.title}</P>
          <P dark note>{starCenter ? jjuMarker.description : mainMarker.description}</P>
          <P dark note style={{marginBottom: 0, paddingBottom: 0}}>{jjuMarker.address}</P>
        </Callout>
      </Marker>
    )
  }

  renderMarkers() {
    const { locations } = this.props

    return locations.data.map((place, i) => {
      if ( place.type === 'divider' || place.id === 'conference' ) return 
      if ( this.state.markerType === 'all' || place.type.toLowerCase() === this.state.markerType.toLowerCase() ) {
        return (
          <Marker
            key={i}
            identifier={place.id}
            title={place.title}
            description={place.description}
            coordinate={place.coordinate}
            pinColor={getPinColor(place.type)}
          >
            <Callout
              ref={_callout => this.callout = _callout}
              // onPress={() => this._changeHeart(place.id, place.title, this.callout)}
              onPress={() => this._goToPlace(place)}
            >
              {/* {this.props.likedPlaces.includes(place.id)
                ? <MaterialCommunityIcon name='heart' color={'coral'} size={16} style={styles.likeMe} />
                : <MaterialCommunityIcon name='heart-outline' color={'rgba(21,21,21,0.5)'} size={12} style={styles.likeMe} />
              } */}
              <PlaceLikeButton style={styles.likeMe} id={place.id} />
              <P dark>{place.title}</P>
              <P dark note>{place.description}</P>
              {place.address !== '' && <P dark note style={{marginBottom: 0, paddingBottom: 0}}>{place.address[0]}</P>}
              <P note style={{color: '#00dddd', marginTop: 0, marginBottom: 0, paddingTop: 0, paddingBottom: 0}}>Click card to view</P>
            </Callout>
          </Marker>
        )
      }
    })
  }

  renderMapButtons() {
    return (
      <View style={styles.mapMenu}>
        <View style={{flex: 1, justifyContent: 'space-around', flexDirection: 'row', flexWrap: 'wrap', marginBottom: 5, paddingTop: 10, paddingBottom: 10}}>
          <ContentButton color={'#232377'} 
            style={[{marginBottom: -5, paddingBottom: 0, borderRightWidth: 0, borderBottomWidth: 0,
              backgroundColor: this.state.markerArea.toLowerCase() === 'campus' ? appTeal30 : 'transparent',
            }]}
            onPress={() => this.setState({ map: jjuStarCenterCoords, mainMarker: jjuMarker, markerArea: 'campus' })} 
          >
            <View style={{flexDirection: 'column', alignItems: 'center'}}>
              <P center>Jeonju</P>
              <P center small>University</P>
            </View>
          </ContentButton>
          <ContentButton color={'#00dddd'} 
            style={[{marginBottom: -5, paddingBottom: 0, borderRightWidth: 0, borderBottomWidth: 0,
              backgroundColor: this.state.markerArea.toLowerCase() === 'shinsikaji' ? appTeal30 : 'transparent',
            }]}
            onPress={() => this.setState({ map: shinsikajiCoords, mainMarker: shinsikajiMarker, markerArea: 'shinsikaji' })} 
            >
            <View style={{flexDirection: 'column', alignItems: 'center'}}>
              <P center>Shinsikaji</P>
              <P center small>New Area</P>
            </View>
          </ContentButton>
          <ContentButton color={'#151537'} 
            style={[{marginBottom: -5, paddingBottom: 0, borderRightWidth: 0, borderBottomWidth: 0,
              backgroundColor: this.state.markerArea.toLowerCase() === 'gaeksa' ? appTeal30 : 'transparent',
            }]}
            onPress={() => this.setState({ map: gaeksaCoords, mainMarker: gaeksaMarker, markerArea: 'gaeksa' })} 
            >
            <View style={{flexDirection: 'column', alignItems: 'center'}}>
              <P center>Gaeksa</P>
              <P center small>Downtown</P>
            </View>
          </ContentButton>
          <ContentButton color={'#60f'} 
            style={[{marginBottom: -5, paddingBottom: 0, borderRightWidth: 0, borderBottomWidth: 0,
              backgroundColor: this.state.markerArea.toLowerCase() === 'hanok' ? appTeal30 : 'transparent',
            }]}
            onPress={() => this.setState({ map: hanokVillageCoords, mainMarker: hanokMarker, markerArea: 'hanok' })} 
            >
            <View style={{flexDirection: 'column', alignItems: 'center'}}>
              <P center>Hanok</P>
              <P center small>Village</P>
            </View>
          </ContentButton>
        </View>
        <View style={{flex: 1, 
          // marginLeft: -15, marginRight: -15, paddingLeft: 15, paddingRight: 15, 
          borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: appBlack, justifyContent: 'space-around', flexDirection: 'row', 
          marginBottom: Platform.OS === 'ios' ? 10 : 0}}>
          <SmallButton active={this.state.markerType} title={'All'} color={white} count={this.props.countAll} onPress={() => this.setState({ markerType: 'all' })} />
          <SmallButton active={this.state.markerType} title={'Café'} color={appTeal} count={this.props.countCafes} onPress={() => this.setState({ markerType: 'café' })} />
          <SmallButton active={this.state.markerType} title={'Food'} color={appPink} count={this.props.countFood} onPress={() => this.setState({ markerType: 'food' })} />
          <SmallButton active={this.state.markerType} title={'Drinks'} color={appOrange} count={this.props.countDrinks} onPress={() => this.setState({ markerType: 'drinks' })} />
          <SmallButton active={this.state.markerType} title={'Stay'} color={appBlue} count={this.props.countStay} onPress={() => this.setState({ markerType: 'stay' })} />
        </View>
      </View>
    )
  }

  render() {
    return (
      <AppScreen>
        <AppHeader 
          pageName='Location' 
          pageSub='Discover Jeonju'
          pageChild='My Places'
        />
        {!this.state.mapLoaded && <Loader />}
        {this.state.mapLoaded &&
          <ScreenContent style={{marginTop: 0}} noPadding>
            
            {this.renderTopMap()}

            <View style={{flex: 1, flexDirection: 'row', marginTop: 15, paddingLeft: 15, paddingRight: 15}}>
              <H2 dark center>Jeonju University</H2>
              <TouchableOpacity onPress={() => this._centerMap()}>
                <MaterialCommunityIcon name={'crosshairs-gps'} size={18} color={appPurple} style={{marginTop: 6, marginLeft: 8}} />
              </TouchableOpacity>
            </View>
            <View style={{paddingLeft: 15, paddingRight: 15}}>
              <P dark small>전라북도 전주시 완산구 천잠로 303 전주대학교 (55069)</P>
              {/* <Image resizeMode='contain' source={require('../../assets/img/star-center-map-doctored.jpg')} style={[styles.image, {height: 260}]} /> */}
              {/* <H2 dark center>Star Center</H2> */}
              <Image resizeMode='contain' source={require('../../assets/img/star-center-logo.jpg')} style={[styles.image, {height: 100}]} />
              <Image resizeMode='contain' source={require('../../assets/img/star-center-map.png')} style={[styles.image]} />
              <P dark>
                Jeonju University is located at the west end of Jeonju. From the bus terminal, 
                it will take approximately 15 minutes by taxi (a little more than ₩5,000) to arrive. 
                Star Center is located in the center the university, and is the largest building on campus. 
                It sits just in front of the large clock tower building, and has tennis courts below it.
              </P>
              <P dark>
                The Conference will take place on the 1st & 2nd floors of Star Center. You may enter 
                through one of three doors (see floor map below): 
              </P>
              <AppList
                data={[
                  {strong: "Floor B1: ", content: "Onnuri Hall auditorium entrance (in front of the clock tower)" },
                  {strong: "Floor 1: ", content: "Parking garage entrance" },
                  {strong: "Floor 2: ", content: "Food Court entrance (by the fountain)" }
                ]}
                type={'numbered'}
              />
            </View>
            <ScreenSection
              style={{
                borderTopColor: appTeal,
                borderBottomColor: appTeal,
                borderTopWidth: StyleSheet.hairlineWidth,
                borderBottomWidth: StyleSheet.hairlineWidth,
                marginTop: 20,
                marginBottom: 30,
                paddingLeft: 15, 
                paddingRight: 15
              }}
            >
              <H2 dark>Rooms</H2>
              <Image resizeMode='contain' source={require('../../assets/img/star-center-floors.png')} style={[styles.image, {height: 540}]} />
              <P dark>
                The Conference will feature six 50-minute workshops and two
                25-minute research presentations at a time, with the 
                Plenary and Highlighted sessions in Onnuri Hall (see below):
              </P>
              <AppList
                data={[
                  {strong: "Featured: ", content: "Onnuri Hall (Plenary @ 1:00)" },
                  {strong: "Motivation: ", content: "101" },
                  {strong: "Skills: ", content: "107" },
                  {strong: "Technology: ", content: "201" },
                  {strong: "Mixed: ", content: "204" },
                  {strong: "New: ", content: "202" },
                  {strong: "Research: ", content: "203 (2 sessions / hr)" }
                ]}
                type={'numbered'}
              />
              <ContentButton
                opaque
                title={'View Schedule'}
                onPress={() => this.props.navigation.navigate('Schedule')}
              />
            </ScreenSection>
            <View style={{paddingLeft: 15, paddingRight: 15}}>
              <H2 dark>Around Campus</H2>
              <P dark>
                As with most universities in Korea, Jeonju University's entrances are 
                surrounded with many different cafés and eateries. This page 
                highlights a few of these, but also points out the main areas in town where you might 
                find something tasty: 
              </P>
              <AppList
                type={'numbered'}
                data={[
                  "on and around JJU's campus",
                  "in the new area of town (Shinsikaji)",
                  "in Jeonju's downtown (Gaeksa)",
                  "in Hanok Village"
                ]}
              />
            </View>
            {this.renderMapButtons()}
            {this.renderMap()}
            <ScreenBottomPadding size={120} />
          </ScreenContent>
        }
      </AppScreen>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: width,
    height: width,
    alignSelf: 'center',
    marginBottom: 20
  },
  center: {
    width: 280, 
    height: 320
  },
  floorPlan: {
    width: 300,
    height: 520
  },
  map: {
    alignSelf: 'stretch',
    height: 300
  },
  mapMenu: {
    borderTopWidth: StyleSheet.hairlineWidth, 
    borderBottomWidth: StyleSheet.hairlineWidth, 
    borderTopColor: appBlack70,
    borderBottomColor: appBlack70,
    backgroundColor: purpler, 
    marginTop: 20,
    marginLeft: -15, 
    marginRight: -15, 
    paddingLeft: 15, 
    paddingRight: 15, 
    marginBottom: -10,
    shadowColor: black,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    elevation: 1,
  }, 
  callout: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.9)',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 10,
  },
  likeMe: {
    position: 'absolute',
    top: 3,
    right: 0
  }
})

const mapStateToProps = ({ locations, profile }) => {
  return { 
    locations,
    countAll: locations.data.filter(i => i.type !== 'divider').length,
    countCafes: locations.data.filter(i => i.type === 'café').length,
    countFood: locations.data.filter(i => i.type === 'food').length,
    countDrinks: locations.data.filter(i => i.type === 'drinks').length,
    countStay: locations.data.filter(i => i.type === 'stay').length,
    likedPlaces: profile.myPlaces
  }
}

export default connect(mapStateToProps, {likePlace, dislikePlace})(MapScreen)
