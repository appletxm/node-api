#!/usr/bin/env node
 // const repl = require('repl')
// const msg = 'message'
// repl.start('$ ').context.m = msg

// function myEval (cmd, context, filename, callback) {
//   let result
//   try {
//     result = vm.runInThisContext(cmd)
//   } catch (e) {
//     if (isRecoverableError(e)) {
//       return callback(new repl.Recoverable(e))
//     }
//   }
//   callback(null, result)
// }

// function isRecoverableError (error) {
//   if (error.name === 'SyntaxError') {
//     return /^(Unexpected end of input|Unexpected token)/.test(error.message)
//   }
//   return false
// }

/**
 * user customize input
 * **/

const repl = require('repl')
let rName = repl.start({
  prompt: '> input your name: ',
  eval: myEval,
  writer: myWriter
})
let userName = ''
let password = ''

function myEval(cmd, context, filename, callback) {
  callback(null, cmd)
}

function myWriter(output) {
  if (output) {
    userName = output
    repl.start({
      prompt: '> input your pass: ',
      eval: myEval2,
      writer: getPass
    })
  }
}

function myEval2(cmd, context, filename, callback) {
  callback(null, cmd)
  process.exit()
}

function getPass(pass) {
  if (pass) {
    password = pass
    console.info('###we get you username is %s and password is %s', userName, password)
  }
}

rName.on('exit', () => {
  console.log('Received "exit" event from repl!')
  process.exit()
})

/**
 * 
 * repl server
 * **/
// const repl = require('repl')

// const replServer = repl.start({ prompt: '> ' })
// replServer.defineCommand('sayhello', {
//   help: 'Say hello',
//   action(name) {
//     // this.clearBufferedCommand()
//     console.log(`Hello, ${name}!`)
//     // this.displayPrompt()
//   }
// })
// replServer.defineCommand('saybye', function saybye() {
//   console.log('Goodbye!')
//   this.close()
// })

/**
 * 
 * multiple repl
 * **/
// const net = require('net')
// const repl = require('repl')
// let connections = 0

// repl.start({
//   prompt: 'Node.js via stdin> ',
//   input: process.stdin,
//   output: process.stdout
// })

// net.createServer((socket) => {
//   connections += 1
//   repl.start({
//     prompt: 'Node.js via Unix socket> ',
//     input: socket,
//     output: socket
//   }).on('exit', () => {
//     socket.end()
//   })
// }).listen('/tmp/node-repl-sock')

// net.createServer((socket) => {
//   connections += 1
//   repl.start({
//     prompt: 'Node.js via TCP socket> ',
//     input: socket,
//     output: socket
//   }).on('exit', () => {
//     socket.end()
//   })
// }).listen(5001)
