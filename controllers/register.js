const handleRegister = async (req, res, db, bcrypt) => {
  const { name, email, password } = req.body;

  if (isEmpty(req.body))
    return res.status(400).send({ message: "Preencha os campos obrigatórios" });

  if (password.length < 6)
    return res
      .status(400)
      .send({ message: "A senha deve ter no mínimo 6 digitos" });

  if (!validateEmail(email))
    return res.status(400).send({ message: "E-mail inválido" });

  const hash = bcrypt.hashSync(password);

  try {
    let user = await db("users")
      .returning("*")
      .insert({
        name,
        email,
        password: hash,
        joined: new Date()
      });

    user = Object.keys(user[0])
      .filter(key => key !== "password")
      .reduce((obj, key) => {
        obj[key] = user[0][key];
        return obj;
      }, {});

    res.status(201).send(user);
  } catch (err) {
    res.status(400).send({ message: "Erro ao se registrar", error: err });
  }
};

module.exports = { handleRegister };
