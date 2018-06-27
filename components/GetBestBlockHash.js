import React from 'react'
import {
  StyleSheet,
  View, 
  Text
} from 'react-native'
import { connect } from 'react-redux'
import stdrpc from 'stdrpc'

const styles = StyleSheet.create({
  container: {
    padding: 10,
    // width: '100%',
    // padding: 10,
    // flex: 1,
    // padding: 10,
    // justifyContent: 'space-between',
    // justifyContent: 'center',
    // justifyContent: 'space-around',
    // alignItems: 'center',
    // marginTop: 23,
    // backgroundColor: '#fdf',
  },
})



class GetBestBlockHash extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      bestblockhash: 'Loading ....'
    }
  }
  componentWillMount() {
    // TODO: create core/client for single configuration/instance
    // TODO: get username/password from redux
    // TODO: store username/password in localstorage after login component
    const c = stdrpc({
      url: 'http://localhost:8232',
      username: this.props.auth.username,
      password: this.props.auth.password,
    })
    c.getbestblockhash().then((bestblockhash) => {
      this.setState({ bestblockhash })
    })
  }
  render() {
    if (!this.state.bestblockhash) return null
    return (
      <View style={styles.container}>
        <Text>Best Block Hash: {this.state.bestblockhash}</Text>
      </View>
    )
  }
}

export default connect((state) => {
  return {
    auth: state.auth,
  }
})(GetBestBlockHash)
