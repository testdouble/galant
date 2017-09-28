import SimpleWebRTC from 'simplewebrtc'
import React from 'react'

export default class Index extends React.Component {
  componentDidMount () {
    var webrtc = new SimpleWebRTC({
      localVideoEl: this.refs.localVideo,
      remoteVideosEl: this.refs.remoteVideos,
      autoRequestMedia: true
    })

    webrtc.on('readyToCall', function () {
      webrtc.joinRoom('galant')

      setTimeout(() => {
        webrtc.leaveRoom()
        webrtc.joinRoom('galant2')
      }, 5000)
    })
  }

  render () {
    return (
      <div>
        <h1>Galant</h1>
        <video ref='localVideo' />
        <div ref='remoteVideos' />
      </div>
    )
  }
}
