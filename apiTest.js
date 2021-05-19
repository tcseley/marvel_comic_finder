const axios = require('axios');
const md5 = require('md5');
const { serializeUser } = require('passport');
const db = require('./models');
const comicbook = require('./models/comicbook');

// axios.get('http://gateway.marvel.com/v1/public/comics?apikey=120eb71cf4f4ec6cdb75ad8eb1800b0f')
//     .then(response => {
//         console.log(response.data);
//     });

let publickey = '120eb71cf4f4ec6cdb75ad8eb1800b0f';
let privatekey = 'e2dce3d0321b71e11f382dc41b01d1dcfb2927c9'
let ts = 'hello';

let hash = md5(ts + privatekey + publickey);
console.log(hash);

axios.get('http://gateway.marvel.com/v1/public/comics', {
    params: {
        ts: ts,
        apikey: publickey,
        hash: hash,
    }
})
.then(response => {
//const character = response.data.data.results[0].characters.collectionURI;
console.log(response.data.data.results[2].characters);
    
})
.catch(error => {
console.log(error);
});
