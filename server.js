require('dotenv').config();
const express = require('express');
const app = express();
const layouts = require('express-ejs-layouts');
const axios = require('axios');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('./config/ppConfig');
const isLoggedIn = require('./middleware/isLoggedIn');
const md5 = require('md5');
const methodOverride = require('method-override')
const db = require('./models');
//const { all } = require('sequelize/types/lib/operators');
const path = require('path');
const { response } = require('express');

// Marvel API access
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


//////////////////// ***** ROUTES ***** /////////////////////

// GET index 
app.get('/', (req, res) => {
    res.render('index');
});

// GET comics /comics
app.get('/comics', (req, res) => {
    // console.log(req.url)
    const marvelUrl = `https://gateway.marvel.com/v1/public${req.url}`
    axios.get(marvelUrl, {
        params: {
            ts: ts,
            apikey: publickey,
            hash: hash,
        }
    }).then(response => {
        let data = response.data.data.results;
        let comicResults = [];
        
        for (let i = 0; i < data.length; i++) {
            const comicData = {};
            comicData.id = data[i].id;
            console.log(comicData.id);
            comicsImgs = data[i].thumbnail;
            comicData.comicImg = `${comicsImgs.path}.${comicsImgs.extension}`;
            comicResults.push(comicData);
        }
        res.render('comics', { 'data': comicResults });
    })
});

// GET details comics/details/:id
app.get('/details/:id', async (req, res) => {
    let info;
    const marvelUrl = await `https://gateway.marvel.com/v1/public/comics/${req.params.id}`
    axios.get(marvelUrl, {
        params: {
            ts: ts,
            apikey: publickey,
            hash: hash,
        }
    }).then(response => {
        console.log(response.data.data.results[0]);
        info = response.data.data.results[0]
    }).then(response => {
        console.log(info)

        res.render('comicId', { comic: info });
    }).catch(error => {
        console.log(error);
    })
});

// Get favorites collection /favorites
app.get('/favorites', (req, res) => {
    const { id, name, email } = req.user.get();
    db.comicbooks.findAll({
        where: { userId: id },
        //include: [db.user]
    })
        .then((favorite) => {
            if (!favorite) throw Error()
            res.render('favorites', { favorites: favorite })
        })
        .catch((error) => {
            console.log(error)
        })
});

// Post add to a favorites collection
app.post('/new', isLoggedIn, (req, res) => {
    const { id, name, email } = req.user.get();
    db.comicbooks.create({
        title: req.body.title,
        digitalId: req.body.digitalId,
        creators: req.body.creators,
        series: req.body.series,
        year: req.body.year,
        image: req.body.image,
        description: req.body.description,
        userId: id
    })
        .then((post) => {
            res.redirect('favorites')
        })
})

// DELETE destroy a favorite comicsId
app.delete('/delete/:id', isLoggedIn, (req, res) => {
    db.comicbooks.destroy({
        where: { id: req.params.id },
    })
        .then((post) => {
            res.redirect('/favorites')
        })
});

// GET profile index /profile
app.get('/profile', isLoggedIn, (req, res) => {
    const { id, name, email } = req.user.get();
    res.render('profile', { id, name, email });
});
app.put('/profile', isLoggedIn, (req, res) => {
    const { id, name, email } = req.user.get();
    db.user.update({
        name: req.body.name,
    }, {
        where: {
            id: id,
        }
    }).then(numRowsChanged => {
        res.render('profile', { id, name, email });
    });
});


app.use('/auth', require('./controllers/auth'));


const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
    console.log(`With great power, comes great responsibility on port ${PORT} `);
});

module.exports = server;