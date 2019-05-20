import React, { Component } from 'react' 
import { View, Text, TextInput, StyleSheet, Dimensions, TouchableOpacity, Picker, Platform } from 'react-native'
import { connect } from 'react-redux'

import AppInput from '../AppInput'
import Dropdown from './Dropdown'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { purpler } from '../../../utils/colors'
import { black } from 'ansi-colors';

const { width } = Dimensions.get('window')

class AppSearch extends Component {
  _filter(query) {
    this.props.filter(query)
  }

  _search(query) {
    this.props.onChangeText(query)
  }

  _expandCollapse = () => {
    this.props.expandCollapse()
  }

  _gridRow = () => {
    this.props.gridRow()
  }

  render() {
    const { tracks } = this.props

    return (
      <View style={styles.searchStyle}>
        <MaterialIcon name={'search'} size={18} style={styles.searchIcon} />
        <TextInput 
          placeholder={'Search'}
          placeholderTextColor={'rgba(255,255,255,0.3)'}
          style={[styles.searchInput, {width: width - 90}]}
          onChangeText={(value) => this._search(value)}
          value={this.props.inputValue}
        />
        {this.props.expanded 
          ? <TouchableOpacity onPress={() => this._expandCollapse()}>
              <MaterialCommunityIcon name={'arrow-collapse-vertical'} size={18} style={styles.expandCollapse} />
            </TouchableOpacity>
          : <TouchableOpacity onPress={() => this._expandCollapse()}>
              <MaterialCommunityIcon name={'arrow-expand-vertical'} size={18} style={styles.expandCollapse} />
            </TouchableOpacity>
        }
        {!this.props.schedule && this.props.display === 'grid' &&
          <TouchableOpacity onPress={() => this._gridRow()}>
            <MaterialCommunityIcon name={'table-of-contents'} size={18} style={styles.expandCollapse} />
          </TouchableOpacity>
        }
        {!this.props.schedule && this.props.display === 'row' &&
          <TouchableOpacity onPress={() => this._gridRow()}>
            <MaterialCommunityIcon name={'view-grid'} size={18} style={styles.expandCollapse} />
          </TouchableOpacity>
        }
        {Platform.OS !== 'android' && <Dropdown list={tracks} onChange={(value) => this._filter(value)} /> }
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
  expandCollapse: {
    color: 'rgba(255,255,255,0.5)',
    color: purpler,
    marginTop: 4,
    marginRight: 10
  },
  searchIcon: {
    color: 'rgba(255,255,255,0.3)',
    position: 'absolute',
    left: 15,
    top: 4,
    zIndex: 10
  },
  searchInput: {
    fontFamily: 'nunito',
    color: '#fff',
    paddingRight: 10,
    paddingLeft: 27,
    paddingTop: 6,
    paddingBottom: 5,
    marginBottom: 10,
    marginRight: 10,
    fontSize: 15,
    backgroundColor: '#232377',
    // borderColor: 'rgba(0,221,221,0.3)',
    // borderWidth: 1,
    borderRadius: 15,
    height: 26,
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