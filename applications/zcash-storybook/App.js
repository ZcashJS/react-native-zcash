import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import DisplayAddress from 'components/DisplayAddress'


export default class App extends React.Component {
  render() {
    return (
      <DisplayAddress address={"foobarbaz"} />
    )
  }
}
