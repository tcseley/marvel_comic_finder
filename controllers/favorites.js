var express = require('express')
var db = require('../models')
var router = express.Router()


const db = require("../models");
const router = require("./auth");

router.get('/favorites', isLoggedIn, (req, res) => {
    const { id, name, email } = req.user.get();
    res.render('favorites', { id, name, email });
});

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