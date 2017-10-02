import fetch from 'isomorphic-fetch'
import SimpleWebRTC from 'simplewebrtc'

import {
  addRoomType, joinRoomType, removeRoomType,
  connectVideoType, setLocalVideoElementType, setRemoteVideoContainerType,
  takeCloseUpType
} from './action-types'

export function addRoom (data) {
  return {
    type: addRoomType,
    result: data
  }
}

export function createRoom (roomName, userName, userImage) {
  roomName = `galant_${roomName}`

  return joinRoom(roomName, userName, userImage)
}

export function joinRoom (roomName, userName, userImage) {
  return dispatch => {
    return fetch(`/rooms/${roomName}/join`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: userName,
        image: userImage
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

export function connectVideo (connection) {
  return {
    type: connectVideoType,
    result: connection
  }
}

export function startVideo () {
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

export function setLocalVideoElement (element) {
  return {
    type: setLocalVideoElementType,
    result: element
  }
}

export function setRemoteVideoContainer (element) {
  return {
    type: setRemoteVideoContainerType,
    result: element
  }
}

export function takeCloseUp (userName, closeUp) {
  return dispatch => {
    dispatch({
      type: takeCloseUpType,
      result: closeUp
    })

    dispatch(joinRoom('galant_default', userName, closeUp))
  }
}
