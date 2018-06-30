import React, { Component } from 'react'
import {
  StyleSheet,
  View
} from 'react-native'
import { Provider, connect } from 'react-redux'

import LoginScreen from 'components/LoginScreen'
import LoggedInContainer from './LoggedInContainer'

import store from 'state/store'


class Authed extends Component {
  // TODO: need a better way to develop without logging in - Storybook?
  // TODO: investigate ways to inject configuration.
  // componentWillMount() {
  //   this.props.dispatch({
  //     type: 'SET_AUTH',
  //     username: 'z',
  //     password: 'a',
  //   })
  //   this.props.dispatch({
  //     type: 'SET_CLIENT_CONFIG',
  //     client_config: {
  //       url: 'http://localhost:8232',
  //     },
  //   })
  // }

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
        <Authed />
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
