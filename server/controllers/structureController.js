import Structure from "../models/structureSchema.js";
import { deleteFile } from "../services/fileService.js";
import { createOfficialId, handleError } from "../utils/functions.js";

export const createStructure = async (req, res) => {
  try {
    const { name, owner, description, link } = req.body;
    const officialId = createOfficialId("s");
    const structure = new Structure({
      officialId,
      name,
      description,
      owner,
      members: [owner],
      link,
    });
    await structure.save();
    res.status(201).json({ structure, infoType: "new" });
  } catch (error) {
    if (error.code === 11000) {
      console.error(error);
      res.status(400).json({ infoType: "11000" });
    } else {
      handleError(error, res);
    }
  }
};

export const getStructure = async (req, res) => {
  const id = req.params.id;
  try {
    const structure = await Structure.findOne({
      officialId: id,
      banished: false,
    });
    if (!structure) {
      let error = new Error();
      error.code = 404;
      throw error;
    }
    res.status(200).json({
      structure,
    });
  } catch (error) {
    handleError(error, res);
  }
};

export const getStructures = async (req, res) => {
  try {
    const searchText = req.query.texteRecherche;
    if (searchText) {
      const structures = await Structure.find({
        name: { $regex: searchText, $options: "i" },
        banished: false,
      });
      res.status(200).json(structures);
    } else {
      const structures = await Structure.find({ banished: false });
      res.status(200).json(structures);
    }
  } catch (error) {
    handleError(error, res);
  }
};

export const updateStructure = async (req, res) => {
  try {
    const { name, owner, description, image, members, establishments, link } =
      req.body;
    const structure = await Structure.findOne({ owner: req.userId });
    if (!structure) {
      return res.status(404).json({ infoType: "404" });
    }
    structure.name = name;
    structure.owner = owner;
    structure.description = description;
    structure.image = image;
    structure.members = members;
    structure.establishments = establishments;
    structure.link = link;
    await structure.save();
    res.status(200).json({ structure, infoType: "update" });
  } catch (error) {
    handleError(error, res);
  }
};

export const deleteStructure = async (req, res) => {
  try {
    const structure = await Structure.findOne({ owner: req.userId });
    if (!structure) {
      return res.status(404).json({ infoType: "404" });
    }
    if (structure.image != "") {
      const uuid = structure.image.replace("https://ucarecdn.com/", "");
      await deleteFile(uuid);
    }
    await Structure.findByIdAndDelete(structure._id);
    res.status(200).json({ structure, infoType: "delete" });
  } catch (error) {
    handleError(error, res);
  }
};
