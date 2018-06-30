import React, { Component } from 'react'
import {
  // StyleSheet,
  Text,
  View,
} from 'react-native'

import ZGetOperationStatus from 'components/ZGetOperationStatus'


export default class HistoryContainer extends Component {
  render() {
    return (
      <View>
        <Text>History</Text>
        <ZGetOperationStatus />
      </View>
    )
  }
}
