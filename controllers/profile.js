const handleProfile = async (req, res, db) => {
  const { id } = req.params;

  try {
    const user = await db
      .first("*")
      .from("users")
      .where({ id });

    return res.status(200).send({ ...user, password: null });
  } catch (err) {
    return res.status(400).send({ message: "Erro ao buscar usuário" });
  }
};

module.exports = { handleProfile };
