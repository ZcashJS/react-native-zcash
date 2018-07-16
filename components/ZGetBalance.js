import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  TextInput,
} from 'react-native'
import { connect } from 'react-redux'

import Client from 'zcash-redux/Client'

const styles = StyleSheet.create({
  container: {
    // padding: 10,
  },
})

class ZGetBalance extends React.Component {
  componentWillMount() {
    client = new Client()
    client.z_getbalance(this.props.address)
  }
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          multiple={true}
          value={this.props.address}
        />
        <Text>Balance: {this.props.balances[this.props.address]}</Text>
      </View>
    )
  }
}

export default connect((state) => {
  return {
    balances: state.z_getbalance,
  }
})(ZGetBalance)
