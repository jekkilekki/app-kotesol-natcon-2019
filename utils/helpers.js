import React from 'react'
import { Platform, Dimensions } from 'react-native'
import { appBlue, appBlue70, appBlack, appDarkBlue, appPink, appPurple, appDarkPurple, appTeal, appOrange } from './colors'

const { width, height } = Dimensions.get('window')

export function generateUID() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export function generateImgID() {
  return Math.random().toString(36).substring(2, 5) + Math.random().toString(36).substring(2, 5)
}

export function timeToString( time = Date.now() ) {
  const date = new Date(time)
  const todayUTC = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
  return todayUTC.toISOString().split('T')[0]
}

export function isIphoneX() {
  return Platform.OS === 'ios' 
    && !Platform.isPad && !Platform.isTVOS && (height === 812 || width === 812)
}

export function getTime(time) {
  switch(time) {
    case '10:00': return '10:00am'
    case '11:00': return '11:00am'
    case '12:00': return '12:00pm'
    case '13:00': return '1:00pm'
    case '14:00': return '2:00pm'
    case '15:00': return '3:00pm'
    case '16:00': return '4:00pm'
    case '17:00': return '5:00pm'
    default: return time
  }
}

export function getTrackColor(track) {
  switch (track.toLowerCase()) {
    case 'plenary': return appBlack
    case 'onnuri': return appBlack
    case 'highlighted': return appDarkBlue
    case 'motivation': return appOrange
    case 'skills': return appBlue
    case 'technology': return appPink
    case 'mixed': return appPurple
    case 'research': return appDarkPurple
    case 'poster': return appTeal
    default: return appDarkBlue 
  }
}

export function getPinColor(pinType) {
  switch (pinType.toLowerCase()) {
    case 'drinks': return appOrange
    case 'food': return appPink
    case 'stay': return appBlue
    case 'café': return appTeal
    default: return appPurple 
  }
}

/* TODO: Local Notifications */