import React, { Component } from 'react' 
import { View, Text, TextInput, StyleSheet, Dimensions, TouchableOpacity, Picker } from 'react-native'
import { connect } from 'react-redux'

import AppInput from '../AppInput'
import Dropdown from './Dropdown'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import { purpler } from '../../../utils/colors'
import { black } from 'ansi-colors';

const { width } = Dimensions.get('window')

class AppSearch extends Component {
  _filter(query) {
    this.props.filter(query)
  }

  render() {
    const { tracks } = this.props

    return (
      <View style={styles.searchStyle}>
        <TextInput 
          placeholder={'Search'}
          placeholderTextColor={'rgba(255,255,255,0.3)'}
          style={styles.searchInput}
          onChangeText={this.props.onChangeText}
        />
        <Dropdown list={tracks} onChange={(value) => this._filter(value)} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  searchStyle: {
    height: 35,
    backgroundColor: purpler,
    paddingLeft: 10,
    paddingRight: 10,
    // paddingTop: 5,
    paddingBottom: 5,
    flexDirection: 'row',
    zIndex: 10
  },
  searchInput: {
    fontFamily: 'nunito',
    color: '#fff',
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 6,
    paddingBottom: 5,
    marginBottom: 10,
    marginRight: 10,
    fontSize: 15,
    backgroundColor: '#232377',
    borderColor: 'rgba(0,221,221,0.3)',
    borderWidth: 1,
    borderRadius: 5,
    height: 26,
    width: width - 60
  },
})

const mapStateToProps = ({ speakers }) => {
  const speakerData = speakers.data
  const tracks = speakerData.map(speaker => speaker.track)
  const uniqueTracks = [...new Set(tracks)]
  const filteredList = uniqueTracks.filter((track) => track !== '')

  return { tracks: filteredList.sort((a,b) => 
    a.toLowerCase() < b.toLowerCase() ? -1 : 
    a.toLowerCase() > b.toLowerCase() ? 1 : 0 ) }
}

export default connect(mapStateToProps)(AppSearch)