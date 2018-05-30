const express = require('express')
const app = express()

const port = 3002
const host = '127.0.0.1'

app.listen(port, host, () => {
  console.log('client server start at http://' + host + ':' + port)
})
