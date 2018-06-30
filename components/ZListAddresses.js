import React from 'react'
import {
  StyleSheet,
  View,
  Text,
} from 'react-native'
import { connect } from 'react-redux'
import stdrpc from 'stdrpc'

import DisplayAddress from 'components/DisplayAddress'


const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
})

class ZListAddresses extends React.Component {
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
    c.z_listaddresses().then((addresses) => {
      this.setState({ addresses })
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>ZAddresses:</Text>
        <View>
          {this.state.addresses.map((address) => {
            return <DisplayAddress key={address} address={address} />
          })}
        </View>
      </View>
    )
  }
}

export default connect((state) => {
  return {
    auth: state.auth,
  }
})(ZListAddresses)
