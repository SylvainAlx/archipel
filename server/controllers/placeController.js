import Place from "../models/placeSchema.js";
import Nation from "../models/nationSchema.js";
import { createOfficialId } from "../utils/functions.js";

export const placesCount = async (req, res) => {
  try {
    Place.countDocuments({})
      .then((count) => {
        res.status(200).json(count);
      })
      .catch((error) => {
        res.status(400).json({ message: error.message });
      });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getPlaces = async (req, res) => {
  const nationId = req.params.id;
  try {
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
  const id = req.params.id;
  try {
    const place = await Place.findOne({ officialId: id });
    res.status(200).json({
      place,
    });
  } catch (error) {
    res.status(404).json({
      message: "[A TRADUIRE] aucun lieu à afficher",
      erreur: error.message,
    });
  }
};

export const getAllPlaces = async (req, res) => {
  try {
    const searchText = req.query.texteRecherche;
    if (searchText) {
      const places = await Place.find({
        name: { $regex: searchText, $options: "i" },
      });
      res.status(200).json(places);
    } else {
      const places = await Place.find({});
      res.status(200).json(places);
    }
  } catch (error) {
    res.status(404).json({ message: "[A TRADUIRE] aucun lieux" });
  }
};

export const createPlace = async (req, res) => {
  try {
    const { nation, parentId, name, type, description, image } = req.body;

    const officialId = createOfficialId("p");

    const place = new Place({
      nation,
      officialId,
      parentId,
      type,
      population: 0,
      name,
      description,
      image,
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
            nation.data.roleplay.places += 1;
            nation.save();
            res.status(201).json({ place, nation, infoType: "new" });
          })
          .catch((error) => {
            res.status(400).json({
              message: `[A TRADUIRE] certaines informations sont erronées ou manquantes`,
              erreur: error,
            });
          });
      })
      .catch((error) => {
        if (error.code === 11000) {
          res.status(400).json({
            message:
              "[A TRADUIRE] informations déjà existantes dans la base de données",
            erreur: error.keyValue,
          });
        } else {
          res.status(400).json({
            message: `[A TRADUIRE] certaines informations sont erronées ou manquantes`,
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
      return res.status(404).json({ message: "[A TRADUIRE] Lieu non trouvé" });
    }

    const nation = await Nation.findOne({ officialId: place.nation });
    if (!nation) {
      return res
        .status(404)
        .json({ message: "[A TRADUIRE] Nation non trouvée" });
    }
    if (nation.data.roleplay.capital === place.officialId) {
      nation.data.roleplay.capital = "";
    }
    nation.data.roleplay.population -= place.population;
    nation.data.roleplay.places -= 1;
    await nation.save();
    const children = await Place.updateMany(
      { parentId: id },
      { $set: { parentId: place.parentId } },
    );
    await Place.findByIdAndDelete(place._id);
    res
      .status(200)
      .json({ place, nation, message: `[A TRADUIRE] Lieu supprimé` });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "[A TRADUIRE] Impossible de supprimer le lieu",
      erreur: error.message,
    });
  }
};

export const updatePlace = async (req, res) => {
  const nation = await Nation.findOne({ owner: req.userId });
  try {
    if (req.body.nation === nation.officialId) {
      const place = await Place.findOne({ _id: req.body._id });
      place.nation = req.body.nation;
      place.parentId = req.body.parentId;
      place.type = req.body.type;
      place.population = req.body.population;
      place.name = req.body.name;
      place.description = req.body.description;
      place.image = req.body.image;
      place
        .save()
        .then((place) => {
          res.status(200).json({ place, infoType: "update" });
        })
        .catch((error) => {
          console.error(error);

          res.status(400).json({
            message: `[A TRADUIRE] certaines informations sont erronées ou manquantes`,
            erreur: error,
          });
        });
    } else {
      res
        .sendStatus(403)
        .json({ message: "[A TRADUIRE] modification interdite" });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error });
  }
};
