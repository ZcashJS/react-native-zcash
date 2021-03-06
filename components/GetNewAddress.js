import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  Button,
} from 'react-native'
import { connect } from 'react-redux'
import stdrpc from 'stdrpc'

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  button: {
    width: 150,
    height: 50,
  }
})

class GetNewAddress extends React.Component {
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
    c.getnewaddress().then((newaddress) => {
      this.setState({ newaddress })
    })
  }
  render() {
    return (
      <View style={styles.container}>
        {this.state.newaddress &&
          <Text>{this.state.newaddress}</Text>}
        }
        <Button
            style={styles.button}
            title="New Address"
            onPress={() => this.create()}
        />
      </View>
    )
  }
}

export default connect((state) => {
  return {
    auth: state.zcash_auth,
  }
})(GetNewAddress)
