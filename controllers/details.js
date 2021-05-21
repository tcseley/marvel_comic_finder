var express = require('express')
var db = require('../models')
var router = express.Router()


router.get('/details', isLoggedIn, (req, res) => {
    const { id, name, email } = req.user.get();
    res.render('details', { id, name, email });
});