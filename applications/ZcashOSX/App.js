import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View
} from 'react-native'
import { Provider, connect } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import LoginScreen from 'components/LoginScreen'
import WalletScreen from 'components/WalletScreen'
import configureStore from './configureStore'

const { store, persistor } = configureStore()


class Authed extends Component {
  render() {
    const { username, password } = this.props.auth
    const authed = username && password

    return (
      <View style={styles.container}>
        {authed && <WalletScreen />}
        {!authed && <LoginScreen />}
      </View>
    )
  }
}
Authed = connect((state) => {
  return {
    auth: state.auth
  }
})(Authed)


export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Authed />
        </PersistGate>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#F5FCFF',
  },
})
