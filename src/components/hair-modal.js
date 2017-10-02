import React from 'react'
import { connect } from 'react-redux'

import { setLocalVideoElement } from '../actions'

class HairModal extends React.Component {
  constructor () {
    super()

    this.state = {
      freezeCloseUp: false,
      stream: null
    }

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
    canvas.setAttribute('height', 640)
    canvas.setAttribute('width', 480)

    const context = canvas.getContext('2d')
    context.drawImage(this.mirror, 0, 0, 640, 480)

    this.props.onCloseUp('Anonymous Penguin', canvas.toDataURL())
  }

  render () {
    return (
      <div className='modal modal--hair'>
        <div className='modal__content'>
          <video autoPlay src={this.state.stream} ref={this.handleMirrorRef} />
          <h1 className='modal__title'>Check your hair! Check your makeup!</h1>
          <button className='modal__close-Up-button' onClick={this.takeCloseUp}><i className='fa fa-camera-retro' aria-hidden='true' /></button>
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

          .modal__close-Up-button {
            color: black;
            background: none;
            border: 1px solid black;
            border-radius: 100px;
            font: 200 36px/60px 'Raleway';
            width: 67px;
          }

          .modal__title {
            color: black;
            font: 400 48px 'Amatic SC';
            margin: 12px 0;
          }

          .modal__content {
            background: white;
            box-shadow: inset rgba(0,0,0,0.3) 0px 0px 20px;
            position: absolute;
            padding: 24px;
            top: 50%;
            left: 50%;
            text-align: center;
            width: 640px;
            transform: translate(-50%, -50%);
          }

          video {
            transform: scaleX(-1)
          }
        `}</style>
      </div>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return {
    setLocalVideoElement: (element) => dispatch(setLocalVideoElement(element))
  }
}

export default connect(() => ({}), mapDispatchToProps)(HairModal)
