import React from 'react'
import {
  StyleSheet,
  View,
  Text,
} from 'react-native'

import { TO_FIXED_PRECISION } from 'lib/constants'


const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  title: {
    fontSize: 23,
    paddingBottom: 10,
  },
  text: {
    paddingBottom: 5,
  }
})

// TODO: functional stateless component?
export default class DisplayBalance extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{this.props.name}</Text>
        <View>
          <Text style={styles.text}>
            Transparent: {parseFloat(this.props.balance.transparent).toFixed(TO_FIXED_PRECISION)}
          </Text>
          <Text style={styles.text}>
            Private: {parseFloat(this.props.balance.private).toFixed(TO_FIXED_PRECISION)}
          </Text>
          <Text style={styles.text}>
            Total: {parseFloat(this.props.balance.total).toFixed(TO_FIXED_PRECISION)}
          </Text>
        </View>
      </View>
    )
  }
}
