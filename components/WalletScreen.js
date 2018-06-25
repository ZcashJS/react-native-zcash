import React, { Component } from 'react'
import {
  // StyleSheet,
  Text,
  View,
} from 'react-native'

import GetBestBlockHash from 'components/GetBestBlockHash'
import Logout from 'components/Logout'


class WalletScreen extends Component {
  render() {
    return (
      <View>
        <Text>Hello Wallet!</Text>
        <Logout />
        <GetBestBlockHash />
      </View>
    )
  }
}

export default WalletScreen
