import React from 'react'
import { Provider } from 'react-redux'

import { configureStore } from '../util/configure-store'
import { joinRoom, listen, startVideo } from '../actions'
import RoomList from '../components/room-list'
import reducers from '../reducers'

export default class Index extends React.Component {
  constructor () {
    super()

    this.store = configureStore(reducers)
  }

  componentDidMount () {
    this.store.dispatch(startVideo())
    this.store.dispatch(listen(window.location.host))
    this.store.dispatch(joinRoom('galant_default'))
  }

  render () {
    return (
      <Provider store={this.store}>
        <RoomList />
      </Provider>
    )
  }
}
