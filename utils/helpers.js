import React from 'react'
import { Platform, Dimensions } from 'react-native'

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

export function getTrackColor(track) {
  switch (track.toLowerCase()) {
    case 'plenary': return '#232377'
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

/* TODO: Local Notifications */