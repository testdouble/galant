import React from 'react'
import { connect } from 'react-redux'

import { createRoom, takeCloseUp } from '../actions'
import RoomList from '../components/room-list'
import HairModal from '../components/hair-modal'

function mapStateToProps ({ rooms, users }) {
  return {
    hasCloseUp: users.closeUp !== null
  }
}

function mapDispatchToProps (dispatch) {
  return {
    createRoom: (roomName) => dispatch(createRoom(roomName)),
    takeCloseUp: (userName, closeUp) => dispatch(takeCloseUp(userName, closeUp))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(class Dashboard extends React.Component {
  constructor (props) {
    super(props)

    this.createRoom = () => this.props.createRoom(this.generateRandomRoomName())
  }

  generateRandomRoomName () {
    return Math.random().toString().slice(2, 6)
  }

  render () {
    const { hasCloseUp } = this.props

    return (
      <div>
        <div className='dashboard__header'>
          <h1 className='dashboard__title'><i className='fa fa-heart-o' aria-hidden='true' /> Galant</h1>
          <button className='dashboard__new-room-button' onClick={this.createRoom}>New Room</button>
        </div>
        {hasCloseUp ? null : (
          <HairModal onCloseUp={this.props.takeCloseUp} />
        )}
        <RoomList />
        <style jsx>{`
          .dashboard__header {
            background: #F14F54;
            color: #FFFFFF;
            display: flex;
            padding: 8px 16px;
          }

          .dashboard__title {
            flex: 1;
            font: 600 48px 'Amatic SC';
            margin: 0;
          }

          .dashboard__new-room-button {
            background: #FFFFFF;
            border: 1px solid #FFFFFF;
            border-radius: 4px;
            color: #F14F54;
            cursor: pointer;
            font: 200 20px 'Raleway';
            padding: 8px 16px;
            transition: box-shadow 0.1s;
          }

          .dashboard__new-room-button:hover {
            box-shadow: rgba(0,0,0,0.8) 0px 0px 10px;
          }
        `}</style>
      </div>
    )
  }
})
