import fetch from 'isomorphic-fetch'

import { addRoomType, createRoomType, joinRoomType, removeRoomType } from './action-types'

export function addRoom (data) {
  return {
    type: addRoomType,
    result: data
  }
}

export function createRoom (roomName) {
  return dispatch => {
    return fetch(`/rooms/galant_${roomName}`, {
      method: 'PUT'
    })
      .then(() => dispatch({
        type: createRoomType,
        result: `galant_${roomName}`
      }))
  }
}

export function joinRoom (roomName) {
  return {
    type: joinRoomType,
    result: roomName
  }
}

export function listen (wsURL) {
  return dispatch => {
    const websocket = new window.WebSocket(`ws://${wsURL}`)

    websocket.addEventListener('message', (event) => {
      const data = JSON.parse(event.data)

      switch (data.type) {
        case 'hello':
          break

        case 'rooms:created':
          dispatch(addRoom(data))
          break

        case 'rooms:removed':
          dispatch(removeRoom(data.name))
          break
      }
    })
  }
}

export function removeRoom (roomName) {
  return {
    type: removeRoomType,
    result: roomName
  }
}
