import React from 'react'
import {
  StyleSheet,
  View,
  TextInput,
} from 'react-native'

const styles = StyleSheet.create({
  container: {
    // padding: 10,
  },
})


export default class AddressDetail extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          multiple={true}
          value={this.props.address}
        />
      </View>
    )
  }
}
