import {
  addRoomType, createRoomType, joinRoomType, removeRoomType,
  addUserToRoomType, removeUserFromRoomType
} from '../actions/action-types'

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

    case addUserToRoomType:
      return {
        ...state,
        rooms: state.rooms.map((room) => {
          if (room.name === result.name) {
            room.users.push(result.user)
          }
          return room
        })
      }

    case removeUserFromRoomType:
      return {
        ...state,
        rooms: state.rooms.map((room) => {
          if (room.name === result.name) {
            room.users = room.users.filter((user) => user.name !== result.user.name)
          }
          return room
        })
      }

    default:
      return state
  }
}
