const Clarifai = require("clarifai");

const app = new Clarifai.App({ apiKey: process.env.CLARIFAI_KEY });

const handleApiCall = async req => {
  try {
    const response = await app.models.predict(
      Clarifai.FACE_DETECT_MODEL,
      req.body.input
    );

    return { success: true, regions: response.outputs[0].data.regions };
  } catch (err) {
    return { success: false };
  }
};

const updateEntries = async (req, db) => {
  const { id } = req.body;

  try {
    const entries = await db("users")
      .where({ id })
      .increment("entries", 1)
      .returning("entries");

    return { success: true, entries: entries[0] };
  } catch (err) {
    return { success: false };
  }
};

module.exports = { handleApiCall, updateEntries };
