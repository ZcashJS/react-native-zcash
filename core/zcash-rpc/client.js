const jayson = require('jayson')

// TODO: Configure correctly for Bitcoin daemon
module.exports = jayson.client.http({
  username: process.env.ZCASH_RPC_USERNAME,
  password: process.env.ZCASH_RPC_PASSWORD,
  port: 8232,
  version: 1.0,
  headers: {
    'content-type': 'text/plain'
  }
})
