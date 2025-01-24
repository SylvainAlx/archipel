import Place from "../models/placeSchema.js";
import Nation from "../models/nationSchema.js";
import { createOfficialId } from "../utils/functions.js";
import { COSTS, PLACE_TYPE, QUOTAS } from "../settings/const.js";

export const placesCount = async (req, res) => {
  try {
    const response = await Place.countDocuments({ banished: false });
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const statusCode = error.name === "ValidationError" ? 400 : 500;
    res.status(statusCode).json({
      infoType: statusCode.toString(),
    });
  }
};

export const getPlaces = async (req, res) => {
  const nationId = req.params.id;
  try {
    const places = await Place.find({ nation: nationId, banished: false });
    res.status(200).json(places);
  } catch (error) {
    console.error(error);
    const statusCode = error.name === "ValidationError" ? 400 : 500;
    res.status(statusCode).json({
      infoType: statusCode.toString(),
    });
  }
};

export const getOne = async (req, res) => {
  const id = req.params.id;
  try {
    const place = await Place.findOne({ officialId: id, banished: false });
    res.status(200).json({
      place,
    });
  } catch (error) {
    console.error(error);
    const statusCode = error.name === "ValidationError" ? 400 : 500;
    res.status(statusCode).json({
      infoType: statusCode.toString(),
    });
  }
};

export const getAllPlaces = async (req, res) => {
  try {
    const searchText = req.query.texteRecherche;
    if (searchText) {
      const places = await Place.find({
        name: { $regex: searchText, $options: "i" },
        banished: false,
      });
      res.status(200).json(places);
    } else {
      const places = await Place.find({ banished: false });
      res.status(200).json(places);
    }
  } catch (error) {
    console.error(error);
    const statusCode = error.name === "ValidationError" ? 400 : 500;
    res.status(statusCode).json({
      infoType: statusCode.toString(),
    });
  }
};

export const createPlace = async (req, res) => {
  try {
    const { nation, parentId, name, type, description, image } = req.body;
    const placeNation = await Nation.findOne({ officialId: nation });

    const freePlace = placeNation.data.roleplay.places < QUOTAS.PLACES;
    const enoughMoney = placeNation.data.roleplay.treasury >= COSTS.PLACES;

    if (freePlace || enoughMoney) {
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
      await place.save();
      // Capitale par défaut si non définie
      if (
        (placeNation.data.roleplay.capital === "" ||
          placeNation.data.roleplay.capital == undefined) &&
        place.type === PLACE_TYPE.city
      ) {
        placeNation.data.roleplay.capital = place.officialId;
      }

      if (!freePlace) {
        placeNation.data.roleplay.treasury -= COSTS.PLACES;
      }

      placeNation.data.roleplay.places += 1;

      await placeNation.save();
      res.status(201).json({ place, nation: placeNation, infoType: "new" });
    } else {
      res.status(403).json({ infoType: "forbidden" });
    }
  } catch (error) {
    if (error.code === 11000) {
      console.error(error);
      res.status(400).json({ infoType: "11000" });
    } else {
      console.error(error);
      res.status(500).json({
        infoType: "500",
        error,
      });
    }
  }
};

export const deletePlace = async (req, res) => {
  try {
    const id = req.params.id;
    const place = await Place.findOne({ officialId: id });
    if (!place) {
      return res.status(404).json({ infoType: "404" });
    }
    const nation = await Nation.findOne({ officialId: place.nation });
    if (!nation) {
      return res.status(404).json({ infoType: "404" });
    }

    if (nation.data.roleplay.capital === place.officialId) {
      nation.data.roleplay.capital = "";
    }
    nation.data.roleplay.population -= place.population;

    if (nation.data.roleplay.places > QUOTAS.PLACES) {
      nation.data.roleplay.treasury += COSTS.PLACES;
    }

    nation.data.roleplay.places -= 1;

    await nation.save();
    await Place.updateMany(
      { parentId: id },
      { $set: { parentId: place.parentId } },
    );
    await Place.findByIdAndDelete(place._id);
    res.status(200).json({ place, nation, infoType: "delete" });
  } catch (error) {
    console.error(error);
    const statusCode = error.name === "ValidationError" ? 400 : 500;
    res.status(statusCode).json({
      infoType: statusCode.toString(),
    });
  }
};

export const updatePlace = async (req, res) => {
  try {
    const nation = await Nation.findOne({ owner: req.userId });
    if (req.body.nation === nation.officialId) {
      const place = await Place.findOne({ _id: req.body._id });
      place.nation = req.body.nation;
      place.parentId = req.body.parentId;
      place.type = req.body.type;
      place.population = req.body.population;
      place.name = req.body.name;
      place.description = req.body.description;
      place.image = req.body.image;
      const placeInBase = await place.save();
      res.status(200).json({ place: placeInBase, infoType: "update" });
    } else {
      console.error(error);
      res.status(403).json({
        infoType: "403",
      });
    }
  } catch (error) {
    console.error(error);
    const statusCode = error.name === "ValidationError" ? 400 : 500;
    res.status(statusCode).json({
      infoType: statusCode.toString(),
    });
  }
};
