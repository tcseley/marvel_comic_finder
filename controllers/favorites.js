const express = require('express')
const db = require('../models')
const router = express.Router()
const isLoggedIn = require('./middleware/isLoggedIn');
//const router = require("./auth");



// router.post('favorites', isLoggedIn(req, res)) => {
//     console.log(req.body)
//     db.users.create(req.body)

// });

// db.comicbooks.create({
//     title: 'Avengers'
//   }).then(function(team) {
//       console.log('Created: ', team.title);
//   });
  
//   db.comicbooks.findAll()
//       .then(function (team) {
//       console.log('Found: ', team.title);
//   });

module.exports = router;