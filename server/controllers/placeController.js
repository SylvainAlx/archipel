import Place from "../models/placeSchema.js";
import Nation from "../models/nationSchema.js";
import { createOfficialId } from "../utils/functions.js";

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

export const getOne = async (req, res) => {
  try {
    const id = req.params.id;
    const place = await Place.findOne({ officialId: id });
    res.status(200).json({
      place,
    });
  } catch (error) {
    res.status(404).json({
      message: "aucun lieu à afficher",
      erreur: error.message,
    });
  }
};

export const getAllPlaces = async (req, res) => {
  try {
    const places = await Place.find({});
    res.status(200).json(places);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const createPlace = async (req, res) => {
  try {
    const { nation, parentId, name, type, description, image, builds } =
      req.body;

    const officialId = createOfficialId("p");

    const place = new Place({
      nation,
      officialId,
      parentId,
      type,
      slots: 10,
      points: 1,
      population: 0,
      name,
      description,
      image,
      builds,
      children: [],
    });
    place
      .save()
      .then(async (place) => {
        const nation = await Nation.findOne({ officialId: place.nation })
          .then((nation) => {
            if (
              nation.data.roleplay.capital === "" ||
              nation.data.roleplay.capital == undefined
            ) {
              nation.data.roleplay.capital = place.officialId;
            }
            nation.data.roleplay.credits -= 100;
            nation.data.roleplay.points += 1;
            nation.save();
            res.status(201).json({ place, nation, message: "lieu créé" });
          })
          .catch((error) => {
            res.status(400).json({
              message: `certaines informations sont erronées ou manquantes`,
              erreur: error,
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
            erreur: error,
          });
          console.log(error);
        }
      });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deletePlace = async (req, res) => {
  try {
    const id = req.params.id;
    const place = await Place.findOne({ officialId: id });
    if (!place) {
      return res.status(404).json({ message: "Lieu non trouvé" });
    }

    const nation = await Nation.findOne({ officialId: place.nation });
    if (!nation) {
      return res.status(404).json({ message: "Nation non trouvée" });
    }
    if (nation.data.roleplay.capital === place.officialId) {
      nation.data.roleplay.capital = "";
    }
    nation.data.roleplay.population -= place.population;
    nation.data.roleplay.points -= place.points;
    await nation.save();

    await Place.findByIdAndDelete(place._id);

    res.status(200).json({ place, nation, message: `Lieu supprimé` });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Impossible de supprimer le lieu",
      erreur: error.message,
    });
  }
};
