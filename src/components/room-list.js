import React from 'react'
import { connect } from 'react-redux'

import { createRoom, joinRoom } from '../actions'
import ActiveRoom from '../components/active-room'
import Room from '../components/room'

class RoomList extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      newRoomName: ''
    }

    this.createRoom = this.createRoom.bind(this)
    this.updateNewRoomName = this.updateNewRoomName.bind(this)
  }

  componentDidMount () {
    this.setState({
      newRoomName: this.generateRandomRoomName()
    })
  }

  updateNewRoomName (event) {
    this.setState({
      newRoomName: event.target.value
    })
  }

  createRoom () {
    this.props.createRoom(this.state.newRoomName)
      .then(() => this.setState((prevState) => ({
        newRoomName: this.generateRandomRoomName()
      })))
  }

  generateRandomRoomName () {
    return Math.random().toString().slice(2, 6)
  }

  render () {
    const { activeRoomName, rooms } = this.props
    const { newRoomName } = this.state

    return (
      <div>
        <h1>Galant</h1>
        {rooms.map((room) => {
          if (activeRoomName === room.name) {
            return <ActiveRoom key={room.name} room={room} />
          } else {
            return <Room key={room.name} room={room} onClick={() => this.props.joinRoom(room.name)} />
          }
        })}
        <input type='text' onChange={this.updateNewRoomName} value={newRoomName} />
        <button onClick={this.createRoom}>Create</button>
        <style jsx>{`
          *, *:before, *:after {
            box-sizing: border-box;
          }

          body: {
            height: 100%;
            width: 100%;
          }
        `}</style>
      </div>
    )
  }
}

function mapStateToProps ({ rooms }) {
  return {
    activeRoomName: rooms.activeRoomName,
    rooms: rooms.rooms
  }
}

function mapDispatchToProps (dispatch) {
  return {
    createRoom: (roomName) => dispatch(createRoom(roomName)),
    joinRoom: (roomName) => dispatch(joinRoom(roomName))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomList)
