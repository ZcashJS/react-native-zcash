import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
} from 'react-native'
import { connect } from 'react-redux'
import stdrpc from 'stdrpc'

import BlockDetail from 'components/BlockDetail'

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
  field: {
    // flex: 5,
    // justifyContent: 'space-around',
    // flexDirection: 'row',
    // flex: 1,
    // width: 300,
  },
  // welcome: {
  label: {
    // flex: 1,
  },
  input: {
    // flex: 1,
    // width: 161,
  },
  button: {
    width: 120,
    height: 60,
  }
})

class GetBlock extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      block: false
    }
  }
  handleSubmit() {
    // TODO: create core/client for single configuration/instance
    // TODO: store username/password in localstorage after login component
    const c = stdrpc({
      url: 'http://localhost:8232',
      username: this.props.auth.username,
      password: this.props.auth.password,
    })
    c.getblock(this.state.blockid).then((block) => {
      this.setState({ block })
    })
  }
  render() {
    return (
      <View style={styles.container}>
        {this.state.block && <BlockDetail data={this.state.block} />}
        <View style={styles.field}>
          <Text style={styles.label}>Block # or Hash</Text>
          <TextInput
            style={styles.input}
            placeholder="Block # or Hash"
            onChangeText={(blockid) => this.setState({ blockid })}
            value={this.state.blockid}
          />
        </View>
        <Button
          style={styles.button}
          title="Get Block Info"
          onPress={() => this.handleSubmit()}
        />
      </View>
    )
  }
}

export default connect((state) => {
  return {
    auth: state.zcash_auth,
  }
})(GetBlock)
