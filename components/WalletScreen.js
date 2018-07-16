import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  ScrollView,
} from 'react-native'

import ListTransactions from 'components/stateful/ListTransactions'
import ZGetOperationStatus from 'components/ZGetOperationStatus'
import ZShieldCoinbase from 'components/ZShieldCoinbase'

const styles = StyleSheet.create({
  container: {
    padding: 2,
    width: '100%',
    flex: 1,
    // alignItems: 'center',
  },
})


export default class WalletScreen extends Component {
  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text>Wallet</Text>
        <ListTransactions />
        <ZGetOperationStatus />
        {/* TODO: how to know if there is anything to shield? */}
        <ZShieldCoinbase />
      </ScrollView>
    )
  }
}
