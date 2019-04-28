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
            host : process.env.DATABASE_URL,
            ssl: true
        }
    }
);

db.select('*').from('users')
    .then(data => console.log);

app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`running on port ${PORT}`));

isEmpty = (data) => {
    return Object.values(data).indexOf('') === -1 ? false : true;
}

app.get('/', (req, res) => { res.json(`WORKING ON PORT ${PORT}`) });

app.post('/signin', (req, res) => { signin.handleSignIn(req, res, db, bcrypt) });

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) });

app.get('/profile/:id', (req, res) => { profile.handleProfile(req, res, db) });

app.put('/image', (req, res) => { image.handleImage(req, res, db) });

app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) });