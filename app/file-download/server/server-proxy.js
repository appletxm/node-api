var app = express()
const port = 3001
const host = '127.0.0.1'


app.listen(port, host, () => {
  console.info('proxy server started at http://' + host + ':' + host)
})
