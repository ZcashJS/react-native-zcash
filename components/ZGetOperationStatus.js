import React from 'react'
import {
  StyleSheet,
  View,
  Text,
} from 'react-native'
import { connect } from 'react-redux'
import stdrpc from 'stdrpc'


const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
})

class ZGetOperationStatus extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      operations: []
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
    c.z_getoperationstatus().then((operations) => {
      this.setState({ operations })
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Operations:</Text>
        <View>
          <Text>{JSON.stringify(this.state.operations)}</Text>
        </View>
      </View>
    )
  }
}

export default connect((state) => {
  return {
    auth: state.zcash_auth,
  }
})(ZGetOperationStatus)
