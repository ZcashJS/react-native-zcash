import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  ScrollView,
} from 'react-native'

// import GetBalance from 'components/GetBalance'
import GetNewAddress from 'components/GetNewAddress'
import ListReceivedByAddress from 'components/ListReceivedByAddress'
import ZGetTotalBalance from 'components/ZGetTotalBalance'
import ZSend from 'components/ZSend'
import ZListAddresses from 'components/ZListAddresses'
import ZGetNewAddress from 'components/ZGetNewAddress'

const styles = StyleSheet.create({
  container: {
    padding: 2,
    width: '100%',
    // flex: 1,
    // alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    width: '100%',
    fontSize: 23,
    paddingLeft: 10,
  },
})


export default class SendRecieveContainer extends Component {
  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Xfer</Text>
        {/* <GetBalance /> */}
        <ZGetTotalBalance />
        <ZSend />
        <ZListAddresses />
        <ZGetNewAddress />
        <ListReceivedByAddress />
        <GetNewAddress />
      </ScrollView>
    )
  }
}
