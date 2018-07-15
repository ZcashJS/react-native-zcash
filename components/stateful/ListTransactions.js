import React from 'react'
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
} from 'react-native'
import { connect } from 'react-redux'

import Client from 'state/Client'


const styles = StyleSheet.create({
  container: {
    // height: 200,
    // width: '100%',
    flex: 1,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'red',
  },
})

class ListTransactions extends React.Component {
  componentWillMount() {
    const client = new Client()
    // TODO: get more than we want and then paginate?
    // How to know when there are more that we don't have?
    client.listtransactions()
  }
  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
          <Text>{JSON.stringify(this.props.listtransactions)}</Text>
          <Text>{JSON.stringify(this.props.transactions)}</Text>
      </ScrollView>
    )
  }
}

export default connect((state) => {
  return {
    listtransactions: state.listtransactions,
    transactions: state.transactions,
  }
})(ListTransactions)
