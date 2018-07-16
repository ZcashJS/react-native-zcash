import { combineReducers } from 'redux'

let default_auth = {
  username: '',
  password: '',
}

const zcash_auth = (state = default_auth, action) => {
  switch (action.type) {
    case 'SET_ZCASH_AUTH':
      return {
        username: action.username,
        password: action.password,
      }
    case 'UNSET_ZCASH_AUTH':
      return {}
    default:
      return state
  }
}

const default_client_config = {
  url: 'http://localhost:8232'
}
const zcash_client_config = (state = default_client_config, action) => {
  switch (action.type) {
    case 'SET_ZCASH_CLIENT_CONFIG':
      return action.client_config
    default:
      return state
  }
}

// https://zcash-rpc.github.io/listtransactions.html
// this does not keep the full list, just the last call,
// for all the transactions that the client knows about,
// use "transactions"
const listtransactions = (state = [], action) => {
  switch (action.type) {
    case 'LISTTRANSACTIONS':
      return action.transactions
    default:
      return state
  }
}

// listtransactions returns an array.
// For some things, we probably want to keep the
// transactions in a map with txid keys
// This does not correspond to a call directly.
const transactions = (state = {}, action) => {
  switch (action.type) {
    case 'LISTTRANSACTIONS':
      newstate = {...state}
      action.transactions.forEach((tx) => {
        newstate[tx.txid] = tx
      })
      return newstate
    default:
      return state
  }
  return state
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
  zcash_auth,
  zcash_client_config,
  listtransactions,
  transactions,
  z_gettotalbalance,
  z_listaddresses,
  z_getbalance,
  z_shieldcoinbase,
})
