import { createStore } from 'redux'

import rootReducer from './reducers'

// TODO: figure out persistence that is cross-platform

let store

export default (data={}) => {
  if (!store) {
    store = createStore(rootReducer, data)
    return store
  }
  return store
}

