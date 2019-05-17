import React, { Component } from 'react'
import { View, FlatList, SectionList, ScrollView, Dimensions, StyleSheet } from 'react-native'
import AppText from './shared/text/AppText'
import { connect } from 'react-redux'

import PlaceCard from './PlaceCard'
import Loader from './shared/Loader'
import ScreenBottomPadding from './shared/layout/ScreenBottomPadding'
import H3 from './shared/text/H3'

const { width, height } = Dimensions.get('window')

class PlacesList extends Component {
  state = {
    placeSectionList: [],
    sectionClass: {height: 0},
    loading: false,
    hasData: this.props.places.length > 0
  }

  componentWillReceiveProps(nextProps) {
    // only create a new sectionList if filter / search turns up more than 0 results
    if ( nextProps.places.length > 0 ) {
      this.setState({ hasData: true })
    } else {
      this.setState({ hasData: false })
    }
  }

  // state = {
  //   attendeesLoaded: false
  // }

  // componentWillReceiveProps(nextProps) {
  //   if ( this.props.attendees !== nextProps.attendees && nextProps.attendees !== [] ) {
  //     this.setState({ attendeesLoaded: true })
  //   }
  // }

  _createPlaceSections(placesPropsData) {
    let placeData = this._groupByType(placesPropsData)
    let placeArray = Object.keys(placeData).map(i => placeData[i])
    // console.log("Place Data: ", speakerData)
    // console.log("PlaceArray: ", speakerArray)
    let placeSections = []

    for ( var i = 0; i < placeArray.length; i++ ) {
      let placeObj = {}
      placeObj.title = placeArray[i][0].type
      placeObj.data = placeArray[i] || []
      placeObj.key = placeObj.title
      placeSections.push(placeObj)
    }

    return placeSections
  }

  _groupByType = (array) => 
    array.reduce((objectsByKeyValue, obj) => {
      const value = obj['type']
      objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj)
      return objectsByKeyValue
    }, {})

  renderSectionsList() {
    if ( !this.state.hasData ) {
      return <NoContent query name={'places'} />
    }

    return (
      <SectionList
        sections={this._createPlaceSections(this.props.places)}
        renderItem={(place) => 
          <PlaceCard place={place} />
        }
        renderSectionHeader={({section}) => (
            <View style={{marginTop: 20}}>
              <H3 small dark style={{marginTop: 0, marginLeft: 15, paddingTop: 0}}>{section.title}</H3> 
              <View style={{borderTopColor: 'rgba(35,35,119,0.5)', borderTopWidth: StyleSheet.hairlineWidth }} />
            </View>
          )
        }
        keyExtractor={item => item.id}
        style={{marginTop: -20}}
        // updateList={this.updateList}
      />
    )
  }

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
        { this.renderSectionsList() }
        <ScreenBottomPadding size={200} />
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