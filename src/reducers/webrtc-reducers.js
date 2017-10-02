import { connectVideoType, setLocalVideoElementType, setRemoteVideoContainerType, joinRoomType } from '../actions/action-types'
import attachMediaStream from 'attachmediastream'

const DEFAULT_ROOM_STATE = {
  connection: null
}

function associateLocalVideo(simple, element) {
  simple.config.localVideoEl = element

  if (simple.webrtc.localStreams.length) {
    attachMediaStream(simple.webrtc.localStreams[0], simple.getLocalVideoContainer(), simple.config.localVideo)
  }
}

function associateRemoteVideo(simple, element) {
  simple.config.remoteVideosEl = element
}

function clearRemoteVideoContainer(simple) {
  const container = simple.getRemoteVideoContainer()
  if (container) {
    container.childNodes.forEach((child) => container.removeChild(child))
  }
}

export function webrtc (state = DEFAULT_ROOM_STATE, action) {
  const { type, result } = action

  console.log('WEBRTC:', type, result, state)

  switch (type) {
    case connectVideoType:
      state.connection = result
      window.connection = result
      return state
    case setLocalVideoElementType:
      associateLocalVideo(state.connection, result)
      return state
    case setRemoteVideoContainerType:
      associateRemoteVideo(state.connection, result)
      return state
    case joinRoomType:
      if (state.connection.sessionReady) {
        state.connection.leaveRoom()
        clearRemoteVideoContainer(state.connection)
        state.connection.joinRoom(result)
      }
      return state
  }

  return state
}
