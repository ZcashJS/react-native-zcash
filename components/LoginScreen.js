import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button
} from 'react-native'
import { connect } from 'react-redux'


class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    }
  }

  handleSubmit() {
    this.props.dispatch({
      type: 'SET_AUTH',
      ...this.state,
    })
    // TODO: expose this on the client
    // this.props.dispatch({
    //   type: 'SET_CLIENT_CONFIG',
    //   client_config: {
    //     url: 'http://localhost:8232',
    //   },
    // })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.instructions}>
          <Text>
            Start zcashd with rpcuser and rpcpassword set in your zcash.conf.
            Enter those values here.
          </Text>
        </View>
        <View style={styles.form}>
          <View style={styles.field}>
            <Text style={styles.label}>username:</Text>
            <TextInput
              style={styles.input}
              placeholder="username"
              onChangeText={(username) => this.setState({username})}
              value={this.state.username}
            />
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>password:</Text>
            <TextInput
              style={styles.input}
              placeholder="password"
              onChangeText={(password) => this.setState({password})}
              value={this.state.password}
            />
          </View>
          <Button
            style={styles.button}
            title="Set Auth"
            onPress={() => this.handleSubmit()}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: 240,
    // flex: 1,
    // padding: 10,
    // justifyContent: 'space-between',
    justifyContent: 'center',
    // justifyContent: 'space-around',
    // alignItems: 'center',
    // backgroundColor: '#ffa',
  },
  // welcome: {
  //   fontSize: 20,
  //   textAlign: 'center',
  //   margin: 10,
  // },
  instructions: {
    // textAlign: 'center',
    // color: '#aaa',
    marginBottom: 13,
    // flex: 1,
  },
  field: {
    // flex: 5,
    // justifyContent: 'space-around',
    // flexDirection: 'row',
    // flex: 1,
    // width: 300,
  },
  // welcome: {
  label: {
    // flex: 1,
  },
  input: {
    // flex: 1,
    // width: 161,
  },
  button: {
    // borderWidth: StyleSheet.hairlineWidth,
    // borderColor: '#0f0f0f',
    // borderColor: 'red',
    // flex: 1,
    // fontSize: 12,
    // padding: 4,
    width: 110,
    height: 60,
  },
})

export default connect()(LoginScreen)
