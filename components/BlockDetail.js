// display the data from GetBlock

import React from 'react'
import {
  StyleSheet,
  ScrollView,
  Text,
} from 'react-native'

const styles = StyleSheet.create({
  container: {
    padding: 10,
    height: 300,
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
})

export default class BlockDetail extends React.Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        <Text>{JSON.stringify(this.props.data)}</Text>
      </ScrollView>
    )
  }
}
