const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middleware/isLoggedIn');



// GET profile index /profile
router.get('/profile', isLoggedIn, (req, res) => {
    const { id, name, email } = req.user.get();
    res.render('./router/profile', { id, name, email });
});

// GET profile new /profile/new
router.get('/profile/new', (req, res) => {
    res.send('NEW profile/new');
});

// POST profile create /profile
router.post('/profile', (req, res) => {
    res.send('CREATE profile');
});

// GET profile show /profile/:id
router.get('/profile/:id', (req, res) => {
    res.send('SHOW profile/:id');
});

// GET profile edit /profile/edit/:id
router.get('/profile/edit/:id', (req, res) => {
    res.send('EDIT profile/edit/:id');
});

// PUT profile update /profile/:id
router.put('/profile/:id', (req, res) => {
    res.send('UPDATE profile/:id');
});

// DELETE profile destroy /profile/:id
router.delete('/profile/:id', (req, res) => {
    res.send('DELETE profile/:id');
});

module.exports = router;
