// display the data from GetBlock

import React from 'react'
import {
  StyleSheet,
  Text,
  View,
} from 'react-native'

import DisplayAddress from 'components/stateless/DisplayAddress'

const styles = StyleSheet.create({
  container: {
  },
})


export default class AddressDetail extends React.Component {
  render() {
    const { address, amount, confirmations } = this.props.data

    return (
      <View style={styles.container}>
        <DisplayAddress address={address} />
        <Text>Amount: {amount}</Text>
        <Text>Confirmations: {confirmations}</Text>
      </View>
    )
  }
}
