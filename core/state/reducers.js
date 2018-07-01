import { combineReducers } from 'redux'


// TODO: inject configuration for development
let default_auth = {
  username: 'z',
  password: 'a',
}
default_auth = {}

const auth = (state = default_auth, action) => {
  switch (action.type) {
    case 'SET_AUTH':
      return {
        username: action.username,
        password: action.password,
      }
    case 'UNSET_AUTH':
      return {}
    default:
      return state
  }
}

const default_client_config = {
  url: 'http://localhost:8232'
}
const client_config = (state = default_client_config, action) => {
  switch (action.type) {
    case 'SET_CLIENT_CONFIG':
      return action.client_config
    default:
      return state
  }
}

const z_gettotalbalance = (state = {}, action) => {
  switch (action.type) {
    case 'Z_GETTOTALBALANCE':
      return action.info
    default:
      return state
  }
}

const z_listaddresses = (state = [], action) => {
  switch (action.type) {
    case 'Z_LISTADDRESSES':
      return action.addresses
    default:
      return state
  }
}

const z_shieldcoinbase = (state = {}, action) => {
  switch (action.type) {
    case 'Z_SHIELDCOINBASE':
      return action.result
    default:
      return state
  }
}

export default combineReducers({
  auth,
  client_config,
  z_gettotalbalance,
  z_listaddresses,
  z_shieldcoinbase,
})
