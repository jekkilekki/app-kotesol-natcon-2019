import React, { Component } from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { connect } from 'react-redux'
import { likePlace, dislikePlace } from '../actions'

class PlaceLikeButton extends Component {
  updateList() {
    // console.log('SpeakerLikeButton')
    this.props.updateList()
  }

  isLiked() {
    return this.props.places.includes(this.props.id) 
  }

  _changeHeart = () => {
    const { likePlace, dislikePlace, profile, id } = this.props 

    if ( this.isLiked() ) {
      dislikePlace(id)
    } else {
      likePlace(id)
    }

    // this.updateList()
  }
  
  renderHeart() {
    const { large, color1, color2, color3, liked } = this.props

    // if ( this.state.heart === 2 ) {
    //   return <MaterialCommunityIcon name='heart-multiple' color={color3 || 'red'} size={large ? 28 : 20} />
    // } else if ( this.state.heart === 1 ) {
    //   return <MaterialCommunityIcon name='heart' color={color2 || 'coral'} size={large ? 24 : 16} />
    // } else {
    //   return <MaterialCommunityIcon name='heart-outline' color={color1 || 'rgba(21,21,21,0.5)'} size={large ? 20 : 12 } />
    // }

    if ( this.isLiked() ) {
      return <MaterialCommunityIcon name='heart' color={color2 || 'coral'} size={large ? 24 : 16} />
    } else {
      return <MaterialCommunityIcon name='heart-outline' color={color1 || 'rgba(21,21,21,0.5)'} size={large ? 20 : 12 } />
    }
  }

  render() {
    if ( !this.props.loggedIn ) return null
    return (
      <TouchableOpacity style={[styles.likeMe, this.props.style]} onPress={() => this._changeHeart()}>
        {this.renderHeart()}
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  likeMe: {
    position: 'absolute',
    bottom: 0,
    right: 0
  }
})

const mapStateToProps = ({ profile, app }) => {
  return {
    loggedIn: app.loggedIn,
    places: profile.myPlaces,
    profile
  }
}

export default connect(mapStateToProps, { 
  likePlace, dislikePlace
})(PlaceLikeButton)