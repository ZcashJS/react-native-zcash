import { createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
// defaults to localStorage for web and AsyncStorage for react-native
// TODO: this isn't actually working yet for react-native-macos :/
import storage from 'redux-persist/lib/storage'

import rootReducer from 'state/reducers'

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default () => {
  let store = createStore(persistedReducer)
  let persistor = persistStore(store)
  return { store, persistor }
}
