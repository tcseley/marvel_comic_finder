var express = require('express')
var db = require('../models')
var router = express.Router()

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
        let comic;
        let comicImgs = [];
        for (let i = 0; i < data.length; i++) {
            // console.log(data[i].images);
            comic = data[i].images;
            comic.map((images) => {
                // console.dir(images);
                console.log(`${images.path}.${images.extension}`);
                comicImg = `${images.path}.${images.extension}`;
                comicImgs.push(comicImg);
            })
        }
        res.render('results', { 'data': comicImgs });
    }) 
});