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

export const createPlace = async (req, res) => {
  try {
    const {
      nation,
      buildDate,
      type,
      cost,
      points,
      population,
      name,
      description,
      image,
    } = req.body;

    const place = new Place({
      nation,
      buildDate,
      type,
      cost,
      points,
      population,
      name,
      description,
      image,
    });
    place
      .save()
      .then((place) => {
        res.status(201).json({ place, message: "lieu créé" });
      })

      .catch((error) => {
        if (error.code === 11000) {
          res.status(400).json({
            message: "informations déjà existantes dans la base de données",
            erreur: error.keyValue,
          });
        } else {
          res.status(400).json({
            message: `certaines informations sont erronées ou manquantes`,
            erreur: error.message,
          });
        }
      });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
