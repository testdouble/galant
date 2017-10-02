const express = require('express')
const rooms = require('./rooms')
const router = express()

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

module.exports = router
