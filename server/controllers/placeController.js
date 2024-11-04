import Place from "../models/placeSchema.js";
import Nation from "../models/nationSchema.js";
import User from "../models/userSchema.js";
import { createOfficialId } from "../utils/functions.js";
import { COSTS, QUOTAS } from "../settings/const.js";

export const placesCount = async (req, res) => {
  try {
    Place.countDocuments({})
      .then((count) => {
        res.status(200).json(count);
      })
      .catch((error) => {
        console.error(error);
        res.status(400).json({
          infoType: "400",
        });
      });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      infoType: "400",
    });
  }
};

export const getPlaces = async (req, res) => {
  const nationId = req.params.id;
  try {
    await Place.find({ nation: nationId })
      .then((places) => {
        res.status(200).json(places);
      })
      .catch((error) => {
        console.error(error);
        res.status(400).json({
          infoType: "400",
        });
      });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      infoType: "400",
    });
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
    console.error(error);
    res.status(404).json({
      infoType: "404",
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
    console.error(error);
    res.status(404).json({
      infoType: "404",
    });
  }
};

export const createPlace = async (req, res) => {
  try {
    const { nation, parentId, name, type, description, image } = req.body;
    const placeNation = await Nation.findOne({ officialId: nation });
    const user = await User.findOne({ officialId: req.userId });
    if (
      placeNation.data.roleplay.places < QUOTAS.PLACES ||
      user.credits >= COSTS.PLACES
    ) {
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
      if (
        placeNation.data.roleplay.capital === "" ||
        placeNation.data.roleplay.capital == undefined
      ) {
        placeNation.data.roleplay.capital = place.officialId;
      }
      placeNation.data.roleplay.places += 1;
      await placeNation.save();
      if (placeNation.data.roleplay.places > QUOTAS.PLACES) {
        user.credits -= COSTS.PLACES;
        await user.save();
      }
      res
        .status(201)
        .json({ place, nation: placeNation, user, infoType: "new" });
    } else {
      res.status(403).json({ infoType: "forbidden" });
    }
  } catch (error) {
    if (error.code === 11000) {
      console.error(error);
      res.status(400).json({ infoType: "11000" });
    } else {
      res.status(400).json({ infoType: "miss" });
      console.error(error);
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
    const user = await User.findOne({ officialId: req.userId });
    const nation = await Nation.findOne({ officialId: place.nation });
    if (!user || !nation) {
      return res.status(404).json({ infoType: "404" });
    }

    if (nation.data.roleplay.capital === place.officialId) {
      nation.data.roleplay.capital = "";
    }
    nation.data.roleplay.population -= place.population;
    nation.data.roleplay.places -= 1;
    await nation.save();
    user.credits += COSTS.PLACES;
    await user.save();
    await Place.updateMany(
      { parentId: id },
      { $set: { parentId: place.parentId } },
    );
    await Place.findByIdAndDelete(place._id);
    res.status(200).json({ place, nation, user, infoType: "delete" });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      infoType: "400",
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
            infoType: "miss",
          });
        });
    } else {
      console.error(error);
      res.status(403).json({
        infoType: "forbidden",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({
      infoType: "400",
    });
  }
};
