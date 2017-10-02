import SimpleWebRTC from 'simplewebrtc'
import React from 'react'
import fetch from 'isomorphic-fetch'

export default class Index extends React.Component {
  constructor () {
    super()
    this.state = {
      rooms: []
    }
  }

  componentDidMount () {
    var webrtc = new SimpleWebRTC({
      localVideoEl: this.refs.localVideo,
      remoteVideosEl: this.refs.remoteVideos,
      autoRequestMedia: true,
      url: 'https://138.68.225.235:8888'
    })

    webrtc.on('readyToCall', function () {
      webrtc.joinRoom('galant')
    })

    var websocket = new window.WebSocket('ws://' + window.location.host)

    websocket.addEventListener('message', (event) => {
      const data = JSON.parse(event.data)

      console.log('WS message:', event)

      this.handleRemoteEvent(data.type, data)
    })
  }

  handleRemoteEvent (type, data) {
    switch (type) {
      case 'hello':
        break
      case 'rooms:created':
        this.state.rooms.push(data)
        this.setState({ rooms: this.state.rooms })
        break
      case 'rooms:deleted':
        this.state.rooms = this.state.rooms.filter((room) => room.name !== data.name)
        this.setState({ rooms: this.state.rooms })
        break
    }
  }

  createRoom () {
    fetch('/rooms/' + Math.random().toString().slice(2), {
      method: 'PUT'
    })
  }

  render () {
    return (
      <div>
        <h1>Galant</h1>
        <p>Rooms: {JSON.stringify(this.state.rooms)}</p>
        <button onClick={() => this.createRoom()}>Create</button>
        <video ref='localVideo' />
        <div ref='remoteVideos' />
      </div>
    )
  }
}
