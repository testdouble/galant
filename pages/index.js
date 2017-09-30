import SimpleWebRTC from 'simplewebrtc'
import React from 'react'

export default class Index extends React.Component {
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
