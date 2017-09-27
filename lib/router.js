const express = require('express')
const router = express()

router.get('/', function (req, res, next) {
  res.send('OK')
})

module.exports = router
