# zcash-redux

A stateful client for zcashd.

# Installation

(TODO: need to publish to npm before this will work)

```
npm install zcash-redux
```

or

```
yarn add zcash-redux
```

# Usage

You can import the reducer into your application and add
it as a child reducer with `combineReducers`:

```
import zreducer from 'zcash-redux/reducers'
```

If you have no other redux reducers in your app,
you can get the store. You can pass in default state

```
import getStore from 'zcash-redux/getStore'

const mystore = getStore({
  zcash_auth: {
    username: 'myrpcusername',
    password: 'myrpcpassword',
  },
  zcash_client_config: {
    url: 'http://localhost:8232',
  },
})
```

You can use the stateful client to make RPC calls which affect the store.
Import the client, instantiate it and set the auth
(and optionally the zcash_client_config).

```
import Client from 'zcash-redux/Client'

const client = new Client()

// set zcash_auth and zcash_client_config if not already in the store
client.dispatch({
  type: 'SET_ZCASH_AUTH',
  username: 'myrpcusername',
  password: 'myrpcpassword',
})
// http://localhost:8232 is the default so you may not have to do this
client.dispatch({
  type: 'SET_ZCASH_CLIENT_CONFIG',
  client_config: {
    url: 'http://localhost:8232
  },
})
```

Now you can interact with zcashd:

```
client.z_gettotalbalance()
```

This stores the return data in an attribute of the same name.
So, any component that wants to use this data can:

```
connect((state) => {
  return {
    z_gettotalbalance: state.z_gettotalbalance,
  }
})(MyComponent)
```

The source of `zcash-redux/Client` should be easy to read and should be
intuitive based on https://zcash-rpc.github.io/.