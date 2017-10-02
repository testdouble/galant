import React from 'react'
import { Provider } from 'react-redux'

import { configureStore } from '../lib/configure-store'
import { listen } from '../actions'
import RoomList from '../components/room-list'
import reducers from '../reducers'

export default class Index extends React.Component {
  constructor () {
    super()

    this.store = configureStore(reducers)
  }

  componentDidMount () {
    this.store.dispatch(listen(window.location.host))
  }

  render () {
    return (
      <Provider store={this.store}>
        <RoomList />
      </Provider>
    )
  }
}
