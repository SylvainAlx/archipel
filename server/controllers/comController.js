import Com from "../models/comSchema.js";
import { COMTYPE } from "../settings/const.js";

export const comCount = async (req, res) => {
  try {
    Com.countDocuments({ comType: COMTYPE[3].id })
      .then((count) => {
        res.status(200).json(count);
      })
      .catch((error) => {
        console.error(error);
        res.status(400).json({
          infoType: "400",
        });
      });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      infoType: "400",
    });
  }
};

export const getDestinationComs = async (req, res) => {
  try {
    const destination = req.params.id;
    const coms = await Com.find({ destination });
    res.status(200).json(coms);
  } catch (error) {
    res.status(400).json({
      message: "[A TRADUIRE] aucune communication",
      erreur: error.message,
    });
  }
};

export const getPublicComsByOrigin = async (req, res) => {
  try {
    const nationId = req.param.id;
    let coms;
    if (nationId) {
      coms = await Com.find({ comType: COMTYPE[3].id, origin: nationId });
    } else {
      coms = await Com.find({ comType: COMTYPE[3].id });
    }
    res.status(200).json(coms);
  } catch (error) {
    res.status(400).json({
      message: "[A TRADUIRE] aucune communication",
      erreur: error.message,
    });
  }
};

export const getPublicComs = async (req, res) => {
  try {
    const coms = await Com.find({ comType: COMTYPE[3].id });
    res.status(200).json(coms);
  } catch (error) {
    res.status(400).json({
      message: "[A TRADUIRE] aucune communication",
      erreur: error.message,
    });
  }
};

export const createCom = async (req, res) => {
  try {
    const { origin, destination, title, comType, message } = req.body;

    const com = new Com({
      origin,
      destination,
      title,
      comType,
      message,
    });
    com
      .save()
      .then((com) => {
        res.status(201).json({ com, infoType: "new" });
      })

      .catch((error) => {
        if (error.code === 11000) {
          res.status(400).json({
            infoType: "11000",
            erreur: error.keyValue,
          });
        } else {
          res.status(400).json({
            infoType: "400",
          });
        }
      });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      infoType: "400",
    });
  }
};

export const deleteCom = async (req, res) => {
  try {
    const comId = req.params.id;
    Com.findByIdAndDelete(comId).then((com) => {
      res.status(200).json({
        com,
        infoType: `delete`,
      });
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      infoType: "400",
    });
  }
};
