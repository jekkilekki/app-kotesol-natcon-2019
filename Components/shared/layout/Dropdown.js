import React, { Component } from 'react'
import { View, Button, TouchableOpacity, StyleSheet } from 'react-native'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import AppText from '../text/AppText'
import P from '../text/P';
import { appGrey70, appGrey30 } from '../../../utils/colors';

class Dropdown extends Component {
  state = {
    filterOpen: false
  }

  _openFilterMenu = () => {
    // alert(this.props.list)
    this.setState({ filterOpen: !this.state.filterOpen })
  }

  _filter(query) {
    this.props.onChange(query)
    this.setState({ filterOpen: false })
  }

  render() {
    const { list, title } = this.props 

    return (
      <View style={{zIndex: 10, elevation: 10}}>
        <TouchableOpacity onPress={this._openFilterMenu}>
          {title 
            ? <P dark small>{title}</P>
            : <MaterialIcon style={styles.searchFilter} name='filter-list' size={24} color={'rgba(255,255,255,0.5)'} focused={'rgba(255,255,255,0.7)'} />
          }
        </TouchableOpacity>
        {this.state.filterOpen &&
          <View style={styles.filterPicker}>
            <TouchableOpacity onPressIn={() => this._filter('all')}>
              <AppText style={styles.listItem}>View All</AppText>
            </TouchableOpacity>
            {list.map((track, i) => 
              <TouchableOpacity key={i} onPressIn={() => this._filter(track)}>
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
    // marginTop: 5
  },
  filterPicker: {
    position: 'absolute',
    backgroundColor: 'rgba(239, 242, 245, 1)',
    borderColor: 'rgba(35, 35, 119, 0.3)',
    borderWidth: StyleSheet.hairlineWidth,
    right: 0,
    top: 34,
    width: 100,
    // height: 100,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
    zIndex: 10
  },
  listItem: {
    color: '#232377',
    fontSize: 12,
    padding: 5,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: appGrey30
  }
})

export default Dropdown