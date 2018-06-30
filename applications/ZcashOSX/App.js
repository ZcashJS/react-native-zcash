import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View
} from 'react-native'
import { Provider, connect } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import LoginScreen from 'components/LoginScreen'
import LoggedInContainer from './LoggedInContainer'
import configureStore from './configureStore'

const { store, persistor } = configureStore()

class Authed extends Component {
  // TODO: need a better way to develop without logging in - Storybook?
  componentWillMount() {
    // this.props.dispatch({
    //   type: 'SET_AUTH',
    //   username: 'z',
    //   password: 'a',
    // })
  }

  render() {
    const { username, password } = this.props.auth
    const authed = username && password
    return (
      <View style={styles.container}>
        {authed && <LoggedInContainer />}
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
