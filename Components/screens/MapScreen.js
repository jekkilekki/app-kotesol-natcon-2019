import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { MapView } from 'expo'

import Loader from '../shared/Loader'

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
    this.setState({ mapLoaded: true })
  }

  render() {
    if (!this.state.mapLoaded) {
      return <Loader />
    }
    return (
      <View style={styles.container}>
        <MapView style={{flex: 1}}
          initialRegion={this.state.region}
        />
      </View>
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