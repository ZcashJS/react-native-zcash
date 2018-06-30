import React from 'react'
import {
  StyleSheet,
  View,
  Text,
} from 'react-native'

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  text: {
    padding: 5,
  }
})

// TODO: functional stateless component?
export default class DisplayBalance extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>{this.props.name}</Text>
        <View>
          <Text style={styles.text}>Transparent: {this.props.balance.transparent}</Text>
          <Text style={styles.text}>Private: {this.props.balance.private}</Text>
          <Text style={styles.text}>Total: {this.props.balance.total}</Text>
        </View>
      </View>
    )
  }
}
