import Tile from "../models/tileSchema.js";
import User from "../models/userSchema.js";
import Nation from "../models/nationSchema.js";
import { COSTS, QUOTAS } from "../settings/const.js";

const verifyNationOwner = async (userId, nationId) => {
  const user = await User.findOne({
    officialId: userId,
    "citizenship.nationOwner": true,
    "citizenship.nationId": nationId,
  });
  if (user) {
    return true;
  } else {
    return false;
  }
};

export const createTile = async (req, res) => {
  try {
    const { nationOfficialId, title, description, value } = req.body;
    const userId = req.userId;
    const nationsTiles = await Tile.find({ nationOfficialId });
    const nation = await Nation.findOne({ officialId: nationOfficialId });
    const allow =
      verifyNationOwner(userId, nationOfficialId) &&
      (nationsTiles.length < QUOTAS.TILES ||
        nation.data.roleplay.treasury >= COSTS.TILES);
    if (allow) {
      let updatedNation;
      if (nationsTiles.length > QUOTAS.TILES) {
        nation.data.roleplay.treasury -= COSTS.TILES;
        updatedNation = await nation.save();
      }

      const tile = new Tile({
        nationOfficialId,
        title,
        description,
        value,
      });
      tile
        .save()
        .then(() =>
          res
            .status(201)
            .json({ tile, nation: updatedNation, infoType: "new" }),
        )
        .catch((error) => {
          console.error(error);
          res.status(400).json({
            infoType: "serverError",
          });
        });
    } else {
      return res.status(403).json({ infoType: "forbidden" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      infoType: "500",
      error,
    });
  }
};

export const getNationTile = async (req, res) => {
  try {
    const nationId = req.params.id;
    const tiles = await Tile.find({ nationOfficialId: nationId });
    res.status(200).json(tiles);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      infoType: "500",
      error,
    });
  }
};

export const deleteTile = async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.userId;
    const tile = await Tile.findOne({ _id: id });
    const nation = await Nation.findOne({ officialId: tile.nationOfficialId });
    if (tile && nation) {
      const allow = verifyNationOwner(userId, tile.nationOfficialId);
      if (allow) {
        await Tile.findByIdAndDelete(tile._id);
        nation.data.roleplay.treasury += COSTS.TILES;
        const updatedNation = await nation.save();
        res
          .status(200)
          .json({ tile, nation: updatedNation, infoType: `delete` });
      } else {
        return res.status(403).json({ infoType: "forbidden" });
      }
    } else {
      return res.status(404).json({ infoType: "404" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      infoType: "500",
      error,
    });
  }
};

export const updateTile = async (req, res) => {
  try {
    const { _id, title, description, value } = req.body;
    const userId = req.userId;
    const tile = await Tile.findOne({ _id });
    const allow = verifyNationOwner(userId, tile.nationOfficialId);
    if (allow) {
      tile.title = title;
      tile.description = description;
      tile.value = value;
      const updatedTile = await tile.save();
      res.status(200).json({ tile: updatedTile, infoType: "update" });
    } else {
      return res.status(403).json({ infoType: "forbidden" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      infoType: "500",
      error,
    });
  }
};
