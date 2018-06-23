var client = require('./client')

module.exports = (id, verbosity = 0) => {
  // id can be block hash or height, verbosity 0, 1 or 2
  return new Promise(function(resolve, reject) {
    client.request('getbestblockhash', [
      id, verbosity
    ], function(err, response) {
      if (err) reject(err)
      resolve(response)
    })
  })
}
