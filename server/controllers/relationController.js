import Relation from "../models/relationSchema.js";
import { createOfficialId, handleError } from "../utils/functions.js";

export const createRelation = async (req, res) => {
  try {
    const { name, description, nations, kind } = req.body;

    const officialId = createOfficialId("d");

    const relation = new Relation({
      officialId,
      name,
      description,
      nations,
      kind,
    });

    try {
      const savedRelation = await relation.save();
      res.status(201).json({ relation: savedRelation, infoType: "new" });
    } catch (error) {
      if (error.code === 11000) {
        return res.status(400).json({
          error: error.keyValue,
          infoType: "11000",
        });
      } else {
        return res.status(400).json({
          error: error.message,
          infoType: "400",
        });
      }
    }
  } catch (error) {
    handleError(error, res);
  }
};

export const getAllRelation = async (req, res) => {
  try {
    const searchText = req.query.texteRecherche;
    if (searchText) {
      const relations = await Relation.find({
        "nations.OfficialId": { $regex: searchText, $options: "i" },
      });
      res.status(200).json(relations);
    } else {
      const relations = await Relation.find({});
      res.status(200).json(relations);
    }
  } catch (error) {
    handleError(error, res);
  }
};

export const updateRelation = async (req, res) => {
  const { officialId, name, description, nations, kind } = req.body;
  try {
    if (nations.length >= 2) {
      const relation = await Relation.findOne({
        officialId,
      });
      if (relation != undefined && relation != null) {
        relation.name = name;
        relation.description = description;
        relation.nations = nations;
        relation.kind = kind;

        const relationInBase = await relation.save();
        res.status(200).json({
          relation: relationInBase,
          infoType: "update",
        });
      } else {
        res.status(400).json({ infoType: "400" });
      }
    } else {
      const relation = await Relation.findOneAndDelete({ officialId });
      relation.nations = [];
      res.status(200).json({
        relation,
        infoType: "update",
      });
    }
  } catch (error) {
    handleError(error, res);
  }
};
