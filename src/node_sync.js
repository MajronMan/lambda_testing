const AWS = require('aws-sdk')
const async = require('async')
const https = require('https')

var lambda = new AWS.Lambda({
    region: "us-east-1",
    httpOptions: {
      agent: new https.Agent({ keepAlive: true })
   }
})

var params = {
  FunctionName: "testFunc",
  Payload: ""
 }

console.time()
async.timesSeries(100, (_, next) => { lambda.invoke(params, next) }, () => {
    console.timeEnd()
})
