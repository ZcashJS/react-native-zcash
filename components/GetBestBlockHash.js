import React from 'react'
import { View, Text } from 'react-native'
import stdrpc from 'stdrpc'


export default class GetBestBlockHash extends React.Component {
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
      username: '...',
      password: '...',
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
