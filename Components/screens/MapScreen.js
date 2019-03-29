import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { MapView } from 'expo'

import Header from '../shared/layout/AppHeader'
import Loader from '../shared/Loader'
import AppScreen from '../shared/layout/AppScreen'

class MapScreen extends Component {
  state = {
    mapLoaded: false,
    region: {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }
  }

  componentDidMount() {
    // this.setState({ mapLoaded: true })
  }

  render() {
    if (!this.state.mapLoaded) {
      return (
        <AppScreen>
          <Header 
            pageName='Location' 
            pageSub='Discover Jeonju'
          />
          <Loader />
        </AppScreen>
      )
    }
    return (
      <AppScreen>
        <Header pageName='Location' />
        <MapView style={{flex: 1}}
          initialRegion={this.state.region}
        />
      </AppScreen>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default MapScreen