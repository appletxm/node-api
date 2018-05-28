const getExcelFileFn = require('./get-config')
const {columns, data} = require('./data')

function getExcelFile () {
  let excelFile = getExcelFileFn(columns, data)
  return excelFile
}

module.exports = {getExcelFile}
