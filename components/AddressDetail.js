// display the data from GetBlock

import React from 'react'
import {
  StyleSheet,
  ScrollView,
  TextInput,
} from 'react-native'

const styles = StyleSheet.create({
  container: {
    padding: 10,
    // height: 300,
  },
})

export default class AddressDetail extends React.Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        <TextInput
          multiple={true}
          value={JSON.stringify(this.props.data)}
        />
      </ScrollView>
    )
  }
}
