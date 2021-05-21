require('dotenv').config();
const express = require('express');
const layouts = require('express-ejs-layouts');
const app = express();
const axios = require('axios');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('./config/ppConfig');
const isLoggedIn = require('./middleware/isLoggedIn');
const md5 = require('md5');
//const { serializeUser } = require('passport');
const db = require('./models');
//const comicbook = require('./models/comicbook');

const publickey = process.env.PUBLIC_KEY;
const privatekey = process.env.PRIVATE_KEY;
const SECRET_SESSION = process.env.SECRET_SESSION;

let ts = new Date();
const hash = md5(ts + privatekey + publickey);


app.set('view engine', 'ejs');

app.use(require('morgan')('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.use(layouts);

app.use(session({
  secret: SECRET_SESSION,
  resave: false,
  saveUninitialized: true
}));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  console.log(res.locals);
  res.locals.alerts = req.flash();
  res.locals.currentUser = req.user;
  next();
});


app.get('/', isLoggedIn, (req, res) => {
  const { id, name, email } = req.user.get();
  res.render('index');
});

app.get('/profile', isLoggedIn, (req, res) => {
  const { id, name, email } = req.user.get();
  res.render('profile', { id, name, email });
});

app.get('/favorites', isLoggedIn, (req, res) => {
  const { id, name, email } = req.user.get();
  res.render('favorites', { id, name, email });
});


app.get('/results', (req, res) => {
  const marvelUrl = 'http://gateway.marvel.com/v1/public/comics'
  axios.get(marvelUrl, { params: {
      ts: ts,
      apikey: publickey,
      hash: hash,
    }
})
    .then(response => {
      let data = response.data;
      console.log(data)
  })
})

  
app.use('/auth', require('./controllers/auth'));
  
  
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`With great power, comes great responsibility on port ${PORT} `);
});

module.exports = server;
  
