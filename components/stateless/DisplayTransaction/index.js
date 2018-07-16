import React from 'react'
import {
  StyleSheet,
  View,
  Text,
} from 'react-native'

import { TO_FIXED_PRECISION } from 'lib/constants'

import DisplayAddress from 'components/stateless/DisplayAddress'
import Generate from './Generate'
import Send from './Send'
import Receive from './Receive'
import Move from './Move'

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
})


export default class DisplayTransaction extends React.Component {
  render() {
    const { transaction } = this.props
    const Child = {
      // 'generate': Generate,
      'send': Send,
      'receive': Receive,
      'move': Move,
    }[transaction.category]

    if (!Child) {
      return null
    }

    return (
      <View style={styles.container}>
        <Child transaction={transaction} />
        <Text>{Object.keys(transaction).join(' ')}</Text>
        {/* <DisplayAddress address={tx.address} />
        <Text>{tx.amount.toFixed(TO_FIXED_PRECISION)}</Text>
        <Text>Confirmations: {tx.confirmations}</Text>
        <Text>{JSON.stringify(tx)}</Text> */}
      </View>
    )
  }
}
