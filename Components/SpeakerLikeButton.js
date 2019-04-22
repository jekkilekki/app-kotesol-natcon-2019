import React, { Component } from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'

class SpeakerLikeButton extends Component {
  state = {
    heart: 0
  }

  _changeHeart = () => {
    if ( this.state.heart === 2 ) {
      this.setState({ heart: 0 })
    } else {
      this.setState({ heart: this.state.heart+1 })
    }
  }
  
  renderHeart() {
    const { large, color1, color2, color3 } = this.props

    if ( this.state.heart === 2 ) {
      return <MaterialCommunityIcon name='heart-multiple' color={color3 || 'red'} size={large ? 28 : 20} />
    } else if ( this.state.heart === 1 ) {
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

export default SpeakerLikeButton