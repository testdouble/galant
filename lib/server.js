const express = require('express')
const next = require('next')
const router = require('./router')

function createServer (options) {
  const nextServer = next({
    dir: './src',
    dev: options.env !== 'production'
  })
  const nextRequestHandler = nextServer.getRequestHandler()

  return nextServer.prepare()
    .then(function () {
      const expressServer = express()

      expressServer.use(router)
      expressServer.get('*', nextRequestHandler)

      return expressServer
    })
}

module.exports = createServer
