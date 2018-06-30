import { createStore } from 'redux'

import rootReducer from './reducers'

// TODO: figure out persistence that is cross-platform
export default createStore(rootReducer)
