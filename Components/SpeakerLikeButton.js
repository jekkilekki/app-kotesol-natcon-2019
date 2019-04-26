import React, { Component } from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { connect } from 'react-redux'
import { likeSpeaker, dislikeSpeaker } from '../actions'

class SpeakerLikeButton extends Component {
  // state = {
  //   heart: this.props.liked.includes(this.props.id)
  // }

  isLiked() {
    return this.props.liked.includes(this.props.id)
  }

  _changeHeart = () => {
    if ( this.isLiked() ) {
      this.props.dislikeSpeaker(this.props.id)
      // this.setState({ heart: 0 })
    } else {
      // alert(JSON.stringify(this.props.id))
      this.props.likeSpeaker(this.props.id)
      // this.setState({ heart: this.state.heart })
    }
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

const mapStateToProps = ({ profile }) => {
  return {
    liked: profile.mySchedule
  }
}

export default connect(mapStateToProps, { likeSpeaker, dislikeSpeaker })(SpeakerLikeButton)