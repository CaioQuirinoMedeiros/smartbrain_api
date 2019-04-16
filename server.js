const express = require('express')
const bodyParser = require('body-parser');
const bcrypt =require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex(
    {
        client: 'pg',
        connection: {
            host : '127.0.0.1',
            user : 'postgres',
            password : 'pedemanga',
            database : 'smartbrain'
        }
    }
);

db.select('*').from('users')
    .then(data => console.log);

app = express();
app.use(cors());
app.use(bodyParser.json());

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`running on port ${port}`));

isEmpty = (data) => {
    return Object.values(data).indexOf('') === -1 ? false : true;
}

app.get('/', (req, res) => { res.json(`Working!! running on port ${port}`) });

app.post('/signin', (req, res) => { signin.handleSignIn(req, res, db, bcrypt) });

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) });

app.get('/profile/:id', (req, res) => { profile.handleProfile(req, res, db) });

app.put('/image', (req, res) => { image.handleImage(req, res, db) });

app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) });