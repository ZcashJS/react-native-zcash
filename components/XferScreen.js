import React, { Component } from 'react'
import {
  // StyleSheet,
  Text,
  View,
} from 'react-native'

import GetBalance from 'components/GetBalance'
import GetNewAddress from 'components/GetNewAddress'


export default class SendRecieveContainer extends Component {
  render() {
    return (
      <View>
        <Text>Xfers</Text>
        <GetBalance />
        <GetNewAddress />
      </View>
    )
  }
}
  