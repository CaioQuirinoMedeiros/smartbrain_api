const handleRegister = (req, res, db, bcrypt) => {
  if (isEmpty(req.body)) return res.status(400).json("invalid inputs");
  const { name, email, password } = req.body;
  const hash = bcrypt.hashSync(password);
  db.transaction(trx => {
    trx
      .insert({
        hash,
        email
      })
      .into("login")
      .returning("email")
      .then(loginEmail => {
        return trx("users")
          .returning("*")
          .insert({
            email: loginEmail[0],
            name,
            joined: new Date()
          })
          .then(user => res.json(user[0]))
          .catch(error =>
            res.status(400).json({error: "Unable to register"})
          );
      })
      .then(trx.commit)
      .catch(() => {
        res.status(400).json({error: "Email already registered"});
        trx.rollback;
      });
  });
};
module.exports = { handleRegister };
