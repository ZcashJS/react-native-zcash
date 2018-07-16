import React, { Component } from 'react'
import {
  StyleSheet,
  View
} from 'react-native'
import { Provider, connect } from 'react-redux'

import LoginScreen from 'components/LoginScreen'
import LoggedInContainer from './LoggedInContainer'

import getStore from 'zcash-redux/getStore'


class Authed extends Component {
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
    auth: state.zcash_auth,
  }
})(Authed)


export default class App extends Component {
  render() {
    return (
      <Provider store={getStore()}>
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
