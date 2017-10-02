import fetch from 'isomorphic-fetch'
import React from 'react'
import ActiveRoom from '../components/active-room'
import Room from '../components/room'

export default class Index extends React.Component {
  constructor () {
    super()
    this.state = {
      activeRoom: null,
      rooms: []
    }
  }

  componentDidMount () {
    var websocket = new window.WebSocket('ws://' + window.location.host)

    websocket.addEventListener('message', (event) => {
      const data = JSON.parse(event.data)

      console.log('WS message:', event)

      this.handleRemoteEvent(data.type, data)
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
    fetch('/rooms/' + Math.random().toString().slice(2), {
      method: 'PUT'
    })
  }

  render () {
    return (
      <div>
        <h1>Galant</h1>
        {this.state.rooms.map((room) => {
          if (this.state.activeRoom === room.name) {
            return <ActiveRoom room={room} />
          } else {
            return <Room room={room} onClick={() => this.setState({ activeRoom: room.name })} />
          }
        })}
        <button onClick={() => this.createRoom()}>Create</button>
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
