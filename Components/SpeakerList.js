import React, { Component } from 'react'
import { ScrollView, View, FlatList, SectionList, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { profileSave } from '../actions'

// import SpeakerCard from './SpeakerCard.old'
import SpeakerCardSmall from './SpeakerCardSmall'
import AppSearch from '../Components/shared/layout/AppSearch'
import Loader from '../Components/shared/Loader'
import AppText from './shared/text/AppText'
import H2 from './shared/text/H2'
import ScreenBottomPadding from './shared/layout/ScreenBottomPadding'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import NoContent from './NoContent'

const { width, height } = Dimensions.get('window')

class SpeakerList extends Component {
  state = {
    searchValue: '',
    speakerList: [],
    speakerSectionList: [],
    sectionClass: {height: 0},
    loading: false,
    hasData: this.props.speakers.length > 0
  }

  componentWillReceiveProps(nextProps) {
    // only create a new sectionList if filter / search turns up more than 0 results
    if ( nextProps.speakers.length > 0 ) {
      this.setState({ hasData: true })
    } else {
      this.setState({ hasData: false })
    }
    // if ( this.state.needsUpdate && this.props.profile.mySchedule !== nextProps.profile.mySchedule ) {
    //   this.props.profileSave(this.props.profile)
    //   this.setState({ needsUpdate: false })
    // }
  }

  // componentWillMount() {
  //   if ( this.props.schedule ) {
  //     this.setState({ 
  //       speakerSectionList: this._createSpeakerSections(this.props.speakers), 
  //       loading: false 
  //     })
  //   } else {
  //     this.setState({
  //       loading: false
  //     })
  //   }
  // }

  // _createSpeakerList(speakersPropsData) {
  //   let speakerArray = Object.keys(speakersPropsData).map(i => speakersPropsData[i])
  //   let speakerSections = []
    

  //   for ( var i = 0; i < speakerArray.length; i++ ) {
  //     let sectionObj = {}
  //   sectionObj.title = 'All Speakers'
  //     sectionObj.data = speakerArray[i] || []
  //     sectionObj.key = sectionObj.title
  //     speakerSections.push(sectionObj)
  //   }

  //   return speakerSections
  // }

  _createSpeakerSections(speakersPropsData) {
    let speakerData = this._groupByTime(speakersPropsData)
    let speakerArray = Object.keys(speakerData).map(i => speakerData[i])
    // console.log("Speaker Data: ", speakerData)
    // console.log("SpeakerArray: ", speakerArray)
    let speakerSections = []

    for ( var i = 0; i < speakerArray.length; i++ ) {
      let sectionObj = {}
      sectionObj.title = this._getTimeString(speakerArray[i][0].time)
      sectionObj.data = speakerArray[i] || []
      sectionObj.key = sectionObj.title
      speakerSections.push(sectionObj)
    }

    // Put the "All Day" stuff at the beginning of the schedule
    if ( 'All day' in speakerData ) {
      const allDay = speakerSections.pop()
      speakerSections.unshift(allDay)
    }

    return speakerSections
  }

  _groupByTime = (array) => 
    array.reduce((objectsByKeyValue, obj) => {
      const value = obj['time']
      objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj)
      return objectsByKeyValue
    }, {})

  _getTimeString(time) {
    switch (time) {
      case '09:00': return '9:00 (Registration)'
      case '10:00': return '10:00 - 10:50'
      case '11:00': return '11:00 - 11:50'
      case '12:00': return '12:00 (Lunch)'
      case '13:00': return '1:00 - 1:50'
      case '14:00': return '2:00 - 2:50'
      case '15:00': return '3:00 - 3:50'
      case '16:00': return '4:00 - 4:50'
      case '17:00': return '5:00 (Closing)'
      case '18:00': return 'After Party'
      default: return time
    }
  }

  // TODO: How can we expand / collapse Sections by clicking on the button?
  _expandSection = (section) => {
    if ( this.state.sectionClass === {height: 0} ) {
      this.setState({ sectionClass: {height: 'auto'}})
    } else {
      this.setState({ sectionClass: {height: 0}})
    }
  }

  // updateList() {
  //   this.setState({ needsUpdate: true })
  // }

  renderList() {
    const { speakers, screen } = this.props

    if ( !this.state.hasData ) {
      return <NoContent query name={'speakers'} />
    }

    return (
      <FlatList
        style={{zIndex: -1, elevation: 1}}
        data={speakers.sort((a,b) => {
          return a.lastname < b.lastname ? -1 : a.lastname > b.lastname ? 1 : 0
        })}
        extraData={this.state}
        renderItem={(speaker) => 
          <SpeakerCardSmall screen={screen} speaker={speaker} updateList={() => this.updateList()} filter={this.props.filter} expanded={this.props.speakersExpanded} />
        }
        keyExtractor={(speaker) => String(speaker.id)}
      />
    )
  }

  renderSchedule() {
    if ( !this.state.hasData ) {
      return <NoContent query name={'schedule'} />
    }

    return (
      <SectionList
        sections={this._createSpeakerSections(this.props.speakers)}
        renderItem={(speaker) => 
          <SpeakerCardSmall speaker={speaker} updateList={() => this.updateList()} filter={this.props.filter} expanded={this.props.scheduleExpanded} />
        }
        renderSectionHeader={({section}) => (
            <View style={styles.sectionBox}>
              <H2 style={styles.sectionTitle}>{section.title}</H2>
              {/* <TouchableOpacity style={styles.sectionButton} onPress={(section) => this._expandSection(section)}>
                <MaterialIcon name={'arrow-drop-up'} size={24} style={styles.sectionArrow} />
              </TouchableOpacity> */}
            </View>
          )
        }
        keyExtractor={item => item.id}
        updateList={this.updateList}
      />
    )
  }

  render() {
    const { loading } = this.state

    if ( loading ) {
      return <Loader />
    }

    return (
      <ScrollView style={{flex: 1, width: width, paddingTop: 10, zIndex: -1}}>
        { this.props.schedule ? 
          this.renderSchedule() :
          this.renderList()
        }
        <ScreenBottomPadding size={160} />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  sectionDivider: {
    width: '100%',
    height: 1,
    borderBottomWidth: 3,
    borderColor: '#232377'
  },
  sectionBox: {
    flexDirection: 'row', 
    justifyContent: 'center',
    marginLeft: 15
  },
  sectionArrow: {
    color: '#232377',
    opacity: 0.8,
    marginTop: 20
  },
  sectionTitle: {
    color: '#232377',
    backgroundColor: 'transparent',
    textAlign: 'center',
    paddingTop: 5,
    paddingBottom: 5,
    marginTop: 10,
    marginBottom: 0,
  }
})

const mapStateToProps = ({ app, profile }) => {
  return {
    speakersExpanded: app.speakersExpanded,
    scheduleExpanded: app.scheduleExpanded,
    profile
  }
}

export default connect(mapStateToProps, { profileSave })(SpeakerList)