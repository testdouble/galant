import React from 'react'

export default class Room extends React.Component {
  render () {
    return (
      <div className={'room room--' + this.props.room.name} onClick={this.props.onClick}>
        {this.props.room.users.map((user) => (
          <img className="close-up" src={user.image} />
        ))}
        <style jsx>{`
          .close-up {
            display: inline-block;
            height: 10rem;
            margin: 0.5rem;
          }

          .room {
            background: #707070;
            border-radius: 0.3rem;
            margin: 1rem;
            min-height: 24px;
            padding: 0.5rem;
            position: relative;
          }

          .room--galant_default {
            min-height: 5rem;
          }

          .room--galant_default:before {
            bottom: 1rem;
            color: #fff;
            content: 'Main Stage';
            display: block;
            font-family: 'Raleway';
            font-size: 2rem;
            position: absolute;
            right: 1rem;
          }
        `}</style>
      </div>
    )
  }
}
