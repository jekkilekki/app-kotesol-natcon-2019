import React, { Component } from 'react'
import { View, Button, TouchableOpacity, StyleSheet } from 'react-native'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import AppText from '../text/AppText'

class Dropdown extends Component {
  state = {
    filterOpen: false
  }

  _openFilterMenu = () => {
    this.setState({ filterOpen: !this.state.filterOpen })
  }

  _filter(query) {
    this.props.onChange(query)
    this.setState({ filterOpen: false })
  }

  render() {
    const { list } = this.props 
    // Needs work - either sort the list here or in the AppSearch component before sending it here
    const sortedList = list.sort((a,b) => a - b)

    return (
      <View>
        <TouchableOpacity onPress={this._openFilterMenu}>
          <MaterialIcon style={styles.searchFilter} name='filter-list' size={24} color={'rgba(255,255,255,0.5)'} focused={'rgba(255,255,255,0.7)'} />
        </TouchableOpacity>
        {this.state.filterOpen &&
          <View style={styles.filterPicker}>
            <TouchableOpacity onPress={() => this._filter('all')}>
              <AppText style={styles.listItem}>View All</AppText>
            </TouchableOpacity>
            {sortedList.map((track, i) => 
              <TouchableOpacity key={i} onPress={() => this._filter(track)}>
                <AppText style={styles.listItem}>{track}</AppText>
              </TouchableOpacity>
            )}
          </View>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  searchFilter: {
    marginTop: 5
  },
  filterPicker: {
    position: 'absolute',
    backgroundColor: '#fff',
    borderColor: '#000',
    borderWidth: 1,
    right: 0,
    top: 44,
    width: 160,
    // height: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    // shadowRadius: 5,
    elevation: 1,
  },
  listItem: {
    color: '#232377',
    fontSize: 12,
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(21,21,21,0.3)'
  }
})

export default Dropdown