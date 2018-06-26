import React from 'react'
import {
  StyleSheet,
  View, 
  Text,
  TextInput,
} from 'react-native'
import { connect } from 'react-redux'
import stdrpc from 'stdrpc'


const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
})

class GetBlockchainInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            blockchaininfo: false
        }
    }
    componentWillMount() {
        // TODO: create core/client for single configuration/instance
        // TODO: store username/password in localstorage after login component
        const c = stdrpc({
            url: 'http://localhost:8232',
            username: this.props.auth.username,
            password: this.props.auth.password,
        })
        c.getblockchaininfo().then((blockchaininfo) => {
            this.setState({ blockchaininfo })
        })
    }
    render() {
        // if (!this.state.blockchaininfo) { return <Text>Loading... </Text> }
        return (
            <View style={styles.container}>
                <Text>Block Chain Info</Text>
                {this.state.blockchaininfo &&
                    <View>
                        <Text selectable={false}>
                            {JSON.stringify(this.state.blockchaininfo)}
                        </Text>
                    </View>
                }
            </View>
        )
    }
}

export default connect((state) => {
    return {
        auth: state.auth,
    }
})(GetBlockchainInfo)
