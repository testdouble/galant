import { combineReducers } from 'redux'

import * as roomReducers from './room-reducers'
import * as webrtcReducers from './webrtc-reducers'
import * as userReducers from './user-reducers'

export default combineReducers({
  ...roomReducers,
  ...userReducers,
  ...webrtcReducers
})
