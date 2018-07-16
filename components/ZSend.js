import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
} from 'react-native'
import { connect } from 'react-redux'

import Client from 'zcash-redux/Client'

// import { hexEncode } from 'lib/hex'

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  field: {
  },
  label: {
  },
  input: {
  },
  button: {
    width: 120,
    height: 60,
  }
})

// TODO: uses sendmany.
// Is there an easier call to make for this simple case?
class ZSend extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // from: 'ztNV7WVBC8S5Xj27gbm7aT6nyAZeDXEGGuXdELdK8rTSFk2UffRDEJ22Z2Y3Lv9mW5PmVSKbiWJFvn2x5F7W6sRbSJ412uR',
      from: '',
      // to: 'ztbUzDp8nqcPpAayoVwKgd7hCAWHqDte2wtEoNb7VbXNbbmYC4mtQHBbF4BgXZax4c81s6JPVvR2fnAAsp9AVB9cwmMV1Zp',
      to: '',
      // memo: '',
      // amount: '0.1',
      amount: '',
      // minconf: '1',
      // fee: '0.00001',
    }
  }
  handleSubmit() {
    // console.warn(this.state.from, )
    const client = new Client()
    client.z_sendmany(
      this.state.from,
      [{
        address: this.state.to,
        amount: parseFloat(this.state.amount),
        // amount: this.state.amount,
        // memo: this.state.memo
      }],
      // this.state.minconf,
      // this.state.fee,
    ).then((operationid) => {
      this.setState({ operationid })
    })
  }
  render() {
    return (
      <View style={styles.container}>
        {this.state.operationid &&
          <Text>{JSON.stringify(this.state.operationid)}</Text>
        }
        <View style={styles.field}>
          <Text style={styles.label}>From Address</Text>
          <TextInput
            style={styles.input}
            placeholder="From Address"
            onChangeText={(from) => this.setState({ from })}
            value={this.state.from}
          />
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>To Address</Text>
          <TextInput
            style={styles.input}
            placeholder="To Address"
            onChangeText={(to) => this.setState({ to })}
            value={this.state.to}
          />
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Amount</Text>
          <TextInput
            style={styles.input}
            placeholder="ZEC amt"
            onChangeText={(amount) => this.setState({ amount })}
            value={this.state.amount}
          />
        </View>
        <Button
          style={styles.button}
          title="Send"
          onPress={() => this.handleSubmit()}
        />
      </View>
    )
  }
}

export default connect((state) => {
  return {
  }
})(ZSend)
