import Tag from "../models/tagSchema.js";

export const getAllTags = async (req, res) => {
  try {
    const tags = await Tag.find();
    res.status(200).json(tags);
  } catch (error) {
    res.status(400).json({ message: "aucuns tags", erreur: error.message });
  }
};

export const tagsCount = async (req, res) => {
  try {
    Tag.countDocuments({})
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
