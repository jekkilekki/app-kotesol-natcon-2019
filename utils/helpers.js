import React from 'react'
import { Platform, Dimensions } from 'react-native'
import { appBlue, appBlue70 } from './colors'

const { width, height } = Dimensions.get('window')

export function generateUID() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
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
    case 'plenary': return '#151537'
    case 'highlighted': return '#232377'
    case 'motivation': return '#F597A8'
    case 'skills': return '#00b9f1'
    case 'technology': return '#ed0972'
    case 'mixed': return '#d63aff'
    case 'research': return '#60f'
    case 'poster': return '#00dddd'
    default: return '#232377' 
  }
}

export function getPinColor(pinType) {
  switch (pinType.toLowerCase()) {
    case 'drinks': return 'rgba(245,151,168,0.7)'
    case 'food': return '#ed0972'
    case 'stay': return appBlue
    case 'café': return '#00dddd'
    default: return '#232377' 
  }
}

/* TODO: Local Notifications */