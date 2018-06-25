import React, { Component } from 'react'
import {
  // StyleSheet,
  Text,
  View,
  Button,
} from 'react-native'
import { connect } from 'react-redux'


class Logout extends Component {
  render() {
    return (
      <View>
        <Button
          title="Logout"
          onPress={() => this.props.dispatch({type: 'UNSET_AUTH'})}
        />
      </View>
    )
  }
}

export default connect()(Logout)
