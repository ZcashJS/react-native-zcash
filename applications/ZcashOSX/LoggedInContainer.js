import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native'

// import { createStackNavigator } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation'

// import Logout from 'components/Logout'

import NetWorkScreen from 'components/NetworkScreen'
import XferScreen from 'components/XferScreen'
import HistoryScreen from 'components/HistoryScreen'

const RootStack = createBottomTabNavigator({
// const RootStack = createStackNavigator({
    Network: {
        screen: NetWorkScreen,
    },
    Xfer: {
        screen: XferScreen,
    },
    Wallet: {
        screen: HistoryScreen,
    }
})

export default class LoggedInContainer extends Component {
    render() {
        return (
            <View style={styles.container}>
                <RootStack />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        // padding: 10,
        flex: 1,
        // padding: 10,
        // justifyContent: 'space-between',
        justifyContent: 'center',
        // justifyContent: 'space-around',
        // alignItems: 'center',
        marginTop: 23,
        backgroundColor: '#fdf',
    },
    bottomNav: {
        // flex: 1,
        flexDirection: 'row',
    },
  })
