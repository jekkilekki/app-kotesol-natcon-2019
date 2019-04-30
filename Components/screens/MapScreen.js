import React, { Component } from 'react'
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity, Button } from 'react-native'
import { MapView } from 'expo'
import { connect } from 'react-redux'
// import MapboxGL from '@mapbox/react-native-mapbox-gl'
// import { mapboxToken } from '../../utils/_config'

import AppHeader from '../shared/layout/AppHeader'
import Loader from '../shared/Loader'
import AppScreen from '../shared/layout/AppScreen'
import ScreenContent from '../shared/layout/ScreenContent'
import H2 from '../shared/text/H2'
import mapStyle from '../../utils/mapStyle'
import P from '../shared/text/P';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'

const { width } = Dimensions.get('window')
const Marker = MapView.Marker

// MapboxGL.setAccessToken( mapboxToken )
const jjuStarCenterCoords = {
  latitude: 35.814088,
  longitude: 127.088927,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
}

class MapScreen extends Component {
  state = {
    mapLoaded: false,
    region: jjuStarCenterCoords,
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
  }

  _onRegionChange = (region) => {
    this.setState({ region })
    console.log(this.map.getCamera)
  }

  _centerMap = () => {
    this.setState({
      region: jjuStarCenterCoords
    })
    this.map.animateToRegion({ region: jjuStarCenterCoords, duration: 500 })
  }

  renderMarkers() {
    const { locations } = this.props
    console.log(locations)
    return this.props.locations.data.map((place, i) => (
      <Marker
        key={i}
        identifier={place.id}
        title={place.title}
        description={place.description}
        coordinate={place.coordinate}
        pinColor={'#232377'}
      />
    ))
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
            initialRegion={jjuStarCenterCoords} 
            // initialCamera={this.state.camera}
            minZoomLevel={17}
            provider={MapView.PROVIDER_GOOGLE}
            // customMapStyle={mapStyle}
            onRegionChange={this._onRegionChange}
            // mapType={'mutedStandard'}
          >
            <MapView.Marker
              identifier={'Star Center'}
              coordinate={jjuStarCenterCoords}
              anchor={{ x: 0.5, y: 0.5 }}
              title={'Star Center'}
              description={'KOTESOL 2019 National Conference'}
              pinColor={'#d63aff'}
              // image={carImage}
            />
          </MapView>
          {/* <MapboxGL.MapView
            ref={c => this._map = c}
            style={{flex: 1}}
            zoomLevel={15}
            centerCoordinate={jjuStarCenterCoords}
          ></MapboxGL.MapView> */}
          <H2 dark center>Jeonju University</H2>
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
          <TouchableOpacity onPress={() => this._centerMap()}>
            <MaterialCommunityIcon name={'crosshairs-gps'} size={18} />
          </TouchableOpacity>
          <P dark>
            As with most universities in Korea, Jeonju University's entrances are 
            surrounded with many different cafés and eateries ranging from Korean lunchboxes 
            (도시락), to sit-down BBQ places, to Western and international foods. This page 
            highlights only a few of these, but also points out the main areas where you might 
            find something tasty: (1) on campus, (2) the Old gate, (3) the New gate, (4) the 
            New development area (Shinsikaji).
          </P>
          <View style={{flex: 1, justifyContent: 'space-between'}}>
            <Button title={'Campus'} />
            <Button title={'Old gate'} />
            <Button title={'New gate'} />
            <Button title={'Shinsikaji'} />
          </View>
          <MapView 
            style={{ alignSelf: 'stretch', height: 300, backgroundColor: '#232377', marginLeft: -15, marginRight: -15 }} 
            initialRegion={jjuStarCenterCoords} 
            // initialCamera={this.state.camera}
            minZoomLevel={15}
            provider={MapView.PROVIDER_GOOGLE}
            ref={map => this.map = map}
            // customMapStyle={mapStyle}
            onRegionChange={this._onRegionChange}
            // mapType={'mutedStandard'}
          >
            <MapView.Marker
              identifier={'Star Center'}
              coordinate={jjuStarCenterCoords}
              anchor={{ x: 0.5, y: 0.5 }}
              title={'Star Center'}
              description={'KOTESOL 2019 National Conference'}
              pinColor={'#d63aff'}
              // image={carImage}
            />
            {this.renderMarkers()}
          </MapView>
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
