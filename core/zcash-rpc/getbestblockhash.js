var client = require('./client')

module.exports = () => {
  return new Promise(function(resolve, reject) {
    client.request('getbestblockhash', [], function(err, response) {
      console.log(err)
      console.log(response)
      if (err) reject(err)
      resolve(response)
    })
  })
}
