const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");
require("dotenv").config();

const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

const connection = {
  host: "127.0.0.1",
  user: "postgres",
  password: "pedemanga",
  database: "smartbrain"
};

const db = knex({
  client: "pg",
  connection
});

app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 3333;
app.listen(PORT);

isEmpty = data => {
  return Object.values(data).indexOf("") === -1 ? false : true;
};

validateEmail = email => {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return re.test(String(email).toLowerCase());
};

app.get("/", (req, res) => {
  res.json(`Running on port ${PORT}`);
});

app.post("/register", (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});

app.post("/signin", (req, res) => {
  signin.handleSignIn(req, res, db, bcrypt);
});

app.get("/profile/:id", (req, res) => {
  profile.handleProfile(req, res, db);
});

app.post("/image", async (req, res) => {
  const clarifaiResponse = await image.handleApiCall(req);

  if (!clarifaiResponse.success)
    return res.status(400).send({ message: "Erro ao processar imagem" });

  const updateEntries = await image.updateEntries(req, db);

  if (!updateEntries.success)
    return res.status(400).send({ message: "Erro ao validar usuário" });

  return res
    .status(201)
    .send({
      regions: clarifaiResponse.regions,
      entries: updateEntries.entries
    });
});
