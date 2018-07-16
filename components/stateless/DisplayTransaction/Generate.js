import React from 'react'
import {
  StyleSheet,
  View,
  Text,
} from 'react-native'

import { TO_FIXED_PRECISION } from 'lib/constants'

import DisplayAddress from 'components/stateless/DisplayAddress'


const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
})

export default class DisplayTransaction extends React.Component {
  render() {
    const tx = this.props.transaction
    return (
      <View style={styles.container}>
        <Text>Generate</Text>
        <DisplayAddress address={tx.address} />
        <Text>Amount: {tx.amount.toFixed(TO_FIXED_PRECISION)}</Text>
        <Text>Confirmations: {tx.confirmations}</Text>
      </View>
    )
  }
}
