import stdrpc from 'stdrpc'

import store from 'state/store'


class Client {
  // constructor() {
  //   const { client_config, auth } = store.getState()
  //   this.rpc = stdrpc({
  //     ...auth,
  //     ...client_config,
  //   })
  // }
  // Need to instantiate later ... or export the class, I guess.
  init() {
    const { client_config, auth } = store.getState()
    this.rpc = stdrpc({
      ...auth,
      ...client_config,
    })
  }

  start() {
    this.init()
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
}

export default new Client()
