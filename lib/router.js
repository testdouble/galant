const express = require('express')
const router = express()

router.get('/up', function (req, res, next) {
  res.send('OK')
})

module.exports = router
