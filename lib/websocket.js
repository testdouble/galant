const WebSocket = require('faye-websocket')
const rooms = require('./rooms')

function handleWebSocket (ws) {
  attachDataEvent(rooms, 'rooms', 'users:added')
  attachDataEvent(rooms, 'rooms', 'users:removed')
  attachDataEvent(rooms, 'rooms', 'created')
  attachDataEvent(rooms, 'rooms', 'removed')

  ws.on('open', function (event) {
    console.log('WS open:', event)

    rooms
      .getAll()
      .map((room) => room.name)
      .forEach(handleDataEvent('rooms', 'created'))
  })

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

  function handleDataEvent (namespace, type) {
    return (data) => send({ type: `${namespace}:${type}`, data })
  }

  function attachDataEvent (source, namespace, type) {
    const handler = handleDataEvent(namespace, type)

    ws.on('open', () => source.on(type, handler))
    ws.on('close', () => source.off(type, handler))
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
