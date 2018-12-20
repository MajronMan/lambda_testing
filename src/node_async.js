const AWS = require('aws-sdk')
const async = require('async')
const https = require('https')


function benchmark(threads, callback) {
  var lambda = new AWS.Lambda({
    region: "us-east-1",
    httpOptions: {
      agent: new https.Agent({
        keepAlive: true,
        maxSockets: threads
    })
   }
  })

  var params = {
    FunctionName: "testFunc",
    Payload: ""
   }

  console.time()
  async.times(threads * 10, (_, next) => { lambda.invoke(params, next) }, (err, data) => {
    console.timeEnd()
    callback()
  })
}

async.eachSeries(Array(100).fill().map((v,i) => (i+1)), benchmark)
