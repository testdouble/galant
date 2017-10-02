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

function mapDispatchToProps (dispatch) {
  return {
    setLocalVideoElement: (element) => dispatch(setLocalVideoElement(element)),
    setRemoteVideoContainer: (element) => dispatch(setRemoteVideoContainer(element))
  }
}

export default connect(() => ({}), mapDispatchToProps)(ActiveRoom)
