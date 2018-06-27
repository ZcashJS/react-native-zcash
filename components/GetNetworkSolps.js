import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  // TextInput,
} from 'react-native'
import { connect } from 'react-redux'
import stdrpc from 'stdrpc'


const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
})

class GetNetworkSolps extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      solps: 0
    }
  }
  componentWillMount() {
    // TODO: create core/client for single configuration/instance
    // TODO: store username/password in localstorage after login component
    const c = stdrpc({
      url: 'http://localhost:8232',
      username: this.props.auth.username,
      password: this.props.auth.password,
    })
    setInterval(() => {
      c.getnetworksolps().then((solps) => {
        this.setState({ solps })
      })
    }, 1000)

  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Solutions Per Sec: {this.state.solps}</Text>
      </View>
    )
  }
}

export default connect((state) => {
  return {
    auth: state.auth,
  }
})(GetNetworkSolps)
