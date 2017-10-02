import React from 'react'
import SimpleWebRTC from 'simplewebrtc'

export default class ActiveRoom extends React.Component {
  componentDidMount () {
    var webrtc = new SimpleWebRTC({
      localVideoEl: this.refs.localVideo,
      remoteVideosEl: this.refs.remoteVideos,
      autoRequestMedia: true
    })

    webrtc.on('readyToCall', () => {
      console.log('RTC join:', this.props.room.name)
      webrtc.joinRoom(this.props.room.name)
    })
  }

  render () {
    return (
      <div className='room room--active'>
        <video ref='localVideo' />
        <div ref='remoteVideos' />
        <p>{this.props.room.name}</p>
        <style jsx>{`
          .room {
            background: #c0c0c0;
            margin: 1rem;
            min-height: 24px;
            width: 100%;
          }

          .room--active {
            background: #a0c0a0;
          }
        `}</style>
      </div>
    )
  }
}
