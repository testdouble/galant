import { takeCloseUpType } from '../actions/action-types'

const DEFAULT_USER_STATE = {
  closeUp: null
}

export function users (state = DEFAULT_USER_STATE, action) {
  const { type, result } = action

  switch (type) {
    case takeCloseUpType:
      return {
        ...state,
        closeUp: result
      }

    default:
      return state
  }
}
