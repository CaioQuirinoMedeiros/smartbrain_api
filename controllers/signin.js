const handleSignIn = (req, res, db, bcrypt) => {
  if (isEmpty(req.body))
    return res.status(400).json("invalid email or password");
  db.select("email", "hash")
    .from("login")
    .where("email", "=", req.body.email)
    .then(data => {
      const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
      if (isValid)
        db.select("*")
          .from("users")
          .where("email", "=", req.body.email)
          .then(user => res.json(user[0]))
          .catch(error => res.status(400).json("error getting the user data"));
      else res.status(400).json("invalid password");
    })
    .catch(() => res.status(400).json("no such email in database"));
};

module.exports = { handleSignIn };
