import Tile from "../models/tileSchema.js";
import Nation from "../models/nationSchema.js";
import { DEFAULT_COSTS, DEFAULT_QUOTAS } from "../settings/const.js";
import { handleError } from "../utils/functions.js";
import { verifyNationOwner } from "../services/userService.js";
import {
  getCosts,
  getQuotas,
  getValueFromParam,
  payCreditsFromBank,
  recoverCreditToBank,
} from "../services/paramService.js";

export const createTile = async (req, res) => {
  try {
    const { nationOfficialId, title, description, value } = req.body;
    const userId = req.userId;
    const nationsTilesCount = await Tile.countDocuments({ nationOfficialId });
    const nation = await Nation.findOne({ officialId: nationOfficialId });
    const quota = getValueFromParam(
      await getQuotas(),
      "tiles",
      DEFAULT_QUOTAS.TILES,
    );
    const cost = getValueFromParam(
      await getCosts(),
      "tile",
      DEFAULT_COSTS.TILES,
    );
    const freeTile = nationsTilesCount < quota;
    const enoughMoney = nation.data.roleplay.treasury >= cost;
    const allow =
      verifyNationOwner(userId, nationOfficialId) && (freeTile || enoughMoney);
    if (allow) {
      let updatedNation;
      if (!freeTile) {
        nation.data.roleplay.treasury -= cost;
        recoverCreditToBank(cost);
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
        const quota = getValueFromParam(
          await getQuotas(),
          "tiles",
          DEFAULT_QUOTAS.TILES,
        );
        if (nationsTilesCount + 1 > quota) {
          const cost = getValueFromParam(
            await getCosts(),
            "tile",
            DEFAULT_COSTS.TILES,
          );
          payCreditsFromBank(cost);
          nation.data.roleplay.treasury += cost;
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
