import Place from "../models/placeSchema.js";

export const getPlaces = async (req, res) => {
  try {
    const nationId = req.params.id;
    const places = await Place.find({ _id: nationId })
      .then((places) => {
        res.status(200).json(places);
      })
      .catch((error) => {
        res.status(400).json({ message: error.message });
      });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
