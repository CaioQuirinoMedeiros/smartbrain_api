const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");

const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

// const db = knex({
//   client: "pg",
//   connection: {
//     host: '127.0.0.1',
//     user: 'postgres',
//     password: 'pedemanga',
//     database: 'smartbrain'
//   }
// });

const db = knex({
  client: "pg",
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: true
  }
});

app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 3001;
app.listen(PORT);

isEmpty = data => {
  return Object.values(data).indexOf("") === -1 ? false : true;
};

app.get("/", (req, res) => {
res.json(`Running on port ${PORT}. Database: ${process.env.DATABASE_URL}`);
});

app.post("/signin", (req, res) => {
  signin.handleSignIn(req, res, db, bcrypt);
});

app.post("/register", (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});

app.get("/profile/:id", (req, res) => {
  profile.handleProfile(req, res, db);
});

app.put("/image", (req, res) => {
  image.handleImage(req, res, db);
});

app.post("/image", (req, res) => {
  image.handleApiCall(req, res);
});
