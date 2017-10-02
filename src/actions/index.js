import fetch from 'isomorphic-fetch'
import SimpleWebRTC from 'simplewebrtc'

import {
  addRoomType, joinRoomType, removeRoomType,
  addUserToRoomType, removeUserFromRoomType,
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
  return (dispatch, getState) => {
    const state = getState()
    roomName = roomName || state.rooms.activeRoomName
    userName = userName || state.users.name
    userImage = userImage || state.users.closeUp

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

        case 'rooms:users:added':
          dispatch(addUserToRoom(message.data))
          break

        case 'rooms:users:removed':
          dispatch(removeUserFromRoom(message.data))
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

export function addUserToRoom (data) {
  return {
    type: addUserToRoomType,
    result: data
  }
}

export function removeUserFromRoom (data) {
  return {
    type: removeUserFromRoomType,
    result: data
  }
}

export function connectVideo (connection) {
  return {
    type: connectVideoType,
    result: connection
  }
}

export function startVideo () {
  return (dispatch) => {
    const connection = new SimpleWebRTC({
      autoRequestMedia: true
    })

    dispatch(connectVideo(connection))

    connection.on('readyToCall', () => {
      console.log('SimpleWebRTC ready.')
      dispatch(joinRoom())
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

export function takeCloseUp (closeUp) {
  return dispatch => {
    dispatch({
      type: takeCloseUpType,
      result: closeUp
    })

    dispatch(joinRoom('galant_default', null, closeUp))
  }
}
