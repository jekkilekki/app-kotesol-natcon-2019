/* Get (local) data */
import { speakers, _getSpeakers, _saveToSchedule } from './_DATA.js'

export function getInitialData() {
  return Promise.all([
    _getSpeakers(),
  ]).then(([speakers]) => ({
    speakers
  }))
}

/* TODO: Async Storage stuff */