import fetch from 'isomorphic-fetch'
import React from 'react'
import ActiveRoom from '../components/active-room'
import Room from '../components/room'

export default class Index extends React.Component {
  constructor () {
    super()
    this.state = {
      activeRoomName: null,
      newRoomName: this.generateRandomRoomName(),
      rooms: []
    }

    this.createRoom = this.createRoom.bind(this)
    this.updateNewRoomName = this.updateNewRoomName.bind(this)
  }

  componentDidMount () {
    var websocket = new window.WebSocket('ws://' + window.location.host)

    websocket.addEventListener('message', (event) => {
      const data = JSON.parse(event.data)

      console.log('WS message:', event)

      this.handleRemoteEvent(data.type, data)
    })
  }

  updateNewRoomName (event) {
    this.setState({
      newRoomName: event.target.value
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
    fetch(`/rooms/galant_${this.state.newRoomName}`, {
      method: 'PUT'
    })
      .then(() => this.setState((prevState) => ({
        activeRoomName: `galant_${prevState.newRoomName}`,
        newRoomName: this.generateRandomRoomName()
      })))
  }

  generateRandomRoomName () {
    return Math.random().toString().slice(2, 6)
  }

  render () {
    const { activeRoomName, newRoomName } = this.state

    return (
      <div>
        <h1>Galant</h1>
        {this.state.rooms.map((room) => {
          if (activeRoomName === room.name) {
            return <ActiveRoom room={room} />
          } else {
            return <Room room={room} onClick={() => this.setState({ activeRoomName: room.name })} />
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
