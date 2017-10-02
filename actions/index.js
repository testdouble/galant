import fetch from 'isomorphic-fetch'

import { addRoomType, createRoomType, joinRoomType, removeRoomType } from './action-types'

export function addRoom (data) {
  return {
    type: addRoomType,
    result: data
  }
}

export function createRoom (roomName) {
  roomName = `galant_${roomName}`

  return joinRoom(roomName)
}

export function joinRoom (roomName) {
  return dispatch => {
    return fetch(`/rooms/${roomName}/join`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: 'Some name',
        image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=='
      })
    })
      .then(() => dispatch({
        type: joinRoomType,
        result: roomName
      }))
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
