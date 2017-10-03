import React from 'react'
import { connect } from 'react-redux'

import { setLocalVideoElement, setRemoteVideoContainer } from '../actions'

class ActiveRoom extends React.Component {
  componentDidMount () {
    this.props.setLocalVideoElement(this.refs.localVideo)
    this.props.setRemoteVideoContainer(this.refs.remoteVideos)
  }

  render () {
    return (
      <div className='room room--active'>
        <video ref='localVideo' />
        <div className="room__remote" ref='remoteVideos' />
        <style jsx>{`
          .room {
            border-radius: 0.3rem;
            margin: 1rem;
            min-height: 24px;
            padding: 0.5rem;
          }

          .room--active {
            background: #F14F54;
          }

          .room__remote {
            display: inline;
          }
        `}</style>
        <style>{`
          video {
            height: 20rem;
            display: inline;
            margin: 0.5rem;
          }
        `}</style>
      </div>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return {
    setLocalVideoElement: (element) => dispatch(setLocalVideoElement(element)),
    setRemoteVideoContainer: (element) => dispatch(setRemoteVideoContainer(element))
  }
}

export default connect(() => ({}), mapDispatchToProps)(ActiveRoom)
