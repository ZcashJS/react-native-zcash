import stdrpc from 'stdrpc'

import getStore from 'zcash-redux/getStore'

const errorf = (err) => {
  console.warn(err)
  return err
}

class Client {
  constructor() {
    this.store = getStore()
    const { zcash_client_config, zcash_auth } = this.store.getState()
    this.rpc = stdrpc({
      ...zcash_auth,
      ...zcash_client_config,
    })
  }

  listtransactions(count = 10, from = 0, includeWatchOnly = false) {
    return this.rpc.listtransactions(
      '*', count, from, includeWatchOnly
    ).then((transactions) => {
      this.store.dispatch({
      type: 'LISTTRANSACTIONS',
        transactions,
      })
      return transactions
    }).catch(errorf)
  }

  z_gettotalbalance() {
    return this.rpc.z_gettotalbalance().then((info) => {
      this.store.dispatch({
        type: 'Z_GETTOTALBALANCE',
        info
      })
      return info
    }).catch(errorf)
  }

  z_listaddresses() {
    return this.rpc.z_listaddresses().then((addresses) => {
      this.store.dispatch({
        type: 'Z_LISTADDRESSES',
        addresses
      })
      return addresses
    }).catch(errorf)
  }

  z_getbalance(address) {
    return this.rpc.z_getbalance(address).then((amount) => {
      this.store.dispatch({
        type: 'Z_GETBALANCE',
        address,
        amount
      })
      return amount
    }).catch(errorf)
  }

  z_sendmany(from, amounts, minconf=1, fee=0.0001) {
    // console.warn(from, amounts, minconf, fee)
    return this.rpc.z_sendmany(
      from, amounts, minconf, fee
    ).catch(errorf)
  }

  z_shieldcoinbase(from, to) {
    return this.rpc.z_shieldcoinbase(from, to).then((result) => {
      store.dispatch({
        type: 'Z_SHIELDCOINBASE',
        result
      })
      return result
    }).catch(errorf)
  }
}

export default Client
