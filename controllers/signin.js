const handleSignIn = async (req, res, db, bcrypt) => {
  if (isEmpty(req.body))
    return res.status(400).json("Preencha seu e-mail e senha");

  const { email, password } = req.body;

  try {
    let user = await db
      .first("*")
      .from("users")
      .where("email", email);

    const isValid = bcrypt.compareSync(password, user.password);

    user = Object.keys(user)
      .filter(key => key !== "password")
      .reduce((obj, key) => {
        obj[key] = user[key];
        return obj;
      }, {});

    return isValid
      ? res.status(200).send(user)
      : res.status(400).send({ message: "Senha incorreta" });
  } catch (err) {
    return res.status(400).send({ message: "Usuário não encontrado" });
  }
};

module.exports = { handleSignIn };
