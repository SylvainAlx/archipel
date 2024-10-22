import Relation from "../models/relationSchema.js";
import { createOfficialId } from "../utils/functions.js";

export const createRelation = async (req, res) => {
  try {
    const { name, nations, kind } = req.body;

    const officialId = createOfficialId("d");

    const relation = new Relation({
      officialId,
      name,
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
    res.status(400).json({ error: error.message, infoType: "400" });
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
    res.status(404).json({ error: error.message, infoType: "noRelation" });
  }
};

export const updateRelation = async (req, res) => {
  const { officialId, name, nations, kind } = req.body;
  try {
    if (nations.length >= 2) {
      const relation = await Relation.findOne({
        officialId,
      });
      if (relation != undefined && relation != null) {
        relation.name = name;
        relation.nations = nations;
        relation.kind = kind;

        relation
          .save()
          .then((relation) => {
            res.status(200).json({
              relation,
              message: "[A TRADUIRE] mise à jour réussie",
              infoType: "update",
            });
          })
          .catch((error) => {
            res.status(400).json({
              message: `[A TRADUIRE] certaines informations sont erronées ou manquantes`,
              erreur: error.message,
            });
          });
      } else {
        res.status(400).json({ message: error, infoType: "400" });
      }
    } else {
      const relation = await Relation.findOneAndDelete({ officialId });
      relation.nations = [];
      res
        .status(200)
        .json({
          relation,
          message: "[A TRADUIRE] mise à jour réussie",
          infoType: "update",
        });
    }
  } catch (error) {
    res.status(400).json({ message: error, infoType: "400" });
  }
};
