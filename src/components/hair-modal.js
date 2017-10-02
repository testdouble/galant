import React from 'react'
import { connect } from 'react-redux'

import { setLocalVideoElement } from '../actions'

class HairModal extends React.Component {
  constructor () {
    super()

    this.handleMirrorRef = this.handleMirrorRef.bind(this)
    this.takeCloseUp = this.takeCloseUp.bind(this)
  }

  componentDidMount () {
    this.props.setLocalVideoElement(this.mirror)
  }

  handleMirrorRef (ref) {
    if (ref) {
      this.mirror = ref
    } else {
      delete this.mirror
    }
  }

  takeCloseUp () {
    const canvas = document.createElement('canvas')
    canvas.setAttribute('height', 96)
    canvas.setAttribute('width', 128)

    const context = canvas.getContext('2d')
    context.drawImage(this.mirror, 0, 0, 128, 96)

    this.props.onCloseUp(canvas.toDataURL())
  }

  render () {
    return (
      <div className='modal modal--hair'>
        <div className='modal__content'>
          <video className='modal__video' autoPlay ref={this.handleMirrorRef} />
          <div className={`modal__text ${this.props.hasLocalVideoStream ? 'modal__text--streaming' : ''}`}>
            <h1 className='modal__title'>Check your hair! Check your makeup!</h1>
            <button className='modal__close-up-button' onClick={this.takeCloseUp}>Take My Close-Up</button>
          </div>
        </div>
        <style jsx>{`
          .modal {
            background: rgba(0,0,0,0.3);
            position: absolute;
            top: 0;
            left: 0;
            height: 100vh;
            width: 100vw;
            z-index: 1;
          }

          .modal__close-up-button {
            background: #FFFFFF;
            border: 1px solid #FFFFFF;
            border-radius: 4px;
            color: #F14F54;
            cursor: pointer;
            font: 200 20px 'Raleway';
            padding: 8px 16px;
            transition: box-shadow 0.1s;
          }

          .modal__text {
            margin-top: -480px;
            transition: margin-top 0.2s;
          }

          .modal__text--streaming {
            margin-top: 0;
          }

          .modal__close-up-button:hover {
            box-shadow: rgba(0,0,0,0.8) 0px 0px 10px;
          }

          .modal__title {
            font: 400 48px 'Amatic SC';
            margin: 12px 0;
          }

          .modal__content {
            background: #F14F54;
            border-radius: 4px;
            box-shadow: rgba(0,0,0,0.8) 0px 0px 10px;
            color: #FFFFFF;
            position: absolute;
            padding: 24px;
            top: 50%;
            left: 50%;
            text-align: center;
            transform: translate(-50%, -50%);
          }

          .modal__video {
            height: 480px;
            width: 640px;
            transform: scaleX(-1);
          }
        `}</style>
        <style global jsx>{`
          body {
            height: 100vh;
            overflow: hidden;
          }
        `}</style>
      </div>
    )
  }
}

function mapStateToProps ({ webrtc }) {
  return {
    hasLocalVideoStream: webrtc.localVideoEl !== null
  }
}

function mapDispatchToProps (dispatch) {
  return {
    setLocalVideoElement: (element) => dispatch(setLocalVideoElement(element))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HairModal)
