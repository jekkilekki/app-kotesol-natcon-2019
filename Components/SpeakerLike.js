import React, { Component } from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'

class SpeakerLike extends Component {
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
    if ( this.state.heart === 2 ) {
      return <MaterialCommunityIcon name='heart-multiple' color={'red'} size={20} />
    } else if ( this.state.heart === 1 ) {
      return <MaterialCommunityIcon name='heart' color={'coral'} size={16} />
    } else {
      return <MaterialCommunityIcon name='heart-outline' color={'rgba(21,21,21,0.5)'} />
    }
  }

  render() {
    return (
      <TouchableOpacity style={styles.likeMe} onPress={() => this._changeHeart()}>
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

export default SpeakerLike