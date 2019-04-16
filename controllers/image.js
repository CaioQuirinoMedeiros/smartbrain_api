const Clarifai = require('clarifai');

// Criando instância da API
const app = new Clarifai.App({ apiKey: '72a95634255440ddba7d07c56ecf174c' });

const handleApiCall = (req, res) => {
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => res.json(data))
    .catch(error => res.status(400).json('unable to work with api'));
}

const handleImage = (req, res, db) => {
    const {id} = req.body;
    db('users').where('id', '=', id).increment('entries', 1)
    .returning('entries')
    .then(entries => res.json(entries[0]))
    .catch(error => res.status(400).json('unable to get entries'))
};

module.exports = { handleImage, handleApiCall };