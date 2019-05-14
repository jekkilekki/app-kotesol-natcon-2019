import React, { Component } from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { connect } from 'react-redux'
import { 
  likeSpeaker, dislikeSpeaker,
  likeFriend, dislikeFriend,
} from '../actions'

class SpeakerLikeButton extends Component {
  updateList() {
    console.log('SpeakerLikeButton')
    this.props.updateList()
  }

  isLiked() {
    return this.props.liked.includes(this.props.id) 
      || this.props.friends.includes(this.props.uid)
  }

  _changeHeart = () => {
    const { 
      likeSpeaker, dislikeSpeaker, 
      likeFriend, dislikeFriend, profile, id 
    } = this.props 

    if ( this.props.buttonId === 'friends' ) {
      if ( this.isLiked() ) {
        dislikeFriend(id)
      } else {
        likeFriend(id)
      }
    } else {
      if ( this.isLiked() ) {
        dislikeSpeaker(id)
      } else {
        likeSpeaker(id)
      }
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
    liked: profile.mySchedule,
    friends: profile.myFriends,
    profile
  }
}

export default connect(mapStateToProps, { 
  likeSpeaker, dislikeSpeaker,
  likeFriend, dislikeFriend,
})(SpeakerLikeButton)