import Tile from "../models/tileSchema.js";
import User from "../models/userSchema.js";

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
    const allow = verifyNationOwner(userId, nationOfficialId);
    if (allow) {
      const tile = new Tile({
        nationOfficialId,
        title,
        description,
        value,
      });
      tile
        .save()
        .then(() => res.status(201).json({ tile, infoType: "new" }))
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
    res.status(400).json({
      infoType: "serverError",
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
    res.status(400).json({
      infoType: "serverError",
    });
  }
};

export const deleteTile = async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.userId;
    const tile = await Tile.findOne({ _id: id });
    if (tile) {
      const allow = verifyNationOwner(userId, tile.nationOfficialId);
      if (allow) {
        await Tile.findByIdAndDelete(tile._id);
        res.status(200).json({ tile, infoType: `delete` });
      } else {
        return res.status(403).json({ infoType: "forbidden" });
      }
    } else {
      return res.status(404).json({ infoType: "404" });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({
      infoType: "serverError",
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
    res.status(400).json({
      infoType: "serverError",
    });
  }
};
