import { combineReducers } from 'redux'

import * as roomReducers from './room-reducers'
import * as webrtcReducers from './webrtc-reducers'

export default combineReducers({
  ...roomReducers,
  ...webrtcReducers,
})
