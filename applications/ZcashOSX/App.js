import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View
} from 'react-native'
import { Provider, connect } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import Login from './Login'
import configureStore from './configureStore'

const { store, persistor } = configureStore()


class Authed extends Component {
  render() {
    const { username, password } = this.props.auth
    const authed = username && password

    return (
      <View style={styles.container}>
        {authed && <Text style={styles.welcome}>Logged In</Text>}
        {!authed && <Login />}
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
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
