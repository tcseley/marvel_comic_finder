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
const methodOverride = require('method-override')
const db = require('./models');
//const { all } = require('sequelize/types/lib/operators');


const publickey = process.env.PUBLIC_KEY;
const privatekey = process.env.PRIVATE_KEY;
const SECRET_SESSION = process.env.SECRET_SESSION;

let ts = new Date().getTime();
const hash = md5(ts + privatekey + publickey);


app.set('view engine', 'ejs');

app.use(methodOverride('_method'));
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

//const router = require("./auth");
// app.use('/results', require('./controllers/results'));
// app.use('/details', require('./controllers/details'));
// app.use('/favorites', require('./controllers/favorites'));

app.get('/', isLoggedIn, (req, res) => {
  const { id, name, email } = req.user.get();
  res.render('index');
});

app.get('/profile', isLoggedIn, (req, res) => {
  const { id, name, email } = req.user.get();
  res.render('profile', { id, name, email });
});

app.get('/results', isLoggedIn, (req, res) => {
    const { id, name, email } = req.user.get();
    const marvelUrl = 'https://gateway.marvel.com:443/v1/public/comics'
    axios.get(marvelUrl, {
        params: {
            ts: ts,
            apikey: publickey,
            hash: hash,
        }
    })
    .then(response => {
        let data = response.data.data.results;
        console.log(data[0].id);
        let comic;
        let comicImgs = [];
        for (let i = 0; i < data.length; i++) {
            // console.log(data[i].images);
            comic = data[i].images;
            comic.map((images) => {
                const comicData = {};
                //console.log(`${images.path}.${images.extension}`);
                comicData.comicImg = `${images.path}.${images.extension}`;
                comicData.id = data[i].id;
                comicImgs.push(comicData);
            })
        } console.log(comicImgs);
        res.render('results', { 'data': comicImgs });
    }) 
});

app.get('/favorites', isLoggedIn, (req, res) => {
    const { id, name, email } = req.user.get();
    res.render('favorites', { id, name, email });
});

app.get('/details', isLoggedIn, (req, res) => {
    const { id, name, email } = req.user.get();
    res.render('details', { id, name, email });
});

app.use('/auth', require('./controllers/auth'));


const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`With great power, comes great responsibility on port ${PORT} `);
});

module.exports = server;