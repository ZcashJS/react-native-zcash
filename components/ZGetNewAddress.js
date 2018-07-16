import React from 'react'
import {
  StyleSheet,
  View,
  Button,
} from 'react-native'
import { connect } from 'react-redux'
import stdrpc from 'stdrpc'

import DisplayAddress from 'components/stateless/DisplayAddress'

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  button: {
    width: 150,
    height: 50,
  }
})

class ZGetNewAddress extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      newaddress: false
    }
  }
  create() {
    const c = stdrpc({
      url: 'http://localhost:8232',
      username: this.props.auth.username,
      password: this.props.auth.password,
    })
    c.z_getnewaddress().then((newaddress) => {
      this.setState({ newaddress })
    })
  }
  render() {
    return (
      <View style={styles.container}>
        {this.state.newaddress &&
          <DisplayAddress address={this.state.newaddress} />
        }
        <Button
            style={styles.button}
            title="New Z Address"
            onPress={() => this.create()}
        />
      </View>
    )
  }
}

export default connect((state) => {
  return {
    auth: state.auth,
  }
})(ZGetNewAddress)
