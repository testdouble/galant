const WebSocket = require('faye-websocket')
const rooms = require('./rooms')

function handleWebSocket (ws) {
  rooms.on('created', (name) => send({ type: 'rooms:created', name }))
  rooms.on('removed', (name) => send({ type: 'rooms:removed', name }))

  ws.on('message', function (event) {
    console.log('WS message:', event)
  })

  ws.on('close', function (event) {
    console.log('WS close:', event.code, event.reason)
    ws = null
  })

  send({ type: 'hello' })

  function send (data) {
    console.log('WS send:', data)
    return ws.send(JSON.stringify(data))
  }
}

function attachWebSocketHandler (server) {
  server.on('upgrade', function (request, socket, body) {
    if (WebSocket.isWebSocket(request)) {
      handleWebSocket(new WebSocket(request, socket, body))
    }
  })

  return server
}

module.exports = attachWebSocketHandler
