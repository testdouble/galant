const express = require('express')
const next = require('next')
const router = require('./router')
const sockets = require('signal-master/sockets')

function createServer (options) {
  const nextServer = next({
    dev: options.env !== 'production'
  })
  const nextRequestHandler = nextServer.getRequestHandler()

  return nextServer.prepare()
    .then(function () {
      const expressServer = express()

      expressServer.use(router)
      expressServer.get('*', nextRequestHandler)

      const _listen = expressServer.listen
      expressServer.listen = function (...args) {
        const httpServer = _listen.apply(expressServer, args)
        sockets(httpServer, {})
        return httpServer
      }

      return expressServer
    })
}

module.exports = createServer
