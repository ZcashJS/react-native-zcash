import React, { Component } from 'react'
import {
  // StyleSheet,
  Text,
  View,
} from 'react-native'

import GetBalance from 'components/GetBalance'


export default class SendRecieveContainer extends Component {
    render() {
        return (
            <View>
                <Text>Xfers</Text>
                <GetBalance />
            </View>
        )
    }
}
  