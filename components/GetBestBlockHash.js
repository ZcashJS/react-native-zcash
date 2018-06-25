import React from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import stdrpc from 'stdrpc'


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
      <View>
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
