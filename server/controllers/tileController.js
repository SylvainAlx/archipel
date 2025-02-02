import Tile from "../models/tileSchema.js";
import User from "../models/userSchema.js";
import Nation from "../models/nationSchema.js";
import { COSTS, QUOTAS } from "../settings/const.js";
import { handleError } from "../utils/functions.js";

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
    const nationsTilesCount = await Tile.countDocuments({ nationOfficialId });
    const nation = await Nation.findOne({ officialId: nationOfficialId });
    const freeTile = nationsTilesCount < QUOTAS.TILES;
    const enoughMoney = nation.data.roleplay.treasury >= COSTS.TILES;
    const allow =
      verifyNationOwner(userId, nationOfficialId) && (freeTile || enoughMoney);
    if (allow) {
      let updatedNation;
      if (!freeTile) {
        nation.data.roleplay.treasury -= COSTS.TILES;
        updatedNation = await nation.save();
      } else {
        updatedNation = nation;
      }
      const tile = new Tile({
        nationOfficialId,
        title,
        description,
        value,
      });
      await tile.save();
      res.status(201).json({ tile, nation: updatedNation, infoType: "new" });
    } else {
      return res.status(403).json({ infoType: "403" });
    }
  } catch (error) {
    handleError(error, res);
  }
};

export const getNationTile = async (req, res) => {
  try {
    const nationId = req.params.id;
    const tiles = await Tile.find({ nationOfficialId: nationId });
    res.status(200).json(tiles);
  } catch (error) {
    handleError(error, res);
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
        const nationsTilesCount = await Tile.countDocuments({
          nationOfficialId: nation.officialId,
        });
        if (nationsTilesCount + 1 > QUOTAS.TILES) {
          nation.data.roleplay.treasury += COSTS.TILES;
        }
        const updatedNation = await nation.save();
        res
          .status(200)
          .json({ tile, nation: updatedNation, infoType: `delete` });
      } else {
        return res.status(403).json({ infoType: "403" });
      }
    } else {
      return res.status(404).json({ infoType: "404" });
    }
  } catch (error) {
    handleError(error, res);
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
      return res.status(403).json({ infoType: "403" });
    }
  } catch (error) {
    handleError(error, res);
  }
};
