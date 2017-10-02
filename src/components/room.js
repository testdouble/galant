import React from 'react'

export default class Room extends React.Component {
  render () {
    return (
      <div className='room' onClick={this.props.onClick}>
        <p>{this.props.room.name}</p>
        {this.props.room.users.map((user) => (
          <img src={user.image} />
        ))}
        <style jsx>{`
          .room {
            background: #c0c0c0;
            margin: 1rem;
            min-height: 24px;
            width: 100%;
          }
        `}</style>
      </div>
    )
  }
}
