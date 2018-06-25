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
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Login Here:</Text>
        <Text style={styles.instructions}>
          You have to start zcashd with rpcuser and rpcpassword set.
          You can find those in your zcash.conf file.
        </Text>
        <TextInput
          onChangeText={(username) => this.setState({username})}
          value={this.state.username}
        />
        <TextInput
          onChangeText={(password) => this.setState({password})}
          value={this.state.password}
        />
        <Button
          title="Set Username and Password"
          onPress={() => this.handleSubmit()}
        />
      </View>
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

export default connect()(LoginScreen)
