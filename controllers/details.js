const express = require('express')
var db = require('../models')
var router = express.Router()

router.post('/details', (req, res) => {
  db.comment.create(req.body)
  .then((createdComment) => {
    res.redirect('/comics/' + req.body.comics)
  })
  .catch((err) => {
    console.log('Error in POST /comments', err)
    res.send('An error occurred on the server; please check your logs.')
  })
})

module.exports = router