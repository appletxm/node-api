#!/usr/bin/env node

const repl = require('repl')
let userName
let password
let passwordStr = ''
let isInputPassword = false

let rName = repl.start({
  prompt: '> input your name and password: ',
  // input: process.stdin,
  // output: process.stdout,
  eval: function (cmd, context, filename, callback) {
    if (!userName) {
      if (cmd) {
        userName = cmd
        isInputPassword = true
        console.info('input passwrod:')
      } else {
        console.info('input a correct name:')
      }
    } else {
      if (cmd) {
        isInputPassword = false
        password = cmd
        // callback()
        console.info('sys running.....', userName, password, passwordStr)
      } else {
        console.info('input a correct password:')
      }
    }

  },
  writer: function (cmd, context, filename, callback) {
    console.info('===writer===')
  }
})

process.stdin.on('data', (res) => {
  let maskStr

  if (isInputPassword === true) {
    process.stdout.write('')
    // process.stdout.write(res, 'utf-8', (data) => {
    //   console.info('data', res)
    //   return false
    // })
    // passwordStr += res
    // console.info('=====' + res)
    // maskStr = res.length > 0 ? ('*').repeat(passwordStr.length) : ''
  }
})

process.stdout.once('drain', () => {
  console.info('=====')
})
