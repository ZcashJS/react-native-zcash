import React, { Component } from 'react'
import {
  // StyleSheet,
  Text,
  View,
} from 'react-native'

import ZGetOperationStatus from 'components/ZGetOperationStatus'
import ZShieldCoinbase from 'components/ZShieldCoinbase'


export default class WalletScreen extends Component {
  render() {
    return (
      <View>
        <Text>Wallet</Text>
        <ZGetOperationStatus />
        {/* TODO: how to know if there is anything to shield? */}
        <ZShieldCoinbase />
      </View>
    )
  }
}
