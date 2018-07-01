import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  Button,
  Picker,
} from 'react-native'
import { connect } from 'react-redux'

import client from 'state/client'

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  button: {
    width: 150,
    height: 50,
  },
  // picker: {
  //   height: 50,
  //   width: '100%',
  // },
})

class ZShieldCoinbase extends React.Component {
  // TODO: choose more than just shield everything to first address
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     // fromaddress: '',
  //     toaddress: '',
  //   }
  // }
  shield() {
    // client.z_shieldcoinbase('*', this.state.toaddress)
    client.z_shieldcoinbase('*', this.props.addresses[0])
  }
  render() {
    // TODO: right now this just takes the first address and
    // shields everything to that address.
    // Picker doesn't seem to work with react-native-macos :/
    return (
      <View style={styles.container}>
        <Text>{JSON.stringify(this.props.result)}</Text>
        {/* {this.props.addresses.map((address) => {
          return <Text key={address}>{address}</Text>
        })} */}
        {/* <View>
          <Picker
            selectedValue={this.state.toaddress}
            style={styles.picker}
            onValueChange={(toaddress, i) => this.setState({ toaddress })}
          >
            <Picker.Item key={''} label={''} value={''} />
            {this.props.addresses.map((address) => {
              return <Picker.Item key={address} label={address} value={address} />
            })}
          </Picker>
        </View> */}
        <Button
          style={styles.button}
          title="Shield Coinbase"
          onPress={() => this.shield()}
        />
      </View>
    )
  }
}

export default connect((state) => {
  return {
    result: state.z_shieldcoinbase,
    addresses: state.z_listaddresses,
  }
})(ZShieldCoinbase)
