const bodyParser = require('body-parser')
const express = require('express')
const rooms = require('./rooms')
const router = express()
const users = require('./users')

router.use(bodyParser.json())

router.get('/up', function (req, res) {
  res.send('OK')
})

router.get('/rooms', function (req, res) {
  res.send(rooms.getAll())
})

router.put('/rooms/:name', function (req, res) {
  res.send(rooms.upsert(req.params.name))
})

router.delete('/rooms/:name', function (req, res) {
  rooms.remove(req.params.name)

  res.status(204).end()
})

router.post('/rooms/:name/join', function (req, res) {
  let user = users.get(req.body.name)

  if (!user) {
    user = users.upsert(req.body.name, req.body)
  }

  if (user.room) {
    rooms.removeFromRoom(user.room, req.body)
    user.room = null
  }

  rooms.upsert(req.params.name)
  rooms.addToRoom(req.params.name, req.body)

  user.room = req.params.name

  res.send(rooms.get(req.params.name))
})

module.exports = router
