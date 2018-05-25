const express = require('express')
const nodeExcel = require('excel-export')
const app = express()
const excel = require('../excel')

const port = 3001
const host = '127.0.0.1'

app.get('/Excel', (req, res) => {
  // const fs = require('fs')
  // const path = require('path')
  // let filePath = path.resolve('./app/file-download/excel/HelloWorld.vue')
  // console.info(filePath)
  // let vueFile = fs.readFileSync(filePath, 'binary')
  // console.info(vueFile)
  // res.setHeader('Content-Type', 'application/x-javascript;utf-8')
  // res.setHeader('Content-Disposition', 'attachment; filename=' + 'Report.js')
  // res.end(vueFile, 'binary')

  let excelFile = excel.getExcelFile()
  res.setHeader('Content-Type', 'application/vnd.openxmlformats')
  res.setHeader('Content-Disposition', 'attachment; filename=' + 'Report.xlsx')
  res.end(excelFile, 'binary')
})

app.listen(port, host, () => {
  console.log('server start at http://' + host + ':' + port)
})
