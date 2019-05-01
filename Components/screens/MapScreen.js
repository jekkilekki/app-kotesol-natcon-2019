import React, { Component } from 'react'
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity, Button } from 'react-native'
import { MapView } from 'expo'
import { connect } from 'react-redux'

import AppHeader from '../shared/layout/AppHeader'
import Loader from '../shared/Loader'
import AppScreen from '../shared/layout/AppScreen'
import ScreenContent from '../shared/layout/ScreenContent'
import H2 from '../shared/text/H2'
import P from '../shared/text/P'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import Dropdown from '../shared/layout/Dropdown'
import SmallButton from '../shared/buttons/SmallButton'
import ContentButton from '../shared/buttons/ContentButton'

import { getPinColor } from '../../utils/helpers'
import { 
  appBlack, appDarkBlue, appOrange, appBlue, appPink, appPurple, appDarkPurple, appTeal,
  appBlack70, appDarkBlue70, appOrange70, appBlue70, appPink70, appPurple70, appDarkPurple70, appTeal70,
} from '../../utils/colors'

const { width } = Dimensions.get('window')
const Marker = MapView.Marker
const Circle = MapView.Circle

const jjuStarCenterCoords = {
  latitude: 35.814088,
  longitude: 127.088927,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
}
const jjuMarker = {
  title: 'Star Center',
  description: 'KOTESOL 2019 National Conference'
}
const shinsikajiCoords = {
  latitude: 35.817314,
  longitude: 127.109360,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
}
const shinsikajiMarker = {
  title: 'Shinsikaji',
  description: 'The New Downtown'
}
const gaeksaCoords = {
  latitude: 35.817700,
  longitude: 127.143968,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
}
const gaeksaMarker = {
  title: 'Gaeksa',
  description: 'The Old Downtown'
}
const hanokVillageCoords = {
  latitude: 35.814269,
  longitude: 127.151225,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
}
const hanokMarker = {
  title: 'Hanok Village',
  description: 'Tourism District'
}

class MapScreen extends Component {
  state = {
    map: jjuStarCenterCoords,
    mapLoaded: false,
    markerArea: 'Campus',
    markerType: 'café',
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

  renderMap() {
    const { map } = this.state

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
        // image={carImage}
      />
    )
  }

  renderMarkers() {
    const { locations } = this.props

    return locations.data.map((place, i) => {
      if ( place.type === 'divider' ) return 
      if ( this.state.markerType === 'all' || place.type.toLowerCase() === this.state.markerType.toLowerCase() ) {
        return (
          <Marker
            key={i}
            identifier={place.id}
            title={place.title}
            description={place.description}
            coordinate={place.coordinate}
            pinColor={getPinColor(place.type)}
          />
        )
      }
    })
  }

  renderMapButtons() {
    return (
      <View>
        <View style={{flex: 1, justifyContent: 'space-around', flexDirection: 'row', flexWrap: 'wrap', marginBottom: 10}}>
          <ContentButton title={'Jeonju University'} color={'#232377'} 
            onPress={() => this.setState({ map: jjuStarCenterCoords, mainMarker: jjuMarker })} 
          />
          <ContentButton title={'Shinsikaji (new downtown)'} color={'#00dddd'} 
            onPress={() => this.setState({ map: shinsikajiCoords, mainMarker: shinsikajiMarker })} 
          />
          <ContentButton title={'Gaeksa (downtown)'} color={'#151537'} 
            onPress={() => this.setState({ map: gaeksaCoords, mainMarker: gaeksaMarker })} 
          />
          <ContentButton title={'Hanok Village'} color={'#60f'} 
            onPress={() => this.setState({ map: hanokVillageCoords, mainMarker: hanokMarker })} 
          />
        </View>
        <View style={{flex: 1, justifyContent: 'space-around', flexDirection: 'row', marginBottom: 10}}>
          <SmallButton title={'All'} color={appDarkBlue70} onPress={() => this.setState({ markerType: 'all' })} />
          <SmallButton title={'Coffee'} color={appTeal70} onPress={() => this.setState({ markerType: 'café' })} />
          <SmallButton title={'Food'} color={appPink70} onPress={() => this.setState({ markerType: 'food' })} />
          <SmallButton title={'Drinks'} color={appBlue70} onPress={() => this.setState({ markerType: 'drinks' })} />
          <SmallButton title={'Stay'} color={appDarkPurple70} onPress={() => this.setState({ markerType: 'stay' })} />
        </View>
      </View>
    )
  }

  render() {
    if (!this.state.mapLoaded) {
      return (
        <AppScreen>
          <AppHeader 
            pageName='Location' 
            pageSub='Discover Jeonju'
          />
          <Loader />
        </AppScreen>
      )
    }
    return (
      <AppScreen>
        <AppHeader 
          pageName='Location' 
          pageSub='Discover Jeonju'
        />
        <ScreenContent>
        <MapView 
            style={{ alignSelf: 'stretch', height: 200, backgroundColor: '#232377', marginTop: -15, marginLeft: -15, marginRight: -15 }} 
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
          <View style={{flex: 1, flexDirection: 'row'}}>
            <H2 dark center>Jeonju University</H2>
            <TouchableOpacity onPress={() => this._centerMap()}>
              <MaterialCommunityIcon name={'crosshairs-gps'} size={18} />
            </TouchableOpacity>
          </View>
          <P dark small>(55069) 전라북도 전주시 완산구 천잠로 303 전주대학교</P>
          {/* <Image resizeMode='contain' source={require('../../assets/img/star-center-map-doctored.jpg')} style={[styles.image, {height: 260}]} /> */}
          {/* <H2 dark center>Star Center</H2> */}
          <Image resizeMode='contain' source={require('../../assets/img/star-center-logo.jpg')} style={[styles.image, {height: 100}]} />
          <Image resizeMode='contain' source={require('../../assets/img/star-center-map.png')} style={[styles.image]} />
          <P dark>
            Jeonju University is located at the west end of Jeonju. From the bus terminal, 
            it will take approximately 15 minutes by taxi (a little more than ₩5,000) to arrive there. 
            Star Center is located in the center the university, and is the largest building on campus. 
            It sits just in front of the large clock tower building, and has tennis courts below it.
          </P><P dark>
            The Conference will take place on the 1st & 2nd floors of Star Center. You may enter 
            through one of three doors: (1) Floor B1: Onnuri Hall auditorium entrance (in front of the clock tower), 
            (2) Floor 1: parking garage entrance, or (3) Floor 2: Food Court entrance (near the fountain).
          </P>
          <H2 dark>Rooms</H2>
          <Image resizeMode='contain' source={require('../../assets/img/star-center-floors.png')} style={[styles.image, {height: 540}]} />
          <P dark>
            The tallest building in the picture above is the Star Tower student dormitory 
            building. It is located over the Old Gate entrance road. The New Gate entrance 
            road is located to the left of the picture between the green golf netting and 
            cluster of white Engineering buildings there.
          </P>
          <H2 dark>Around Campus</H2>
          <P dark>
            As with most universities in Korea, Jeonju University's entrances are 
            surrounded with many different cafés and eateries ranging from Korean lunchboxes 
            (도시락), to sit-down BBQ places, to Western and international foods. This page 
            highlights only a few of these, but also points out the main areas where you might 
            find something tasty: (1) on campus, (2) the Old gate, (3) the New gate, (4) the 
            New development area (Shinsikaji).
          </P>
          {this.renderMapButtons()}
          {this.renderMap()}
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
  }
})

// const mapStyle = [
//   {
//     "elementType": "geometry",
//     "stylers": [
//       {
//         "color": "#1d2c4d"
//       }
//     ]
//   },
//   {
//     "elementType": "labels.text.fill",
//     "stylers": [
//       {
//         "color": "#8ec3b9"
//       }
//     ]
//   },
//   {
//     "elementType": "labels.text.stroke",
//     "stylers": [
//       {
//         "color": "#1a3646"
//       }
//     ]
//   },
//   {
//     "featureType": "administrative.country",
//     "elementType": "geometry.stroke",
//     "stylers": [
//       {
//         "color": "#4b6878"
//       }
//     ]
//   },
//   {
//     "featureType": "administrative.land_parcel",
//     "stylers": [
//       {
//         "visibility": "off"
//       }
//     ]
//   },
//   {
//     "featureType": "administrative.land_parcel",
//     "elementType": "labels.text.fill",
//     "stylers": [
//       {
//         "color": "#64779e"
//       }
//     ]
//   },
//   {
//     "featureType": "administrative.neighborhood",
//     "stylers": [
//       {
//         "visibility": "off"
//       }
//     ]
//   },
//   {
//     "featureType": "administrative.province",
//     "elementType": "geometry.stroke",
//     "stylers": [
//       {
//         "color": "#4b6878"
//       }
//     ]
//   },
//   {
//     "featureType": "landscape.man_made",
//     "elementType": "geometry.stroke",
//     "stylers": [
//       {
//         "color": "#334e87"
//       }
//     ]
//   },
//   {
//     "featureType": "landscape.natural",
//     "elementType": "geometry",
//     "stylers": [
//       {
//         "color": "#023e58"
//       }
//     ]
//   },
//   {
//     "featureType": "poi",
//     "elementType": "geometry",
//     "stylers": [
//       {
//         "color": "#283d6a"
//       }
//     ]
//   },
//   {
//     "featureType": "poi",
//     "elementType": "labels.text.fill",
//     "stylers": [
//       {
//         "color": "#6f9ba5"
//       }
//     ]
//   },
//   {
//     "featureType": "poi",
//     "elementType": "labels.text.stroke",
//     "stylers": [
//       {
//         "color": "#1d2c4d"
//       }
//     ]
//   },
//   {
//     "featureType": "poi.business",
//     "stylers": [
//       {
//         "visibility": "off"
//       }
//     ]
//   },
//   {
//     "featureType": "poi.park",
//     "elementType": "geometry.fill",
//     "stylers": [
//       {
//         "color": "#023e58"
//       }
//     ]
//   },
//   {
//     "featureType": "poi.park",
//     "elementType": "labels.text",
//     "stylers": [
//       {
//         "visibility": "off"
//       }
//     ]
//   },
//   {
//     "featureType": "poi.park",
//     "elementType": "labels.text.fill",
//     "stylers": [
//       {
//         "color": "#3C7680"
//       }
//     ]
//   },
//   {
//     "featureType": "road",
//     "elementType": "geometry",
//     "stylers": [
//       {
//         "color": "#304a7d"
//       }
//     ]
//   },
//   {
//     "featureType": "road",
//     "elementType": "labels",
//     "stylers": [
//       {
//         "visibility": "off"
//       }
//     ]
//   },
//   {
//     "featureType": "road",
//     "elementType": "labels.text.fill",
//     "stylers": [
//       {
//         "color": "#98a5be"
//       }
//     ]
//   },
//   {
//     "featureType": "road",
//     "elementType": "labels.text.stroke",
//     "stylers": [
//       {
//         "color": "#1d2c4d"
//       }
//     ]
//   },
//   {
//     "featureType": "road.highway",
//     "elementType": "geometry",
//     "stylers": [
//       {
//         "color": "#2c6675"
//       }
//     ]
//   },
//   {
//     "featureType": "road.highway",
//     "elementType": "geometry.stroke",
//     "stylers": [
//       {
//         "color": "#255763"
//       }
//     ]
//   },
//   {
//     "featureType": "road.highway",
//     "elementType": "labels.text.fill",
//     "stylers": [
//       {
//         "color": "#b0d5ce"
//       }
//     ]
//   },
//   {
//     "featureType": "road.highway",
//     "elementType": "labels.text.stroke",
//     "stylers": [
//       {
//         "color": "#023e58"
//       }
//     ]
//   },
//   {
//     "featureType": "transit",
//     "elementType": "labels.text.fill",
//     "stylers": [
//       {
//         "color": "#98a5be"
//       }
//     ]
//   },
//   {
//     "featureType": "transit",
//     "elementType": "labels.text.stroke",
//     "stylers": [
//       {
//         "color": "#1d2c4d"
//       }
//     ]
//   },
//   {
//     "featureType": "transit.line",
//     "elementType": "geometry.fill",
//     "stylers": [
//       {
//         "color": "#283d6a"
//       }
//     ]
//   },
//   {
//     "featureType": "transit.station",
//     "elementType": "geometry",
//     "stylers": [
//       {
//         "color": "#3a4762"
//       }
//     ]
//   },
//   {
//     "featureType": "water",
//     "elementType": "geometry",
//     "stylers": [
//       {
//         "color": "#0e1626"
//       }
//     ]
//   },
//   {
//     "featureType": "water",
//     "elementType": "labels.text",
//     "stylers": [
//       {
//         "visibility": "off"
//       }
//     ]
//   },
//   {
//     "featureType": "water",
//     "elementType": "labels.text.fill",
//     "stylers": [
//       {
//         "color": "#4e6d70"
//       }
//     ]
//   }
// ]

const mapStateToProps = ({ locations }) => {
  return { locations }
}

export default connect(mapStateToProps)(MapScreen)
