import React from 'react'
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
} from 'react-native'
import { connect } from 'react-redux'

import Client from 'state/Client'

import DisplayTransaction from 'components/stateless/DisplayTransaction'


const styles = StyleSheet.create({
  container: {
    // height: 300,
    // width: 100,
    // flex: 1,
    // borderWidth: StyleSheet.hairlineWidth,
    // borderColor: 'red',
    // overflow: 'scroll',
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
        {this.props.listtransactions.map((tx) => {
          return <DisplayTransaction key={tx.txid} transaction={tx} />
        })}
      </ScrollView>
    )
  }
}

export default connect((state) => {
  return {
    // just the list of transactions in the last call to the daemon
    listtransactions: state.listtransactions,
    // hash of all known transactions
    // transactions: state.transactions,
  }
})(ListTransactions)
