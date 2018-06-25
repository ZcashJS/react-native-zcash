import React, { Component } from 'react'
import {
  // StyleSheet,
  // Text,
  View,
} from 'react-native'

import GetBestBlockHash from 'components/GetBestBlockHash'


export default class NetWorkScreen extends Component {
    render() {
      return (
        <View>
          <GetBestBlockHash />
        </View>
      )
    }
}
