import Place from "../models/placeSchema.js";
import Nation from "../models/nationSchema.js";

export const getPlaces = async (req, res) => {
  try {
    const nationId = req.params.id;
    const places = await Place.find({ nation: nationId })
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
      nationId,
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
      nation: nationId,
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
      .then(async (place) => {
        const nation = await Nation.findOne({ _id: place.nation })
          .then((nation) => {
            nation.data.roleplay.credits -= place.cost;
            nation.save();
            res.status(201).json({ place, nation, message: "lieu créé" });
          })
          .catch((error) => {
            res.status(400).json({
              message: `certaines informations sont erronées ou manquantes`,
              erreur: error.message,
            });
          });
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
          console.log(error);
        }
      });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
