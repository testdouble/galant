import { addRoomType, createRoomType, joinRoomType, removeRoomType } from '../actions/action-types'

const DEFAULT_ROOM_STATE = {
  activeRoomName: null,
  rooms: []
}

export function rooms (state = DEFAULT_ROOM_STATE, action) {
  const { type, result } = action

  switch (type) {
    case addRoomType:
      return {
        ...state,
        rooms: [
          ...state.rooms,
          result
        ]
      }

    case createRoomType:
    case joinRoomType:
      return {
        ...state,
        activeRoomName: result
      }

    case removeRoomType:
      return {
        ...state,
        rooms: state.rooms.filter(room => room.name !== result)
      }

    default:
      return state
  }
}
