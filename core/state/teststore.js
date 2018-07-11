import { createStore } from 'redux'

import rootReducer from './reducers'

const store = createStore(rootReducer, {
  auth: {
    username: 'z',
    password: 'a'
  },
  client_config: {
    url: 'http://192.168.88.150:8283',
  }
})

export default store
