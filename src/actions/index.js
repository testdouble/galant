import fetch from 'isomorphic-fetch'
import SimpleWebRTC from 'simplewebrtc'

import {
  addRoomType, joinRoomType, removeRoomType,
  connectVideoType, setLocalVideoElementType, setRemoteVideoContainerType
} from './action-types'

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
      const message = JSON.parse(event.data)

      console.log('WS message:', event.data)

      switch (message.type) {
        case 'hello':
          break

        case 'rooms:created':
          dispatch(addRoom(message.data))
          break

        case 'rooms:removed':
          dispatch(removeRoom(message.data.name))
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

export function connectVideo(connection) {
  return {
    type: connectVideoType,
    result: connection
  }
}

export function startVideo() {
  return (dispatch, getState) => {
    const connection = new SimpleWebRTC({
      autoRequestMedia: true
    })

    dispatch(connectVideo(connection))

    connection.on('readyToCall', () => {
      console.log('SimpleWebRTC ready.')
      dispatch(joinRoom(getState().rooms.activeRoomName))
    })
  }
}

export function setLocalVideoElement(element) {
  return {
    type: setLocalVideoElementType,
    result: element
  }
}

export function setRemoteVideoContainer(element) {
  return {
    type: setRemoteVideoContainerType,
    result: element
  }
}
