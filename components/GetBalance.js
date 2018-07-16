import React from 'react'
import {
  StyleSheet,
  View,
  Text,
} from 'react-native'
import { connect } from 'react-redux'
import stdrpc from 'stdrpc'


const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
})

class GetBalance extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      balance: 0.0
    }
  }
  componentWillMount() {
    const c = stdrpc({
      url: 'http://localhost:8232',
      username: this.props.auth.username,
      password: this.props.auth.password,
    })
    c.getbalance().then((balance) => {
      this.setState({ balance })
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Balance:</Text>
        <View>
          <Text>
            {JSON.stringify(this.state.balance)}
          </Text>
        </View>
      </View>
    )
  }
}

export default connect((state) => {
  return {
    auth: state.zcash_auth,
  }
})(GetBalance)
