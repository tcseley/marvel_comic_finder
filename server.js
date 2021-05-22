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



//////////////////// ***** ROUTES ***** /////////////////////


// GET index
app.get('/', isLoggedIn, (req, res) => {
  const { id, name, email } = req.user.get();
  res.render('index');
});



// GET profile index /profile
app.get('/profile', isLoggedIn, (req, res) => {
  const { id, name, email } = req.user.get();
  res.render('profile', { id, name, email });
});

// GET profile new /profile/new
app.get('/profile/new', (req, res) => {
    res.send('NEW profile/new');
});

// POST profile create /profile
app.post('/profile', (req, res) => {
    res.send('CREATE profile');
});

// GET profile show /profile/:id
app.get('/profile/:id', (req, res) => {
    res.send(' SHOW profile/:id');
});

// GET profile edit /profile/edit/:id
app.get('/profile/edit/:id', (req, res) => {
    res.send(' EDIT profile/edit/:id');
});

// PUT profile update /profile/:id
app.put('/profile/:id', (req, res) => {
    res.send('UPDATE profile/:id');
});

// DELETE profile destroy /profile/:id
app.delete('/profile/:id', (req, res) => {
    res.send('DELETE profile/:id');
});




// GET comics index /comics
app.get('/comics', isLoggedIn, (req, res) => {
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
        res.render('comics', { 'data': comicImgs });
    }) 
});

//GET comics new /comics/new
app.get('/comics/new', (req, res) => {
    res.send('NEW comics/new');
});

//POST comics create /comics
app.post('/comics', (req, res) => {
    res.send('CREATE comics');
});

// GET comics show /comics/:id
app.get('/comics/:id', (req, res) => {
    res.send('SHOW comics/:id');
});

// GET comics edit /comics/edit/:id
app.get('/comics/edit/:id', (req, res) => {
    res.send('EDIT comics/edit/:id');
});

// PUT comics update /comics/:id
app.put('/comics/:id', (req, res) => {
    res.send('UPDATE comics/:id');
});

// DELETE comics destroy /comics/:id
app.delete('/comics/:id', (req, res) => {
    res.send('DESTROY comics/:id');
});




// GET details index /details
app.get('/details', isLoggedIn, (req, res) => {
    const { id, name, email } = req.user.get();
    res.render('INDEX /details', { id, name, email });
});

// GET details new /details/new
app.get('/details/new', (req, res) => {
    res.send('NEW details/new');
});

// POST details create /details 
app.post('/details', (req, res) => {
    res.send('CREATE details');
});

// GET details show /details/:id
app.get('/details/:id', (req, res) => {
    res.send('SHOW details/:id');
});

//GET details edit /details/edit/:id
app.get('/details/edit/:id', (req, res) => {
    res.send('EDIT details/edit/:id');
});

// PUT details update /details/:id
app.put('/details/:id', (req, res) => {
    res.send('UPDATE details/:id');
});
// DELETE details destroy /details/:id
app.delete('/details/:id', (req, res) => {
    res.send('DESTROY details/:id');
});


app.use('/auth', require('./controllers/auth'));


const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`With great power, comes great responsibility on port ${PORT} `);
});

module.exports = server;