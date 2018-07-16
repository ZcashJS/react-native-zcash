import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  TextInput,
} from 'react-native'
import { connect } from 'react-redux'
import stdrpc from 'stdrpc'

import AddressDetail from 'components/AddressDetail'


const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
})

class ListReceivedByAddress extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      addresses: []
    }
  }
  componentWillMount() {
    // TODO: create core/client for single configuration/instance
    // TODO: store username/password in localstorage after login component
    const c = stdrpc({
      url: 'http://localhost:8232',
      username: this.props.auth.username,
      password: this.props.auth.password,
    })
    c.listreceivedbyaddress(1, true).then((addresses) => {
      this.setState({ addresses })
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Transparent Addresses:</Text>
        <View>
          {this.state.addresses.map((address) => {
            return <AddressDetail key={address.address} data={address} />
          })}
        </View>
      </View>
    )
  }
}

export default connect((state) => {
  return {
    auth: state.zcash_auth,
  }
})(ListReceivedByAddress)
