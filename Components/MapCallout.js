import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { MapView } from 'expo'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { connect } from 'react-redux'
import { likePlace, dislikePlace } from '../actions'

import P from './shared/text/P'

const Callout = MapView.Callout

class MapCallout extends Component {
  isLiked() {
    return this.props.likedPlaces.includes(this.props.id)
  }

  _changeHeart = () => {
    const { likePlace, dislikePlace, id } = this.props 

    if ( this.isLiked() ) {
      dislikePlace(id)
    } else {
      likePlace(id)
    }
  }

  renderHeart() {
    if ( this.isLiked() ) {
      return <MaterialCommunityIcon name='heart' color={'coral'} size={16} style={styles.likeMe} />
    } else {
      return <MaterialCommunityIcon name='heart-outline' color={'rgba(21,21,21,0.5)'} size={12} style={styles.likeMe} />
    }
  }

  render() {
    const { location } = this.props

    return (
      <Callout
        onPress={() => alert('Pressed!')}
        tooltip={true}
        style={{flex: 1, backgroundColor: 'white'}}
      >
        {this.renderHeart()}
        <P dark>{location.title}</P>
        <P dark note>{location.description}</P>
        {location.address && <P dark note style={{marginBottom: 0, paddingBottom: 0}}>{location.address[0]}</P>}
      </Callout>
    )
  }
}

const styles = StyleSheet.create({
  likeMe: {
    position: 'absolute',
    top: 3,
    right: 0
  }
})

const mapStateToProps = ({ profile, app }) => {
  return {
    loggedIn: app.loggedIn,
    likedPlaces: profile.myPlaces,
    profile
  }
}

export default connect(mapStateToProps, { 
  likePlace, dislikePlace
})(MapCallout)