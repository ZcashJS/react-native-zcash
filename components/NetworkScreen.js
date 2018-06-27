import React, { Component } from 'react'
import {
  // StyleSheet,
  // Text,
  View,
} from 'react-native'

import GetNetworkSolps from 'components/GetNetworkSolps'
import GetBestBlockHash from 'components/GetBestBlockHash'
import GetBlock from 'components/GetBlock'
import GetBlockchainInfo from 'components/GetBlockchainInfo'

export default class NetWorkScreen extends Component {
    render() {
      return (
        <View>
          <GetNetworkSolps />
          <GetBestBlockHash />
          <GetBlock />
          <GetBlockchainInfo />
        </View>
      )
    }
}
