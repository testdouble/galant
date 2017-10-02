import { applyMiddleware, compose, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'

export function configureStore (reducers, initialState = {}) {
  const configureStoreWithMiddleware = compose(
    applyMiddleware(
      thunkMiddleware
    )
  )(createStore)

  return configureStoreWithMiddleware(reducers, initialState)
}
