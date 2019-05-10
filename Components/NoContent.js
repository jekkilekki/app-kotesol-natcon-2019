import React from 'react'
import { ScrollView, View, FlatList, SectionList, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

// import SpeakerCard from './SpeakerCard.old'
import SpeakerCardSmall from './SpeakerCardSmall'
import AppSearch from '../Components/shared/layout/AppSearch'
import Loader from '../Components/shared/Loader'
import AppText from './shared/text/AppText'
import H2 from './shared/text/H2'
import ScreenBottomPadding from './shared/layout/ScreenBottomPadding'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

const { width, height } = Dimensions.get('window')

const NoContent = (props) => (
  <ScrollView style={{flex: 1, width: width, height: height, paddingTop: 10, paddingLeft: 15, paddingRight: 15}}>
    <H2 dark>No {props.name}</H2>
    <AppText dark>You haven't favorited any {props.name} yet.</AppText>
    <ScreenBottomPadding size={60} />
  </ScrollView>
)

export default NoContent