import Tile from "../models/tileSchema.js";

export const createTile = async (req, res) => {
  try {
    const { nationOfficialId, title, description, value } = req.body;
    const tile = new Tile({
      nationOfficialId,
      title,
      description,
      value,
    });
    tile.save();
    res.status(201).json({ tile, infoType: "new" });
  } catch (error) {
    res.status(400).json({
      erreur: error,
    });
  }
};

export const getNationTile = async (req, res) => {
  try {
    const nationId = req.params.id;
    const tiles = await Tile.find({ nationOfficialId: nationId });
    res.status(200).json(tiles);
  } catch (error) {
    res.status(400).json({
      erreur: error,
    });
  }
};
