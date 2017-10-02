import React from 'react'
import { Provider } from 'react-redux'
import Head from 'next/head'

import { configureStore } from '../util/configure-store'
import { listen, startVideo } from '../actions'
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
  }

  render () {
    return (
      <Provider store={this.store}>
        <div>
          <Head>
            <link href='https://fonts.googleapis.com/css?family=Amatic+SC|Raleway' rel='stylesheet' />
            <script src='https://use.fontawesome.com/98abe3dc6e.js' />
          </Head>
          <RoomList />
        </div>
      </Provider>
    )
  }
}
