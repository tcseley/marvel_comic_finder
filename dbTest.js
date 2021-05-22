// const axios = require('axios');
// const md5 = require('md5');
// const { serializeUser } = require('passport');
// const db = require('./models');
// const comicbook = require('./models/comicbooks');

// axios.get('http://gateway.marvel.com/v1/public/comics?apikey=120eb71cf4f4ec6cdb75ad8eb1800b0f')
//   .then(response => {
//        console.log(response.data);
//   });

// let publickey = '120eb71cf4f4ec6cdb75ad8eb1800b0f';
// let privatekey = 'e2dce3d0321b71e11f382dc41b01d1dcfb2927c9'
// let ts = 'hello';

// let hash = md5(ts + privatekey + publickey);
// console.log(hash);

// axios.get('http://gateway.marvel.com/v1/public/comics', {
//     params: {
//         ts: ts,
//         apikey: publickey,
//         hash: hash,
//     }
//})
    // .then(response => {
    //     let data = response.data.data.results
    //     for (let i = 0; i < data.length; i++) {
    //         let comic = data[i];
    //         console.log(comic.title);
            //let image = comic.title.path+comic.title.extension
        //}
        //const character = response.data.data.results[0].characters.collectionURI;
        //console.log(response.data.data.results[0].creators.items[0].name);
        // console.log(response.data.data.results[10].thumbnail);
        // let image = response.data.data.results[10].thumbnail.path+response.data.data.results[10].thumbnail.extension (study these, reverse engineer)
// })
// .catch(error => {
//     console.log(error);
// });

// GET details index /details
// app.get('/details', isLoggedIn, (req, res) => {
//     const { id, name, email } = req.user.get();
//     res.render('details', {id, name, email});
// });


// // GET profile new /profile/new
// app.get('/profile/new', (req, res) => {
//     res.send('NEW profile/new');
// });

// // POST profile create /profile
// app.post('/profile', (req, res) => {
//     res.send('CREATE profile');
// });

// // GET profile show /profile/:id
// app.get('/profile/:id', (req, res) => {
//     res.send(' SHOW profile/:id');
// });

// // GET profile edit /profile/edit/:id
// app.get('/profile/edit/:id', (req, res) => {
//     res.send(' EDIT profile/edit/:id');
// });

// // PUT profile update /profile/:id
// app.put('/profile/:id', (req, res) => {
//     res.send('UPDATE profile/:id');
// });

// // DELETE profile destroy /profile/:id
// app.delete('/profile/:id', (req, res) => {
//     res.send('DELETE profile/:id');
// });

//////////////////////////////////

// //GET comics new /comics/new
// app.get('/comics/new', (req, res) => {
//     res.send('NEW comics/new');
// });

// //POST comics create /comics
// app.post('/comics', (req, res) => {
//     res.send('CREATE comics');
// });

// // GET comics show /comics/:id
// app.get('/comics/:id', (req, res) => {
//     res.send('SHOW comics/:id');
// });

// // GET comics edit /comics/edit/:id
// app.get('/comics/edit/:id', (req, res) => {
//     res.send('EDIT comics/edit/:id');
// });

// // PUT comics update /comics/:id
// app.put('/comics/:id', (req, res) => {
//     res.send('UPDATE comics/:id');
// });

// // DELETE comics destroy /comics/:id
// app.delete('/comics/:id', (req, res) => {
//     res.send('DESTROY comics/:id');
// });

//////////////////////////////////////////

// // GET details new /details/new
// app.get('/details/new', (req, res) => {
//     res.send('NEW details/new');
// });

// // POST details create /details 
// app.post('/details', (req, res) => {
//     res.send('CREATE details');
// });

// // GET details show /details/:id
// app.get('/details/:id', (req, res) => {
//     res.send('SHOW details/:id');
// });

// //GET details edit /details/edit/:id
// app.get('/details/edit/:id', (req, res) => {
//     res.send('EDIT details/edit/:id');
// });

// // PUT details update /details/:id
// app.put('/details/:id', (req, res) => {
//     res.send('UPDATE details/:id');
// });
// // DELETE details destroy /details/:id
// app.delete('/details/:id', (req, res) => {
//     res.send('DESTROY details/:id');
// });

// db.comicbooks.create({
//   title: 'Avengers'
// }).then(function(team) {
//     console.log('Created: ', team.title);
// });

// db.comicbooks.findAll()
//     .then(function (team) {
//     console.log('Found: ', team.title);
// });

// In Comic model:
//Title, issue#, description, series.name, image    