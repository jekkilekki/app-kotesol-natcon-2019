import React, { Component } from 'react'
import { View, Image, StyleSheet, Dimensions, TouchableOpacity, Platform, Linking } from 'react-native'
import { MapView } from 'expo'
import { connect } from 'react-redux'

import AppHeader from '../shared/layout/AppHeader'
import Loader from '../shared/Loader'
import AppScreen from '../shared/layout/AppScreen'
import ScreenContent from '../shared/layout/ScreenContent'
import H2 from '../shared/text/H2'
import P from '../shared/text/P'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import SmallButton from '../shared/buttons/SmallButton'
import ContentButton from '../shared/buttons/ContentButton'
import ScreenBottomPadding from '../shared/layout/ScreenBottomPadding'
import AppList from '../shared/layout/AppList'
import PlaceLikeButton from '../PlaceLikeButton'

import { getPinColor } from '../../utils/helpers'
import { 
  appBlack, appOrange, appBlue, appPink, appPurple, appTeal,
  appBlack70, black, purpler, white, appTeal30
} from '../../utils/colors'
import ScreenSection from '../shared/layout/ScreenSection';

import { likePlace, dislikePlace } from '../../actions'
import { NavigationEvents } from 'react-navigation';

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
    mapRegion: jjuStarCenterCoords,
    mapLoaded: false,
    markerArea: 'Campus',
    markerType: 'all',
    mainMarker: jjuMarker,
  }

  componentDidMount() {
    if ( this.props.navigation.state.routeName === 'Map' ) {
      this.setState({ 
        mapLoaded: true, 
        topMapRegion: jjuStarCenterCoords,
        mapRegion: jjuStarCenterCoords
      })
    } else {
      this.setState({ 
        mapLoaded: false,
        topMapRegion: jjuStarCenterCoords,
        mapRegion: jjuStarCenterCoords 
      })
    }
  }

  /** View a Single Place Detail Screen */
  _goToPlace = (place) => {
    // Android is throwing an error when hitting the "Back" button 
    // if ( Platform.OS === 'ios' ) {
      console.log('Regular place', place)
      this.props.navigation.navigate( 'Place', { id: place.id, place })
    // }
  }

  /** Change the Top Map Region */
  _onTopRegionChange = async (region) => {
    await this.setState({ topMapRegion: region })
  }

  /** Change the Main Map Region */
  _onRegionChange = async (region) => {
    await this.setState({ mapRegion: region })
  }

  _centerMap = () => {
    // Setting the state is what really centers the map
    this.setState({
      region: jjuStarCenterCoords,
      topMapRegion: jjuStarCenterCoords
    })
    // Animate only works on iOS - Android throws an error 'longitude'
    // Maybe even remove this for Apple App review - possibly a problem?
    // if ( Platform.OS === 'ios' ) {
    //   this.topmap.animateToRegion({ jjuStarCenterCoords }, 1000)
    // } 
  }

  /**
   * Function to render the TOP MAP (Star Center and circle)
   */
  renderTopMap() {
    if (Platform.OS === 'ios') {
      return null
      // (
      //   <MapView 
      //     style={{ alignSelf: 'stretch', height: 200, backgroundColor: '#232377', marginTop: -10}} 
      //     region={this.state.topMapRegion}
      //     minZoomLevel={17}
      //     provider={MapView.PROVIDER_GOOGLE}
      //     onPanDrag={() => this._onTopRegionChange()} // iOS needs onPanDrag()
      //     ref={ref => this.topmap = ref}
      //   >
      //     <Circle 
      //       center={jjuStarCenterCoords}
      //       radius={40}
      //       fillColor={'rgba(0,221,221,0.2)'}
      //       strokeColor={'rgba(0,0,0,0.2)'}
      //     />
      //     {this.renderMainMarker(true)}
      //   </MapView>
      // )
    } else {
      return (
        <MapView 
          style={{ alignSelf: 'stretch', height: 200, backgroundColor: '#232377', marginTop: -10}} 
          initialRegion={jjuStarCenterCoords}
          region={this.state.topMapRegion}
          minZoomLevel={17}
          provider={MapView.PROVIDER_GOOGLE}
          onRegionChangeComplete={() => this._onTopRegionChange()} // Android needs onRegionChangeComplete()
          ref={ref => this.topmap = ref}
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

  /**
   * Function to render the MAIN MAP at the bottom of the screen - with all city locations
   */
  renderMap() {
    const { mapRegion } = this.state

    if (Platform.OS === 'ios') {
      return null
      // (
      //   <MapView 
      //     style={{ alignSelf: 'stretch', height: 400, backgroundColor: '#232377', marginLeft: -15, marginRight: -15 }} 
      //     region={mapRegion} 
      //     minZoomLevel={15}
      //     provider={MapView.PROVIDER_GOOGLE}
      //     ref={ref => this.map = ref}
      //     onPanDrag={() => this._onRegionChange()}
      //   >
      //     {this.renderMainMarker()}
      //     {this.renderMarkers()}
      //   </MapView>
      // )
    } 
    else {
      return (
        <MapView 
          style={{ alignSelf: 'stretch', height: 400, backgroundColor: '#232377', marginLeft: -15, marginRight: -15 }} 
          initialRegion={mapRegion} 
          region={mapRegion}
          minZoomLevel={15}
          provider={MapView.PROVIDER_GOOGLE}
          ref={ref => this.map = ref}
          onRegionChangeComplete={() => this._onRegionChange()}
        >
          {this.renderMainMarker()}
          {this.renderMarkers()}
        </MapView>
      )
    }
  }

  /**
   * Function to render the map's pink CENTER marker (based on default location coordinates)
   * @param {boolean} starCenter Whether or not this is the Star Center marker (at the top)
   */
  renderMainMarker(starCenter = false) {
    const { mapRegion, mainMarker } = this.state
    if ( starCenter ) {
      return (
        <Marker
          identifier={jjuMarker.title}
          coordinate={jjuStarCenterCoords}
          anchor={{ x: 0.5, y: 0.5 }}
          title={jjuMarker.title}
          description={jjuMarker.description}
          pinColor={'#d63aff'}
          ref={ref => this.starCenterMarker = ref}
        >
          <Callout>
            <P dark>{jjuMarker.title}</P>
            <P dark note>{jjuMarker.description}</P>
            <P dark note style={{marginBottom: 0, paddingBottom: 0}}>{jjuMarker.address}</P>
          </Callout>
        </Marker>
      )
    } else {
      return (
        <Marker
          identifier={mainMarker.title}
          coordinate={mapRegion || jjuStarCenterCoords}
          anchor={{ x: 0.5, y: 0.5 }}
          title={mainMarker.title}
          description={mainMarker.description}
          pinColor={'#d63aff'}
          ref={ref => this.mainMarker = ref}
        >
          <Callout>
            <P dark>{mainMarker.title}</P>
            <P dark note>{mainMarker.description}</P>
          </Callout>
        </Marker>
      )
    }
  }

  /**
   * Function to render ALL MARKERS for the map
   */
  renderMarkers() {
    const { locations } = this.props

    return locations.data.map((place, i) => {
      // Don't render dummy location markers
      if ( place.type === 'divider' || place.id === 'conference' ) return 

      // Selectively render markers
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
              onPress={() => this._goToPlace(place)}
            >
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

  /**
   * Function to render Location specific centering buttons (Gaeksa, Hanok, etc)
   */
  renderMapButtons() {
    if (Platform.OS === 'ios') return null

    return (
      <View style={styles.mapMenu}>
        <View style={{flex: 1, width: width, maxWidth: 500, alignSelf: 'center', justifyContent: 'space-around', flexDirection: 'row', flexWrap: 'wrap', marginBottom: 5, paddingTop: 10, paddingBottom: 10}}>
          
          <ContentButton color={'#232377'} 
            style={[{marginBottom: -5, paddingBottom: 0, borderRightWidth: 0, borderBottomWidth: 0,
              backgroundColor: this.state.markerArea.toLowerCase() === 'campus' ? appTeal30 : 'transparent',
            }]}
            onPress={() => this.setState({ 
              mapRegion: jjuStarCenterCoords, 
              mainMarker: jjuMarker, 
              markerArea: 'campus' 
            })} 
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
            onPress={() => this.setState({ 
              mapRegion: shinsikajiCoords, 
              mainMarker: shinsikajiMarker, 
              markerArea: 'shinsikaji' 
            })} 
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
            onPress={() => this.setState({ 
              mapRegion: gaeksaCoords, 
              mainMarker: gaeksaMarker, 
              markerArea: 'gaeksa' 
            })} 
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
            onPress={() => this.setState({ 
              mapRegion: hanokVillageCoords, 
              mainMarker: hanokMarker, 
              markerArea: 'hanok' 
            })} 
            >
            <View style={{flexDirection: 'column', alignItems: 'center'}}>
              <P center>Hanok</P>
              <P center small>Village</P>
            </View>
          </ContentButton>
        </View>

        <View style={{borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: appBlack, height: 1, width: width}}></View>

        <View style={{flex: 1, width: width, maxWidth: 500, alignSelf: 'center',
          // marginLeft: -15, marginRight: -15, paddingLeft: 15, paddingRight: 15, 
          justifyContent: 'space-around', flexDirection: 'row', 
          marginBottom: Platform.OS === 'ios' ? 10 : 0}}>
          <SmallButton active={this.state.markerType} title={'All'} color={white} 
            count={this.props.countAll} 
            onPress={() => this.setState({ markerType: 'all' })} 
          />
          <SmallButton active={this.state.markerType} title={'Café'} color={appTeal} 
            count={this.props.countCafes} 
            onPress={() => this.setState({ markerType: 'café' })} 
          />
          <SmallButton active={this.state.markerType} title={'Food'} color={appPink} 
            count={this.props.countFood} 
            onPress={() => this.setState({ markerType: 'food' })} 
          />
          <SmallButton active={this.state.markerType} title={'Drinks'} color={appOrange} 
            count={this.props.countDrinks} 
            onPress={() => this.setState({ markerType: 'drinks' })} 
          />
          <SmallButton active={this.state.markerType} title={'Stay'} color={appBlue} 
            count={this.props.countStay} 
            onPress={() => this.setState({ markerType: 'stay' })} 
          />
        </View>
      </View>
    )
  }

  /**
   * MAIN RENDER METHOD
   */
  render() {
    return (
      <AppScreen>
        <AppHeader 
          pageName='Location' 
          pageSub='Discover Jeonju'
          pageChild='My Places'
        />

        <NavigationEvents
          // This SHOULD tell the app to load MapView when it comes to this screen, 
          // and NOT to when leaving this screen.
          // Should (hopefully) fix a memory leak in iOS - that might have caused this to crash
          onWillBlur={payload => { this.setState({ mapLoaded: false })}}
          onWillFocus={payload => { this.setState({ mapLoaded: true, topMapRegion: jjuStarCenterCoords, mapRegion: jjuStarCenterCoords })}}
        />

        <ScreenContent style={{marginTop: 0}} noPadding>

          {!this.state.mapLoaded && <Loader />}

          {this.state.mapLoaded &&

            <View>
              <View>
                {this.renderTopMap()}
              </View>
              
              <View style={{width: width, maxWidth: 500, alignSelf: 'center'}}>
                <View style={{flex: 1, flexDirection: 'row', marginTop: 15, paddingLeft: 15, paddingRight: 15}}>
                  <H2 dark center>Jeonju University</H2>
                  {Platform.OS !== 'ios' &&
                    <TouchableOpacity onPress={() => this._centerMap()}>
                      <MaterialCommunityIcon name={'crosshairs-gps'} size={18} color={appPurple} style={{marginTop: 6, marginLeft: 8}} />
                    </TouchableOpacity>
                  }
                </View>

                <View style={{paddingLeft: 15, paddingRight: 15}}>
                  <P dark small>전라북도 전주시 완산구 천잠로 303 전주대학교 (55069)</P>
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
              </View>
              <ScreenContent
                style={{
                  borderTopColor: appTeal,
                  borderBottomColor: appTeal,
                  borderTopWidth: StyleSheet.hairlineWidth,
                  borderBottomWidth: StyleSheet.hairlineWidth,
                  marginTop: 20,
                  marginBottom: 30,
                  paddingLeft: 15, 
                  paddingRight: 15,
                  paddingBottom: 40,
                  paddingTop: 30,
                  width: width, maxWidth: 500, alignSelf: 'center'
                }}
              >
                <View>
                  <H2 dark>Rooms</H2>
                  <Image resizeMode='contain' source={require('../../assets/img/star-center-floors.png')} style={[styles.image]} />
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
                </View>
              </ScreenContent>

              <View style={{paddingLeft: 15, paddingRight: 15, width: width, maxWidth: 500, alignSelf: 'center'}}>
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

              <View>
                {this.renderMapButtons()}
                {this.renderMap()}
                {Platform.OS === 'ios' &&
                  <View style={{width: width, maxWidth: 500, alignSelf: 'center'}}>
                    <ContentButton
                      opaque
                      title={'View Map Online'}
                      // onPress={() => Linking.openURL('http://kko.to/nGzTIq0jj')}
                      onPress={() => Linking.openURL('https://2019.conference.jnjkotesol.com/location')}
                    />
                  </View>
                }
              </View>

              <ScreenBottomPadding size={120} />
            </View>
          }
        </ScreenContent>
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
