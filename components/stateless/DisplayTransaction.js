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
})

// TODO: functional stateless component?
export default class DisplayTransaction extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>{JSON.stringify(this.props.transaction)}</Text>
      </View>
    )
  }
}
