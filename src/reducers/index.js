import { combineReducers } from 'redux'

import * as roomReducers from './room-reducers'

export default combineReducers({
  ...roomReducers
})
