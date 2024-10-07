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
    tile
      .save()
      .then(() => res.status(201).json({ tile, infoType: "new" }))
      .catch((error) =>
        res.status(400).json({
          erreur: error,
        }),
      );
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

export const deleteTile = async (req, res) => {
  try {
    const id = req.params.id;
    const tile = await Tile.findOne({ _id: id });
    if (!tile) {
      return res.status(404).json({ message: "Tuile non trouvé" });
    }

    await Tile.findByIdAndDelete(tile._id);
    res.status(200).json({ tile, message: `Tuile supprimée` });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Impossible de supprimer la tuile",
      erreur: error.message,
    });
  }
};

export const updateTile = async (req, res) => {
  try {
    const { title, description, value } = req.body;
    const id = req.params.id;
    const tile = await Tile.findOne({ _id: id });
    tile.title = title;
    tile.description = description;
    tile.value = value;
    tile.save();
    res.status(200).json({ tile, infoType: "update" });
  } catch (error) {
    res.status(400).json({
      erreur: error,
    });
  }
};
