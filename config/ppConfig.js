const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const db = require('../models');

const STRATEGY = new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'

}, async (email, password, cb) => {
    try {
        const user = await db.user.findOne({
            where: { email }
        });
        if (!user || !user.validPassword(password)) {
            cb(null, false);
        } else {
            cb(null, user);
        }
    } catch (err) {
        console.log('---------------Error Below----------------');
        console.log(err);
    }
});

passport.serializeUser((user, cb) => {
    cb(null, user.id);
});

passport.deserializeUser(async (id, cb) => {
    try {
        const user = await db.user.findByPk(id);

        if (user) {
            cb(null, user)
        }
    } catch (err) {
        console.log('Hey ... There is an error');
        console.log(err);
    }
});

passport.use(STRATEGY);

module.exports = passport;