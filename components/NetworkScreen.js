import React, { Component } from 'react'
import {
  // StyleSheet,
  // Text,
  View,
} from 'react-native'

import GetBestBlockHash from 'components/GetBestBlockHash'
import GetBlock from 'components/GetBlock'


export default class NetWorkScreen extends Component {
    render() {
      return (
        <View>
          <GetBestBlockHash />
          <GetBlock />
        </View>
      )
    }
}
