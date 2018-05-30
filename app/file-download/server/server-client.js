const express = require('express')
const fs = require('fs')
const path = require('path')
const http = require('http')

const app = express()
const port = 3003
const host = '127.0.0.1'

function getExcelFile (options, request, response, next) {
  let req, body

  req = http.request(options, function (res) {
    console.log('[PROXY STATUS]: ' + res.statusCode)
    console.log('[PROXY HEADERS]: ' + JSON.stringify(res.headers))

    res.setEncoding('utf8')
    // send data to response method 1
    res.on('data', function (chunk) {
      body += chunk
    })

    // send data to response method 2
    // res.pipe(response)
    res.on('end', function () {
      console.info('[PROXY RESPONSE COMPLETE]', body)
      response.headers = res.headers
      response.send(body)
      response.end()
    })
  })

  req.write('abc\n')
  req.on('error', function (e) {
    console.log('problem with request: ' + e.message)
  })
  req.end(function () {
    console.info('[PROXY Request success]')
  })
}

// app.use('/', (req, res, next) => {
//   next()
// })

// app.get('/', (req, res, next) => {
//   let html = fs.readFileSync(path.resolve(__dirname, './index.html'))
//   res.setHeader('Content-Type', 'text/html;charset=utf-8')
//   res.end(html, 'utf8')
//   next()
// })

app.get('/excel', (req, res, next) => {
  getExcelFile({
    host: '127.0.0.1',
    port: 3001,
    method: 'GET',
    path: 'excel'
  }, req, res, next)
// res.send('aaaaaaaaaaa')
// res.end()
// next()
})

app.listen(port, host, () => {
  console.info('client started at http://' + host + ':' + port)
})
