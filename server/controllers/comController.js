import { COMS } from "../index.js";
import Com from "../models/comSchema.js";
import {
  createElementInMemory,
  deleteElementInMemory,
} from "../utils/functions.js";

export const getAllComs = async (req, res) => {
  if (COMS.length > 0) {
    res.status(200).json(COMS);
  } else {
    try {
      const coms = await Com.find();
      res.status(200).json(coms);
    } catch (error) {
      res
        .status(400)
        .json({ message: "aucune communication", erreur: error.message });
    }
  }
};

export const createCom = async (req, res) => {
  try {
    const { originId, originName, destinationId, title, comType, message } =
      req.body;

    const com = new Com({
      originId,
      originName,
      destinationId,
      title,
      comType,
      message,
    });
    com
      .save()
      .then((com) => {
        createElementInMemory(COMS, com);
        res.status(201).json({ com, message: "communication enregistrée" });
      })

      .catch((error) => {
        if (error.code === 11000) {
          res.status(400).json({
            message: "informations déjà existantes dans la base de données",
            erreur: error.keyValue,
          });
        } else {
          res.status(400).json({
            message: `certaines informations sont erronées ou manquantes`,
            erreur: error.message,
          });
        }
      });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteCom = async (req, res) => {
  try {
    const comId = req.params.id;
    Com.findByIdAndDelete(comId).then((resp) => {
      deleteElementInMemory(COMS, comId);
      res.status(200).json({
        message: `communication supprimée`,
      });
    });
  } catch (error) {
    res.status(400).json({
      message: "impossible de supprimer la communication",
      erreur: error.message,
    });
  }
};
