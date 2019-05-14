import React, { Component } from 'react'
import { View, FlatList, ScrollView, Dimensions } from 'react-native'
import AppText from './shared/text/AppText'
import { connect } from 'react-redux'

import PlaceCard from './PlaceCard'
import Loader from './shared/Loader'
import ScreenBottomPadding from './shared/layout/ScreenBottomPadding'

const { width, height } = Dimensions.get('window')

class PlacesList extends Component {
  // state = {
  //   attendeesLoaded: false
  // }

  // componentWillReceiveProps(nextProps) {
  //   if ( this.props.attendees !== nextProps.attendees && nextProps.attendees !== [] ) {
  //     this.setState({ attendeesLoaded: true })
  //   }
  // }

  renderList() {
    return (
      <FlatList
        data={this.props.places.sort((a,b) => {
          return a.title < b.title ? -1 : a.title > b.title ? 1 : 0
        })}
        renderItem={(place) => <PlaceCard place={place} />}
        keyExtractor={(place) => String(place.id)}
      />
    )
  }

  render() {
    return (
      <ScrollView style={{flex: 1, width: width, height: height, paddingTop: 10}}>
        { this.renderList() }
        <ScreenBottomPadding size={250} />
      </ScrollView>
    )
  }
}

const mapStateToProps = ({ locations, profile }) => {
  const placeArray = Object.keys(locations.data).map(i => locations.data[i])

  return { 
    places: placeArray.filter(i => profile.myPlaces.includes(i.id)), 
  }
}

export default connect(mapStateToProps)(PlacesList)