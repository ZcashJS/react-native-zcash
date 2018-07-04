import { combineReducers } from 'redux'
import {
  REACT_APP_ZCASH_USERNAME,
  REACT_APP_ZCASH_PASSWORD,
} from 'react-native-dotenv'

let default_auth = {
  username: REACT_APP_ZCASH_USERNAME,
  password: REACT_APP_ZCASH_PASSWORD,
}

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

const z_getbalance = (state = {}, action) => {
  switch (action.type) {
    case 'Z_GETBALANCE':
      return {
        ...state,
        [action.address]: action.amount,
      }
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
  z_getbalance,
  z_shieldcoinbase,
})
