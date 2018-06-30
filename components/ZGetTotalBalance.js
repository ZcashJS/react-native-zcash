import React from 'react'
import {
  StyleSheet,
  View,
} from 'react-native'
import { connect } from 'react-redux'
import stdrpc from 'stdrpc'

import DisplayBalance from 'components/DisplayBalance'

const styles = StyleSheet.create({
  container: {
    // padding: 0,
  },
})

class ZGetTotalBalance extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      balance: {}
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
    c.z_gettotalbalance().then((balance) => {
      this.setState({ balance })
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <DisplayBalance
          name={"ZGetTotalBalance"}
          balance={this.state.balance}
        />
      </View>
    )
  }
}

// TODO: instead of using redux here, pass the client down?
export default connect((state) => {
  return {
    auth: state.auth,
  }
})(ZGetTotalBalance)
