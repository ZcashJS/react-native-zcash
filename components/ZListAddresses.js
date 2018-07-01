import React from 'react'
import {
  StyleSheet,
  View,
  Text,
} from 'react-native'
import { connect } from 'react-redux'

import Client from 'state/Client'
import DisplayAddress from 'components/DisplayAddress'


const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
})

class ZListAddresses extends React.Component {
  componentWillMount() {
    client = new Client()
    client.z_listaddresses()
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>ZAddresses:</Text>
        <View>
          {this.props.addresses.map((address) => {
            return <DisplayAddress key={address} address={address} />
          })}
        </View>
      </View>
    )
  }
}

export default connect((state) => {
  return {
    addresses: state.z_listaddresses,
  }
})(ZListAddresses)
