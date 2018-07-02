import stdrpc from 'stdrpc'

import store from 'state/store'


class Client {
  constructor() {
    const { client_config, auth } = store.getState()
    this.rpc = stdrpc({
      ...auth,
      ...client_config,
    })
  }

  start() {
    this.z_gettotalbalance()
    this.z_listaddresses()
  }

  z_gettotalbalance() {
    return this.rpc.z_gettotalbalance().then((info) => {
      store.dispatch({
        type: 'Z_GETTOTALBALANCE',
        info
      })
    })
  }

  z_listaddresses() {
    return this.rpc.z_listaddresses().then((addresses) => {
      store.dispatch({
        type: 'Z_LISTADDRESSES',
        addresses
      })
    })
  }

  z_sendmany(from, amounts, minconf=1, fee=0.0001) {
    // console.warn(from, amounts, minconf, fee)
    return this.rpc.z_sendmany(
      from, amounts, minconf, fee
    ).catch((err) => {
      console.warn('ERROR', err)
      return err
    })
  }

  z_shieldcoinbase(from, to) {
    return this.rpc.z_shieldcoinbase(from, to).then((result) => {
      store.dispatch({
        type: 'Z_SHIELDCOINBASE',
        result
      })
    }).catch((err) => {
      console.warn('ERROR', err)
      return err
    })
  }
}

// export default new Client()
export default Client
