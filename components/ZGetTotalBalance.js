import React from 'react'
import {
  StyleSheet,
  View,
  Text,
} from 'react-native'
import { connect } from 'react-redux'

import DisplayBalance from 'components/DisplayBalance'


const styles = StyleSheet.create({
  container: {
    // padding: 0,
  },
})

class ZGetTotalBalance extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        {/* <Text>{JSON.stringify(this.props.auth)}</Text> */}
        <DisplayBalance
          name={"ZGetTotalBalance"}
          balance={this.props.z_gettotalbalance}
        />
      </View>
    )
  }
}

export default connect((state) => {
  return {
    z_gettotalbalance: state.z_gettotalbalance,
    // auth: state.auth,
  }
})(ZGetTotalBalance)
