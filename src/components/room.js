import React from 'react'

export default class Room extends React.Component {
  render () {
    return (
      <div className='room' onClick={this.props.onClick}>
        {this.props.room.users.map((user) => (
          <img src={user.image} />
        ))}
        <style jsx>{`
          .room {
            background: #c0c0c0;
            border-radius: 0.3rem;
            margin: 1rem;
            min-height: 24px;
            padding: 1rem;
          }
        `}</style>
      </div>
    )
  }
}
