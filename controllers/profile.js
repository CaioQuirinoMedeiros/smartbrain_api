const handleProfile = (req, res, db) => {
    const {id} = req.params;
    db.select('*').from('users').where({ id })
    .then(user => {
        if (!user.length) throw Error;
        res.json(user[0]);
    })
    .catch(error => res.status(400).json('error gettind user'))
};

module.exports = { handleProfile };