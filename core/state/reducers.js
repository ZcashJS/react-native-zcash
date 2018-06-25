import { combineReducers } from 'redux'

const auth = (state, action) => {
  switch (action.type) {
    case 'SET_AUTH':
      return {
        username: action.username,
        password: action.password,
      }
    case 'UNSET_AUTH':
      return {}
    default:
      return {}
  }
}

export default combineReducers({
  auth
})
